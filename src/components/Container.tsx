import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`${className} flex flex-col 2xl:p-5 lg:p-4 p-3 2xl:gap-5 lg:gap-4 gap-3 w-full text-black dark:text-white`}
    >
      {children}
    </div>
  );
}
