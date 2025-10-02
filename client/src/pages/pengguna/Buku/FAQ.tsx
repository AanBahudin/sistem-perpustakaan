import { CircleHelp } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQConfirmation } from '@/utils/constants'

const FAQ = () => {
  return (
    <section className='mt-10'>
        <main className='flex gap-x-2 items-center mb-8'>
            <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center p-1'>
                <CircleHelp className='stroke-white' />
            </div>
            <h1 className='text-2xl font-semibold capitalize'>Frequently Asked Questions</h1>
        </main>
        
        <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-y-2"
            defaultValue="0"
        >
            {FAQConfirmation.map((item:any, index: number) => {
                return (
                    <AccordionItem value={index.toString()}>
                        <AccordionTrigger className='bg-secondary/20 px-4 rounded-t-sm rounded-b-none outline-none ring-0 hover:no-underline hover:bg-secondary/50 focus-visible:border-none focus-visible:ring-0'>{item.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance bg-secondary/20 rounded-b-sm p-4">
                        <p>{item.answer}</p>
                        </AccordionContent>
                    </AccordionItem>

                )
            })}
        </Accordion>
        
    </section>
  )
}

export default FAQ