import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const CustomLink = ({ to, children, className = "", onClick }: CustomLinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative py-2 text-sm font-semibold transition-all duration-300 ${
        match
          ? "text-indigo-600"
          : "text-slate-600 hover:text-indigo-600"
      } ${className}`}
    >
      {children}
      {match && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
      )}
    </Link>
  );
};

export default CustomLink;

