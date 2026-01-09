import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center fixed inset-0 bg-primary z-[10000]">
      {/* Animated Logo */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-thirdry/20 absolute"></div>

        {/* Spinning Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-thirdry animate-spin"></div>

        {/* Inner Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-thirdry/10 animate-pulse"></div>
        </div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold gradient-text text-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            &lt;/&gt;
          </span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex items-center gap-2">
        <span className="text-gray-400 text-sm tracking-widest">LOADING</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-thirdry rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-thirdry rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-thirdry rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-thirdry to-secondary rounded-full animate-loading-bar"></div>
      </div>
    </div>
  )
}

export default Loader