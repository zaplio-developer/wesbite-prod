"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export function Select({
  label,
  name,
  placeholder,
  options,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <RadixSelect.Root name={name} defaultValue={defaultValue} required={required}>
        <RadixSelect.Trigger
          id={name}
          className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent data-[placeholder]:text-muted"
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown size={16} className="text-muted" aria-hidden="true" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="z-50 overflow-hidden rounded-md border border-border bg-surface shadow-xl">
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option}
                  value={option}
                  className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-sm text-foreground outline-none data-[highlighted]:bg-surface-hover"
                >
                  <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <Check size={14} aria-hidden="true" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
