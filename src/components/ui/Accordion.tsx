"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={items[0]?.question}
      className="divide-y divide-border rounded-lg border border-border bg-surface"
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.question} value={item.question}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-surface-hover">
              <span>{item.question}</span>
              <Plus
                size={16}
                aria-hidden="true"
                className="shrink-0 text-muted transition-transform group-data-[state=open]:rotate-45"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            className={cn(
              "overflow-hidden px-5 text-sm text-muted",
              "data-[state=open]:animate-[accordion-down_0.2s_ease-out] data-[state=closed]:animate-[accordion-up_0.2s_ease-out]",
            )}
          >
            <div className="pb-4">{item.answer}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
