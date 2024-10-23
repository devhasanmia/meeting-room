type TButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  bgColor?: string;
  bgHover?: string;
  onClick?: () => void;
  disabled?: boolean;
  lodding?: boolean;
};

const Button = ({
  text,
  type = "button",
  bgColor = "bg-emerald-300",
  bgHover = "hover:bg-emerald-500",
  onClick,
  disabled = false,
  lodding = false,
}: TButtonProps) => {
  return (
    <div className="mt-2">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={text}
        className={`w-full py-3 rounded-md transition duration-300 text-white ${bgColor} ${bgHover} ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        {lodding ? "Please wait" : text}
      </button>
    </div>
  );
};

export default Button;
