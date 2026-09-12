import { cn } from "@/lib/cn";

const fieldClasses =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

type CommonProps = {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
};

type InputFieldProps = CommonProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = CommonProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export function FormField(props: InputFieldProps | TextareaFieldProps) {
  const { label, name, required, className } = props;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          className={cn(fieldClasses, "min-h-32 resize-y")}
          {...omitCommon(props)}
        />
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          className={fieldClasses}
          {...omitCommon(props)}
        />
      )}
    </div>
  );
}

function omitCommon<T extends CommonProps>(props: T) {
  const { label: _label, name: _name, required: _required, className: _className, as: _as, ...rest } =
    props as T & { as?: string };
  return rest;
}
