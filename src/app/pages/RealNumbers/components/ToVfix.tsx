"use client";

import { toVFix } from "@/app/all function";
import Select from "@/app/components/Select";
import { useState } from "react";

function ToVfix() {
  const [input, setInput] = useState<string>("");
  const [base, setBase] = useState<any>("2");
  const [bitE, setBitE] = useState<any>("");
  const [bitF, setBitF] = useState<any>("");
  const [result, setResult] = useState("");

  function hundelClick(): void {
    try {
      setResult(toVFix(input, base, bitE, bitF));
    } catch (error: any) {
      setResult(error.toString());
    }
  }

  return (
    <>
      <div className="relative flex-col  flex w-full ">
        <h6 className="w-full">Number 1 :</h6>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          className="flex-1  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
        <div className="absolute w-fit right-0 -bottom-7 ">
          <Select
            hundalbase={(e) => {
              setBase(e);
            }}
          />
        </div>
      </div>
      <div className="relative flex-col  flex w-full ">
        <h6 className="w-full">Number Of bit entière part :</h6>
        <input
          value={bitE}
          onChange={(e) => {
            setBitE(e.target.value);
          }}
          type="text"
          className="flex-1  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
      </div>
      <div className="relative flex-col  flex w-full ">
        <h6 className="w-full">Number Of bit fractional part :</h6>
        <input
          value={bitF}
          onChange={(e) => {
            setBitF(e.target.value);
          }}
          type="text"
          className="flex-1  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
      </div>
      <div className="w-full relative">
        <h6 className="w-full">Result :</h6>
        <div
          className="w-full focus:outline-none text-center dark:bg-gray-950 min-h-8 bg-zinc-400 px-2 py-1 text-balance"
          style={{ overflowWrap: "break-word" }}
        >
          {" "}
          {result}
          <div className="absolute w-fit right-0 -bottom-7 bg-white dark:bg-black border-b-2 border-black opacity-70 dark:border-white  px-5 ">
            2
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={hundelClick}
          className=" p-2 mt-3 w-fit rounded-lg dark:bg-zinc-800 hover:dark:bg-zinc-900 bg-zinc-500 hover:bg-zinc-600"
        >
          Transformation
        </button>
      </div>
    </>
  );
}

export default ToVfix;
