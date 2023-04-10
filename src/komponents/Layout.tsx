import { FC, ReactNode } from "react";

import { Navbar } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-full bg-gradient-to-b from-sky-950 via to-sky-900">
      <Navbar />
      <div className=" p-5 md:p-10">{children}</div>;
    </div>
  );
};
