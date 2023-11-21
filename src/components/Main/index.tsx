import Link from "next/link";
import React from "react";

const Main: React.FC<{}> = () => {
  return (
    <div>
      Here is main
      <Link href="/r/programing">Hello</Link>
    </div>
  );
};
export default Main;
