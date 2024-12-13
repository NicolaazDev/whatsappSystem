import { FieldError } from "react-hook-form";
import { CircleHelp } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  id: string;
  error?: FieldError;
  onClickTooltip?: () => void;
  tooltip?: any;
  placeholder?: string;
  options: { value: string; label: string }[];
  register?: any;
  onValueChange?: (value: string) => void; // Callback para mudanças no select
}

import { InformationCircleSolid } from "@medusajs/icons";
import { Tooltip } from "@medusajs/ui";

export default function SelectField({
  label,
  id,
  error,
  placeholder,
  tooltip,
  onClickTooltip,
  options,
  register,
  onValueChange,
}: SelectFieldProps) {
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
      <Select {...register(id)} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className="w-full center !ring-transparent !justify-between p-2 mt-1 rounded-xl font-poppinsRegular border h-[55px] bg-gray-100 border-solid border-gray-300"
        >
          <SelectValue placeholder={placeholder || "Selecione uma opção"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
