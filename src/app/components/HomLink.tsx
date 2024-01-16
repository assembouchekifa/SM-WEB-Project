import Link from "next/link";
// import a from ""

function HomLink() {
  return (
    <Link
      className="px-3  py-1 border-black dark:border-white border-2 rounded-lg focus:outline-none block dark:focus:bg-zinc-900 focus:bg-zinc-200"
      href={"/"}
    >
      Home Page
    </Link>
  );
}

export default HomLink;
