import { cn } from "@/lib/utils";
import { IconChevronDown } from "./Icons";

const CONTROL =
  "w-full rounded-xs border bg-cream px-4 text-[0.9375rem] text-ink placeholder:text-stone " +
  "transition-colors duration-300 focus:border-brass focus:outline-none disabled:opacity-50";

type FieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** `dark` recolours the label, hint and error for the ink and olive grounds. */
  tone?: "default" | "dark";
  className?: string;
  children: React.ReactNode;
};

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  tone = "default",
  className,
  children,
}: FieldProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "t-caption font-medium tracking-[0.16em] uppercase",
          dark ? "text-cream/85" : "text-espresso",
        )}
      >
        {label}
        {required ? (
          <span className={cn("ml-1", dark ? "text-brass-soft" : "text-brass")}>*</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className={cn("t-caption", dark ? "text-danger-soft" : "text-danger")} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={cn("t-caption", dark ? "text-cream/55" : "text-stone")}>{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function Input({ className, invalid, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, "h-12", invalid ? "border-danger" : "border-line", className)}
    />
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export function Textarea({ className, invalid, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, "py-3 leading-relaxed", invalid ? "border-danger" : "border-line", className)}
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export function Select({ className, invalid, children, ...rest }: SelectProps) {
  return (
    <span className="relative block">
      <select
        {...rest}
        aria-invalid={invalid || undefined}
        className={cn(
          CONTROL,
          "h-12 cursor-pointer appearance-none pr-11",
          invalid ? "border-danger" : "border-line",
          className,
        )}
      >
        {children}
      </select>
      <IconChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-stone" />
    </span>
  );
}
