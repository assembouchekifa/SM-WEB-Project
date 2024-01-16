"use client";

import Footer from "@/app/components/Footer";
import HomLink from "@/app/components/HomLink";
import ThemSwith from "@/app/components/ThemSwith";
import VargSelect from "@/app/components/VargSelect";
import { useState } from "react";
import ToVfix from "./components/ToVfix";
import FrVfix from "./components/FrVfix";
import ToIEE from "./components/ToIEE";
import { frVDouble, frVSimpl, toVDouble, toVSimpl } from "@/app/all function";
import FrIEEE from "./components/FrIEEE";

function RealNumbers() {
  const [mrthod, setMrthod] = useState("toVFix");

  function handelpage(mrthod: string) {
    switch (mrthod) {
      case "toVFix":
        return <ToVfix />;
      case "frVFix":
        return <FrVfix />;
      case "toVSimpl":
        return <ToIEE fun={toVSimpl} />;
      case "toVDouble":
        return <ToIEE fun={toVDouble} />;
      case "frVSimpl":
        return <FrIEEE fun={frVSimpl} />;
      case "frVDouble":
        return <FrIEEE fun={frVDouble} />;
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
        Real Numbers
      </h1>
      <div className="w-fit flex">
        <h6 className="me-3">use :</h6>
        <VargSelect
          hundalbase={(e) => {
            setMrthod(e);
          }}
        />
      </div>

      {handelpage(mrthod)}

      <Footer />
    </main>
  );
}

export default RealNumbers;
