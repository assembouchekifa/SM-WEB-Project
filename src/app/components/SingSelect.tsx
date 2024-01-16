"use client";

import classNames from "classnames";
import stayle from "./global.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

function SingSelect({ hundalbase }: { hundalbase: (e: string) => any }) {
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
        <option className={stayle.op} value="toSVA">
          SVA
        </option>
        <option className={stayle.op} value="toCP1">
          CP1
        </option>
        <option className={stayle.op} value="toCP2">
          CP2
        </option>
      </select>
      <span className={stayle.img}>
        <IoMdArrowDropdown size={"100%"} />
      </span>
    </div>
  );
}

export default SingSelect;
