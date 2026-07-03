/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Light Rays Container */}
      <div className="absolute top-0 left-[-10%] right-[-10%] h-[150%] flex justify-around opacity-40">
        
        {/* Ray 1 */}
        <div 
          className="w-[12%] h-full bg-gradient-to-b from-cyan-300/40 via-cyan-400/10 to-transparent origin-top blur-[45px] transform translate-x-[5%] animate-shimmer-ray"
          style={{ animationDelay: '0s' }}
        />

        {/* Ray 2 */}
        <div 
          className="w-[18%] h-full bg-gradient-to-b from-blue-200/25 via-cyan-300/8 to-transparent origin-top blur-[50px] transform translate-x-[-10%] animate-shimmer-ray-alt"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Ray 3 */}
        <div 
          className="w-[10%] h-full bg-gradient-to-b from-cyan-400/35 via-blue-400/8 to-transparent origin-top blur-[40px] transform translate-x-[15%] animate-shimmer-ray"
          style={{ animationDelay: '3.2s' }}
        />

        {/* Ray 4 */}
        <div 
          className="w-[14%] h-full bg-gradient-to-b from-blue-300/30 via-cyan-400/10 to-transparent origin-top blur-[55px] transform translate-x-[-5%] animate-shimmer-ray-alt"
          style={{ animationDelay: '0.8s' }}
        />

        {/* Ray 5 */}
        <div 
          className="w-[16%] h-full bg-gradient-to-b from-cyan-200/25 via-teal-300/5 to-transparent origin-top blur-[60px] transform translate-x-[25%] animate-shimmer-ray"
          style={{ animationDelay: '2s' }}
        />

      </div>
      
      {/* Surface caustic overlay to make the top feel like shifting water ripples */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-400/20 via-cyan-500/5 to-transparent blur-md mix-blend-color-dodge animate-pulse duration-[5s]" />
    </div>
  );
}
