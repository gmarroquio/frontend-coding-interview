import Link from "next/link";
import { InputHTMLAttributes } from "react";

export function Input({
  label,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex justify-between items-center">
        <label htmlFor={rest.name} className="font-bold text-sm">
          {label}
        </label>
        {rest.type === "password" && (
          <Link className="text-primary text-sm" prefetch href="#">
            Forgot password?
          </Link>
        )}
      </div>
      <input
        id={rest.name}
        type={rest.type}
        {...rest}
        className="border border-border border-inset rounded-lg px-2.5 py-3"
      />
    </div>
  );
}
