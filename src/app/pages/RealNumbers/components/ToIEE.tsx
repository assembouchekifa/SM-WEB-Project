"use client";

import Select from "@/app/components/Select";
import { useState } from "react";

function ToIEE({
  fun,
}: {
  fun: (num: string | number, base: number) => string;
}) {
  const [input, setInput] = useState<string>("");
  const [base, setBase] = useState<any>("2");
  const [result, setResult] = useState("");

  function hundelClick(): void {
    try {
      setResult(fun(input, base));
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

export default ToIEE;
