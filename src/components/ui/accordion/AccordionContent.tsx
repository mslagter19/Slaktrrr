import { cn } from "../../../lib/cn";
import { useAccordionItem } from "./accordion-context";

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, triggerId, contentId } = useAccordionItem();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      // inert: gesloten content is niet met Tab te bereiken en wordt niet voorgelezen
      inert={!isOpen}
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn("px-4 pb-4 text-slate-600", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}