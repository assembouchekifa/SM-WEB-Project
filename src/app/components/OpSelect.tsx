"use client";

import classNames from "classnames";
import { IoMdArrowDropdown } from "react-icons/io";
import stayle from "./global.module.css";

function OpSelect({ hundalOp }: { hundalOp: (e: string) => any }) {
  return (
    <div className="relative w-fit">
      <select
        onChange={(e) => {
          hundalOp(e.target.value);
        }}
        className={classNames(
          stayle.select,
          "bg-white dark:bg-black border-b-2 text-2xl border-black dark:border-white  "
        )}
      >
        <option className={stayle.op} value="+">
          +
        </option>
        <option className={stayle.op} value="-">
          -
        </option>
        <option className={stayle.op} value="*">
          x
        </option>
        <option className={stayle.op} value="/">
          /
        </option>
      </select>
      <span className={stayle.img}>
        <IoMdArrowDropdown size={"100%"} />
      </span>
    </div>
  );
}

export default OpSelect;
