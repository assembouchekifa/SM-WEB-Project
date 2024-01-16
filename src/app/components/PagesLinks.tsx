import Link from "next/link";
import React from "react";

function PagesLinks({
  link,
  tital,
  disc,
}: {
  link: string;
  tital: string;
  disc: string;
}) {
  return (
    <Link
      className="p-5  bg-gray-300 dark:bg-gray-900  rounded-lg focus:outline-none block dark:focus:bg-gray-950 focus:bg-gray-400"
      href={link}
    >
      <h3 className="tracking-wider text-lg font-bold text-center mb-2 w-full">
        {tital}
      </h3>
      <p
        className="text-lg text-wrap w-full "
        style={{ overflowWrap: "break-word" }}
      >
        {disc}{" "}
      </p>
    </Link>
  );
}

export default PagesLinks;
