import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it in the Settings > Secrets menu in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Water analysis API endpoint
  app.post("/api/analyze-water", async (req, res) => {
    try {
      const { image, mimeType, imageUrl } = req.body;

      if (!image && !imageUrl) {
         res.status(400).json({ error: "Please provide an image upload or an image URL." });
         return;
      }

      // Initialize Gemini securely with lazy checking
      const ai = getGeminiClient();

      let imagePart;

      if (imageUrl) {
        // Fetch preset image from URL and convert to base64 on server side to avoid CORS
        try {
          const imgRes = await fetch(imageUrl);
          if (!imgRes.ok) throw new Error(`Failed to fetch preset image: ${imgRes.statusText}`);
          const arrayBuffer = await imgRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64Data = buffer.toString("base64");
          const contentType = imgRes.headers.get("content-type") || "image/jpeg";

          imagePart = {
            inlineData: {
              mimeType: contentType,
              data: base64Data,
            },
          };
        } catch (fetchErr: any) {
          console.error("Error fetching preset image:", fetchErr);
          res.status(400).json({ error: `Could not load preset image: ${fetchErr.message}` });
          return;
        }
      } else {
        const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
        imagePart = {
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: cleanBase64,
          },
        };
      }

      const promptPart = {
        text: "Analyze this image of water. Determine if it is contaminated or dirty, what contaminants appear to be present or are highly likely to be in it (e.g. algae, silt, industrial waste, microplastics, oil spills, etc.), how contaminated it is on a scale of 0 to 100, and provide a detailed, educational, highly structured step-by-step cleaning/purification process to make it safer.",
      };

      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let lastError: any = null;
      let responseText = "";

      const maxPasses = 2;
      for (let pass = 1; pass <= maxPasses; pass++) {
        if (responseText) break;

        for (const modelName of modelsToTry) {
          try {
            console.log(`[Pass ${pass}] Attempting water analysis with model: ${modelName}...`);
            const response = await ai.models.generateContent({
              model: modelName,
              contents: { parts: [imagePart, promptPart] },
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    contaminationLevel: {
                      type: Type.INTEGER,
                      description: "Estimated contamination percentage from 0 (perfectly pure) to 100 (severely hazardous)",
                    },
                    status: {
                      type: Type.STRING,
                      description: "Water condition status category (e.g. 'Safe / Pristine', 'Moderately Contaminated', 'Highly Turbid / Muddy', 'Toxic / Industrial Runoff')",
                    },
                    contaminants: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Key visible or highly suspected contaminants found",
                    },
                    remediationSteps: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Concrete step-by-step cleaning/purification solutions (e.g. Coagulation, Sedimentation, Filtration, Chemical treatment, Boiling, etc.)",
                    },
                    summary: {
                      type: Type.STRING,
                      description: "A helpful visual diagnostic summary explaining what makes this water contaminated, what indicators are present, and the potential health or ecological risks.",
                    },
                  },
                  required: ["contaminationLevel", "status", "contaminants", "remediationSteps", "summary"]
                }
              }
            });

            if (response.text) {
              responseText = response.text;
              console.log(`[Pass ${pass}] Successfully completed analysis using model: ${modelName}`);
              break;
            }
          } catch (err: any) {
            lastError = err;
            const errMessage = err?.message || String(err);
            console.warn(`[Pass ${pass}] Model ${modelName} failed:`, errMessage);

            const errStatus = err?.status || err?.statusCode || err?.code || "";
            const errStr = `${errMessage} ${errStatus}`.toLowerCase();
            const isTransient = errStr.includes("503") || 
                                errStr.includes("429") || 
                                errStr.includes("unavailable") || 
                                errStr.includes("demand") || 
                                errStr.includes("overloaded") || 
                                errStr.includes("limit") ||
                                errStr.includes("busy") ||
                                errStr.includes("timeout") ||
                                errStatus === 503 ||
                                errStatus === 429;

            if (isTransient) {
              if (pass < maxPasses) {
                console.log(`Transient error on ${modelName}. Swiftly falling back to next available model...`);
              } else {
                console.log(`Transient error on final pass for ${modelName}. Waiting 1000ms...`);
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            } else {
              // Non-transient errors (e.g., config error, schema issue)
              console.log(`Non-transient error on ${modelName}. Moving to next available model...`);
            }
          }
        }
      }

      if (!responseText) {
        throw new Error(
          `Water quality scanner is temporarily overloaded. Please try again in a few seconds. (Error details: ${lastError?.message || lastError || "Service Unavailable"})`
        );
      }

      let cleanText = responseText.trim();
      // Safely strip markdown code block wrappers if present
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```(?:json)?\n?/i, "");
        cleanText = cleanText.replace(/\n?```$/, "");
      }
      cleanText = cleanText.trim();

      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      console.error("Water analysis error:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred during image analysis." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on port ${PORT}`);
  });
}

startServer();
