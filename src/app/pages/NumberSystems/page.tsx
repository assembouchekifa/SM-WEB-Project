"use client";

import Footer from "@/app/components/Footer";
import HomLink from "@/app/components/HomLink";
import Select from "@/app/components/Select";
import ThemSwith from "@/app/components/ThemSwith";
import { useState } from "react";
import { transferBaseWGB_3 } from "@/app/all function";

function NumberSystems() {
  const [base1, setBase1] = useState<any>("2");
  const [base2, setBase2] = useState<any>("2");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function hundlerClick(): void {
    try {
      setResult(transferBaseWGB_3(input.toLocaleUpperCase(), base1, base2));
    } catch (error: any) {
      setResult(error.toString());
    }
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between sm:p-24 p-16 dark:bg-black">
      <div className="absolute top-4 right-4 ">
        <ThemSwith />
      </div>
      <div className="absolute top-4 left-4 ">
        <HomLink />
      </div>
      <h1 className="tracking-wider  text-lg font-bold text-center mb-2 w-full">
        Number Systems
      </h1>
      <div className="w-full">
        <h6 className="w-full  ">Number :</h6>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
      </div>
      <div className=" p-3 w-full sm:w-4/5 flex justify-around mt-3">
        <span>
          <h6 className="text-center">From</h6>
          <Select
            hundalbase={(e: string) => {
              setBase1(e);
            }}
          />
        </span>
        <span>
          <h6 className="text-center">To</h6>
          <Select
            hundalbase={(e: string) => {
              setBase2(e);
            }}
          />
        </span>
      </div>
      <div className="w-full flex items-center flex-col ">
        <h6 className="w-full">Result :</h6>
        <div
          className="w-full focus:outline-none text-center dark:bg-gray-950 min-h-8 bg-zinc-400 px-2 py-1 text-balance"
          style={{ overflowWrap: "break-word" }}
        >
          {result}
        </div>
      </div>
      <button
        onClick={hundlerClick}
        className=" p-2 mt-3 w-fit rounded-lg dark:bg-zinc-800 hover:dark:bg-zinc-900 bg-zinc-500 hover:bg-zinc-600"
      >
        Transformation
      </button>
      <Footer />
    </main>
  );
}

export default NumberSystems;
