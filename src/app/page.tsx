"use client";

import ThemSwith from "./components/ThemSwith";
import PagesLinks from "./components/PagesLinks";
import Footer from "./components/Footer";

function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-center p-16 sm:p-24 dark:bg-black">
      <div className="absolute top-4 right-4 ">
        <ThemSwith />
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 gap-5 ">
        <PagesLinks
          link={"./pages/NumberSystems"}
          tital={"Number Systems"}
          disc={
            "Converting a number from its base to another base that includes the base gray , BCD , BCD+3"
          }
        />
        <PagesLinks
          link={"./pages/ArithmeticOperations"}
          tital={"Arithmetic Operations"}
          disc={"Performing basic operations on numbers with different bases"}
        />
        <PagesLinks
          link={"./pages/Signal"}
          tital={"The representation of signed integers"}
          disc={"Convert a binary number using SVA CP1 CP2"}
        />
        <PagesLinks
          link={"./pages/RealNumbers"}
          tital={"Representation of real numbers"}
          disc={
            "Representing real numbers using IEEE-754(32bit 64bit) and fixed points"
          }
        />
      </div>
      <Footer />
    </main>
  );
}

export default Home;
