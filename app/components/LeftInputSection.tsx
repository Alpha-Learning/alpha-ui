import React from "react";

export default function LeftInputSection({
  setDrawerOpen,
}: {
  setDrawerOpen: (open: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-[86vw] max-w-[420px] p-3">
        <div className="h-full bg-white rounded-2xl shadow-xl slide-in-left">
          <div className="p-4 flex items-center  justify-between gap-3 border-b">
            <div className="font-semibold rounded-full border border-gray-300 w-5 flex items-center justify-center h-5">
              ?
            </div>
            <button
              className="px-2 py-1 text-gray-300 cursor-pointer text-sm"
              onClick={() => setDrawerOpen(false)}
            >
              ✕
            </button>
            {/* <div className='w-2 h-20 rotate-135 absolute top-0 right-0  bg-gray-300 '></div> */}
          </div>

          <div className="p-6 flex justify-center items-start flex-col h-3/4">
            <div></div>
            <div className="w-full mb-6">
              <label className="block text-xs text-black font-semibold mb-2">
                Enter your phone number
              </label>
              <input className="w-full border border-gray-300  rounded-lg px-3 placeholder:text-black py-3 mb-4 text-black" />
              <button className="w-full cursor-pointer py-3 flex justify-between bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg px-4 ">
                Send Request <span>→</span>
              </button>
            </div>
           
          </div>

          <div className="w-full flex justify-center items-center ">
              <p className="text-[11px] text-gray-500 mt-6">
                By continuing, you accept the Regulations and the Privacy
                Policy.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
