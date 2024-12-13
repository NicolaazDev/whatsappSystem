import { FieldError } from "react-hook-form";

import { CircleHelp } from "lucide-react";

import { Input } from "@/components/ui/input";

import { InformationCircleSolid } from "@medusajs/icons";
import { Tooltip } from "@medusajs/ui";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  error?: FieldError;
  onClickTooltip?: () => void;
  placeholder?: string;
  tooltip?: any;
  register: any;
}

export default function InputField({
  label,
  id,
  type = "text",
  error,
  placeholder,
  register,
  tooltip,
  onClickTooltip,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="text-sm font-poppinsLight opacity-90 mb-2 space-x-2 ml-1 whitespace-nowrap center !justify-start"
      >
        <span className="mr-1">{label}</span>
        {tooltip && (
          <Tooltip
            content={tooltip}
            className="!ml-4 !z-[9999999] font-poppinsLight"
          >
            <InformationCircleSolid />
          </Tooltip>
        )}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className="w-full center !ring-transparent !justify-between p-2 mt-1 rounded-xl font-poppinsRegular border h-[55px] bg-gray-100 border-solid border-gray-300"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
