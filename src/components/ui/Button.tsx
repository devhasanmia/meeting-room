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
  bgColor = "bg-indigo-600",
  bgHover = "hover:bg-indigo-700",
  onClick,
  disabled = false,
  lodding = false,
}: TButtonProps) => {
  return (
    <div className="mt-2 w-full">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={text}
        className={`w-full py-3 px-5 font-semibold text-sm rounded-lg transition-all duration-300 transform active:scale-[0.98] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${bgColor} ${bgHover} ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
        }`}
      >
        {lodding ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Please wait...</span>
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Button;

