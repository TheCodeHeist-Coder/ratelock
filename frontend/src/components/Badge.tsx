import { GiCelebrationFire } from "react-icons/gi"

function Badge() {
  return (


 <div className="relative group  ">

  {/* Glow */}
  <div className="absolute max-w-md m-auto inset-0 bg-linear-to-r from-green-600 to-green-800 rounded-lg blur-sm opacity-60 group-hover:opacity-70 transition duration-700 group-hover:duration-200"></div>

  {/* Content */}
  <div className="relative flex h-10 sm:h-15 max-w-md m-auto  sm:flex-row items-center justify-center text-white rounded-lg px-4 sm:px-12 py-2 sm:py-3 bg-black leading-none gap-5 sm:gap-4 text-center sm:text-left">

    {/* Left */}
    <p className="group-hover:text-gray-400 transition duration-200 flex items-center gap-2 text-md sm:text-sm md:text-base text-gray-100 font-secondary tracking-wide">
      <GiCelebrationFire className="h-4 w-4 sm:h-5 sm:w-5 text-green-800 animate-pulse" />
       Open for Contribution
    </p>

  
    
    
  </div>
</div>

  )
}

export default Badge