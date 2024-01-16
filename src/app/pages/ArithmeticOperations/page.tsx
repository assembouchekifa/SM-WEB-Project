"use client";

import HomLink from "@/app/components/HomLink";
import ThemSwith from "@/app/components/ThemSwith";
import Select from "@/app/components/Select";
import OpSelect from "@/app/components/OpSelect";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { calculationWGB_3 } from "@/app/all function";

function Calc() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [base1, setBase1] = useState<any>("2");
  const [base2, setBase2] = useState<any>("2");
  const [op, setOp] = useState<any>("+");
  const [result, setResult] = useState("");
  const [resultBase, setResultBase] = useState<any>("2");

  function hundelClick(): void {
    try {
      let rest = calculationWGB_3(input1, base1, input2, base2, op, resultBase);
      setResult(rest);
    } catch (error: any) {
      setResult(error.toString());
    }
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-around sm:p-24 p-16 dark:bg-black">
      <div className="absolute top-4 right-4 ">
        <ThemSwith />
      </div>
      <div className="absolute top-4 left-4 ">
        <HomLink />
      </div>
      <h1 className="tracking-wider  text-lg font-bold text-center mb-2 w-full">
        Arithmetic Operations
      </h1>
      <div className="relative flex-col  flex w-full ">
        <h6 className="w-full">Number 1 :</h6>
        <input
          type="text"
          onChange={(e) => {
            setInput1(e.target.value);
          }}
          value={input1}
          className="flex-1  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
        <div className="absolute w-fit right-0 -bottom-7 ">
          <Select
            hundalbase={(e) => {
              setBase1(e);
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        {" "}
        <h6 className="me-3">Operations : </h6>
        <OpSelect
          hundalOp={(e) => {
            setOp(e);
          }}
        />
      </div>
      <div className="relative flex-col flex w-full ">
        <h6 className="w-full">Number 2 :</h6>
        <input
          type="text"
          onChange={(e) => {
            setInput2(e.target.value);
          }}
          value={input2}
          className="flex-1  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1"
        />
        <div className="absolute w-fit right-0 -bottom-7 ">
          <Select
            hundalbase={(e) => {
              setBase2(e);
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
          {result}
          <div className="absolute w-fit right-0 -bottom-7 ">
            <Select
              hundalbase={(e) => {
                setResultBase(e);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={hundelClick}
          className=" p-2 mt-3 w-fit rounded-lg dark:bg-zinc-800 hover:dark:bg-zinc-900 bg-zinc-500 hover:bg-zinc-600"
        >
          Calculate
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Calc;
