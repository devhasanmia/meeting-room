import React from "react";
import { Link } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

const CustomLink = ({ to, children, className = "" }: CustomLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-white font-semibold hover:text-black transition duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
