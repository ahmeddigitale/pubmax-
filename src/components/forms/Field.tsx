import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[1rem] text-ink placeholder:text-stone transition-[border-color,box-shadow] outline-none focus:border-green focus:ring-4 focus:ring-green/12 aria-[invalid=true]:border-terracotta aria-[invalid=true]:ring-terracotta/15";

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.875rem] font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(facultatif)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.8125rem] font-medium text-[#9b4a30]">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}
