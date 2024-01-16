"use client";

import { IoMdArrowDropdown } from "react-icons/io";
import stayle from "./global.module.css";
import classNames from "classnames";

function Select({ hundalbase }: { hundalbase: (e: string) => any }) {
  return (
    <div className="relative w-fit">
      <select
        onChange={(e) => {
          hundalbase(e.target.value);
        }}
        className={classNames(
          stayle.select,
          "bg-white dark:bg-black border-b-2 z-10 border-black dark:border-white  "
        )}
      >
        <option className={stayle.op} value="2">
          2
        </option>
        <option className={stayle.op} value="3">
          3
        </option>
        <option className={stayle.op} value="4">
          4
        </option>
        <option className={stayle.op} value="5">
          5
        </option>
        <option className={stayle.op} value="6">
          6
        </option>
        <option className={stayle.op} value="7">
          7
        </option>
        <option className={stayle.op} value="8">
          8
        </option>
        <option className={stayle.op} value="9">
          9
        </option>
        <option className={stayle.op} value="10">
          10
        </option>
        <option className={stayle.op} value="11">
          11
        </option>
        <option className={stayle.op} value="12">
          12
        </option>
        <option className={stayle.op} value="13">
          13
        </option>
        <option className={stayle.op} value="14">
          14
        </option>
        <option className={stayle.op} value="15">
          15
        </option>
        <option className={stayle.op} value="16">
          16
        </option>
        <option className={stayle.op} value="gray">
          gray
        </option>
        <option className={stayle.op} value="BCD">
          BCD
        </option>
        <option className={stayle.op} value="BCD+3">
          BCD+3
        </option>
      </select>
      <span className={classNames(stayle.img, "z-20")}>
        <IoMdArrowDropdown size={"100%"} />
      </span>
    </div>
  );
}

export default Select;
