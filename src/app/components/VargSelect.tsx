"use client";

import classNames from "classnames";
import stayle from "./global.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

function VargSelect({ hundalbase }: { hundalbase: (e: string) => any }) {
  return (
    <div className="relative w-fit">
      <select
        onChange={(e) => {
          hundalbase(e.target.value);
        }}
        className={classNames(
          stayle.select,
          "bg-white dark:bg-black border-b-2 border-black dark:border-white  "
        )}
      >
        <option className={stayle.op} value="toVFix">
          To Fixed Point
        </option>
        <option className={stayle.op} value="toVSimpl">
          To IEEE-754 simple
        </option>
        <option className={stayle.op} value="toVDouble">
          To IEEE-754 double
        </option>
        <option className={stayle.op} value="frVFix">
          From Fixed Point
        </option>
        <option className={stayle.op} value="frVSimpl">
          From IEEE-754 simple
        </option>
        <option className={stayle.op} value="frVDouble">
          From IEEE-754 double
        </option>
      </select>
      <span className={stayle.img}>
        <IoMdArrowDropdown size={"100%"} />
      </span>
    </div>
  );
}

export default VargSelect;
