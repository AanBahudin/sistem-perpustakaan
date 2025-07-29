import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

const PustakawanCollapseNavlinkItem = ({ data, isActive }: { data: any, isActive: boolean }) => {
  const Icons: LucideIcon = data.icon

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="m-0">
        <AccordionTrigger className={`w-full flex items-center justify-between p-2 group bg-transparent hover:bg-muted rounded`}>
          <div className="flex items-center gap-x-4">
            <Icons className={`w-4 h-4 ${isActive ? 'stroke-white' : 'stroke-muted-foreground'}`} />
            <p className={`text-sm ${isActive ? 'text-white font-bold' : 'text-muted-foreground'}`}>{data.title}</p>
          </div>
        </AccordionTrigger>

        {data.children.map((item: any, index: number) => (
          <AccordionContent key={index} className="flex flex-col gap-y-1 text-balance flex-1 ml-6 mt-2 p-0">
            <NavLink to={item.url} className="text-xs text-muted-foreground hover:bg-muted duration-200 ease-in-out p-2 rounded ml-4">{item.title}</NavLink>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  )
}

export default PustakawanCollapseNavlinkItem
