import Link from "next/link";
import { HTMLInputTypeAttribute } from "react";

export function Input({
  label,
  type,
}: {
  label: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex justify-between items-center">
        <label htmlFor={label.toLowerCase()} className="font-bold text-sm">
          {label}
        </label>
        {type === "password" && (
          <Link className="text-primary text-sm" prefetch href="#">
            Forgot password?
          </Link>
        )}
      </div>
      <input
        type={type}
        id={label.toLowerCase()}
        className="border border-border border-inset rounded-lg px-2.5 py-3"
      />
    </div>
  );
}
