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
  value?: string,
  onChange?: (() => void) | undefined
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
  onChange

}: InputProps<T>) => {
  const error = errors ? errors[name] : undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register}
        type={type}
        id={String(name)}
        name={String(name)}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        value= {value}
        onChange = {onChange}
        className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none ${
          error
            ? "border-red-500 ring-red-500"
            : "border-green-400 ring-green-500"
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
};

export default Input;
