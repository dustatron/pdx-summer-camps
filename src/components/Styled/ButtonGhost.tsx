import React from "react";

type Props = { children: React.ReactNode; onClick?: any };

function ButtonGhost({ children, onClick, ...rest }: Props) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className="flex items-center px-3 py-2 text-lg font-bold uppercase leading-snug text-black hover:opacity-75"
    >
      {children}
    </button>
  );
}

export default ButtonGhost;
