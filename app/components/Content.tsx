import React from 'react'

export default function Content({borderStep}: {borderStep: number}) {
  return (
   
    <div className="absolute  left-0 right-0 sm:left-8 md:left-29 top-16 sm:top-20 md:top-auto lg:top-auto xl:top-auto bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10 px-4 sm:px-6 md:px-8 lg:px-10 content-return-up overflow-y-auto scroll-invisible ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-6">
        {[
          {
            title: "Story",
            text:
              "Alphera Academy is not just a school, it’s the first real-world implementation of the Alpha Learning System, a future facing education model designed over 15 years of research and development. In a world rapidly shaped by artificial intelligence. Alphera Academy prepares children not only to succeed in core academics, but to thrive as emotionally intelligent, adaptable, creative and self driven human beings.",
          },
          {
            title: "Mission",
            text:
              "To become the world’s most pioneering education hub where the full spectrum of human potential is awakened, nurtured and elevated. At Alphera Academy, we do not teach to the test. We cultivate future-ready humans. Our mission goes beyond education. We strive to become the architects of human potential, creating the appropriate conditions for the next generations to thrive.",
          },
          {
            title: "Waiting List",
            text:
              "At Alphera Academy, our waiting list is not just a line, it is a pathway into our learning community. Families who join it are showing their commitment into securing a place in a forward thinking environment where every seat is an opportunity to grow, learn, innovate and thrive.",
          },
        ].map((item, i) => (
          <div key={i} 
          className="relative bg-white/40 backdrop-blur-sm rounded-tr-4xl min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] w-full max-w-sm mx-auto sm:mx-0 shadow-lg border border-white/30"
          >
            {/* Connected border overlay that reveals sequentially */}
            <div
              className={`absolute inset-0 z-10 pointer-events-none transition-all duration-700 ease-out rounded-tr-2xl md:rounded-tr-4xl border-t border-r ${
                i < borderStep ? "opacity-100 border-gray-200" : "opacity-0 border-transparent"
              }`}
              style={{ transitionDelay: `${i * 160}ms` }}
            />
            <div
              className={`relative z-0 text-[#142954] flex flex-col gap-y-2 sm:gap-y-4 md:gap-y-6 lg:gap-y-8 xl:gap-y-0 justify-between p-3 sm:p-4 md:p-5 pt-2 sm:pt-3 transition-all duration-700 ease-out ${
                i < borderStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 160 + 60}ms` }}
            >
              <div className="font-semibold text-lg sm:text-xl md:text-2xl  lg:text-3xl mb-1 sm:mb-2 md:mb-3 lg:mb-2">{item.title}</div>
              <div className="text-xs font-bold sm:text-sm md:text-base lg:text-md leading-relaxed opacity-90 mt-1 sm:mt-2 md:mt-2">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
