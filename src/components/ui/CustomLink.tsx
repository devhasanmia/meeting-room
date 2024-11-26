import React from "react";
import { Link } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const CustomLink = ({ to, children, className = "" }: CustomLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-black hover:text-[#00B6FF] transition duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
