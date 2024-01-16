"use client";

import { toCP1, toCP2, toSVA } from "@/app/all function";
import Footer from "@/app/components/Footer";
import HomLink from "@/app/components/HomLink";
import Select from "@/app/components/Select";
import SingSelect from "@/app/components/SingSelect";
import ThemSwith from "@/app/components/ThemSwith";
import { useState } from "react";
import style from "./page.module.css";
import classNames from "classnames";

function SvaCp1Cp2() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState("");
  const [resultBase, setResultBase] = useState<any>("2");
  const [inputBits, setInputBits] = useState("4");
  const [mrthod, setMrthod] = useState("toSVA");

  function hundelClick(): void {
    try {
      if (isNaN(parseInt(inputBits))) {
        throw new Error("number of bits not correct");
      }
      switch (mrthod) {
        case "toSVA":
          setResult(toSVA(input, resultBase, inputBits));
          break;
        case "toCP1":
          setResult(toCP1(input, resultBase, inputBits));
          break;
        case "toCP2":
          setResult(toCP2(input, resultBase, inputBits));
          break;
      }
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
        Representation of Signed
      </h1>
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
              setResultBase(e);
            }}
          />
        </div>
      </div>
      <div className="relative flex-col  flex w-full ">
        <h6 className="w-full">Number of Bits :</h6>
        <input
          type="text"
          onChange={(e) => {
            setInputBits(e.target.value);
          }}
          value={inputBits}
          className={classNames(
            "flex-1 appearance-none  focus:outline-none text-center dark:bg-gray-900 bg-zinc-300 px-2 py-1",
            style.num
          )}
        />
      </div>
      <div className="w-fit flex">
        <h6 className="me-3">use :</h6>
        <SingSelect
          hundalbase={(e) => {
            setMrthod(e);
          }}
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
      <Footer />
    </main>
  );
}

export default SvaCp1Cp2;
