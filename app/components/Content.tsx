import React from 'react'

export default function Content({borderStep}: {borderStep: number}) {
  return (
    <>
    {/* Left title block */}
    <div className="absolute ml-15 left-8 md:left-16 top-[18vh] text-white content-return-up">
      <div className="text-3xl md:text-5xl font-extrabold leading-tight">
        <div>Alpha</div>
        <div>Learning</div>
        <div>System</div>
      </div>
    </div>

    {/* Bottom info panels */}
    <div className="ml-15 absolute left-0 right-0 bottom-8 md:bottom-10 px-6 md:px-10 content-return-up">
      <div className="grid grid-cols-1  md:grid-cols-3 gap-14 md:gap-6">
        {[
          {
            title: "About",
            text: "CBDC is a digital form CBDC functions like transfers, and remittances of fiat currency issued .",
          },
          {
            title: "Storing",
            text: "CBDC can be stored CBDC functions like transfers, and remittancesCBDC functions like transfers, and remittances in digital wallets and accessed using a",
          },
          {
            title: "Functions",
            text: "CBDC functions like transfers, and remittancesCBDC functions like transfers, and remittances CBDC functions like transfers, and remittances CBDC functions like transfers, and remittances.",
          },
        ].map((item, i) => (
          <div key={i} className="relative min-h-[260px] w-2/3 [clip-path:polygon(0%_0%,65%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] ">
            <div className={`absolute inset-0 bg-transparent border-t-2 border-r-2 rounded-tr-xl transition-colors duration-500 ${i < borderStep ? "border-gray-200" : "border-transparent"}`}></div>
            <div className="relative text-white  flex flex-col gap-y-10 justify-between p-5 pt-3">
              <div className="font-bold text-3xl mb-4">{item.title}</div>
              <div className="text-xs sm:text-[17px] leading-relaxed opacity-90 mt-2 md:mt-3">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
