import Link from "next/link";
import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export function Input({
  label,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError | string;
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
      <div>
        <input
          id={rest.name}
          type={rest.type}
          {...rest}
          className="border w-full border-border border-inset rounded-lg px-2.5 py-3"
        />
        {error && (
          <p className="text-sm leading-none mt-2 text-red-500 capitalize">
            {typeof error === "string"
              ? error
              : error.type === "required"
              ? `${rest.name} is required`
              : "Error"}
          </p>
        )}
      </div>
    </div>
  );
}
