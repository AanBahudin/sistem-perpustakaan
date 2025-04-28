import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { accordions } from "@/utils/constants"

const Questions = () => {
  return (
    <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
        {accordions.map(accordion => {
            return (
            <AccordionItem key={accordion.id} value={accordion.id.toString()}>
                <AccordionTrigger className="text-md">{accordion.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                {accordion.answer}
                </AccordionContent>
            </AccordionItem>
            )
        })}
        </Accordion>
    </div>
  )
}

export default Questions