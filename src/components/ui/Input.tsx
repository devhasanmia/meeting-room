import {
  UseFormRegisterReturn,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  type?: string;
  name: keyof T;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors<T>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = <T extends FieldValues>({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  register,
  errors,
  value,
  onChange,
}: InputProps<T>) => {
  const error = errors ? errors[name] : undefined;

  // Destructure register props to handle potential value/onChange overrides cleanly
  const registerProps = register || ({} as any);

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={String(name)}
        className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={String(name)}
        name={String(name)}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        value={value}
        {...registerProps}
        onChange={(e) => {
          if (registerProps.onChange) {
            registerProps.onChange(e);
          }
          if (onChange) {
            onChange(e);
          }
        }}
        className={`w-full px-4 py-3 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500 animate-pulse">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;

