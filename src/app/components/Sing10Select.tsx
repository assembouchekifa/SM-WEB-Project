"use client";

import classNames from "classnames";
import stayle from "./global.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

function Sing10Select({
  hundalbase,
  isop,
}: {
  hundalbase: (e: string) => any;
  isop: boolean;
}) {
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
        <option className={stayle.op} value="0">
          {isop ? "+" : "0"}
        </option>
        <option className={stayle.op} value="1">
          {isop ? "-" : "1"}
        </option>
      </select>
      <span className={stayle.img}>
        <IoMdArrowDropdown size={"100%"} />
      </span>
    </div>
  );
}

export default Sing10Select;
