import { ReactNode } from "react";

type TServiceProps = {
  title: string;
  shortDescription?: string;
  icon: ReactNode;
  bgColor: string;
};

const Service = ({ title, shortDescription, icon, bgColor }: TServiceProps) => {
  return (
    <div
      className={`${bgColor} text-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300`}
    >
      <span className="flex justify-center">{icon}</span>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="">{shortDescription}</p>
    </div>
  );
};

export default Service;
