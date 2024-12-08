import { FieldError } from "react-hook-form";

import { CircleHelp } from "lucide-react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  error?: FieldError;
  onClickTooltip?: () => void;
  tooltip?: any;
  register: any;
}

export default function InputField({
  label,
  id,
  type = "text",
  error,
  register,
  tooltip,
  onClickTooltip,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-poppinsLight opacity-90 mb-2 ml-1 whitespace-nowrap center"
      >
        {label}
        {tooltip && (
          <CircleHelp
            onClick={onClickTooltip}
            className="inline-block ml-3 translate-y-[-10%] cursor-pointer"
            size={18}
            strokeWidth={1}
          />
        )}
      </label>
      <input
        id={id}
        type={type}
        {...register(id)}
        className="w-full p-2 mt-1 rounded-xl border h-[55px] bg-[#f1f1f1] border-solid border-gray-400"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
