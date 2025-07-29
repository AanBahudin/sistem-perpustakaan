import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LucideIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

const PustakawanCollapseNavlinkItem = ({ data, isActive }: { data: any, isActive: boolean }) => {
  const navigate = useNavigate()
  const Icons: LucideIcon = data.icon

  const handleClick = (url: string) => {
    navigate(url)
  }

  const handleClickParent = (url: string) => {
    navigate(url)
  }


  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={data.title} className="m-0">
        <AccordionTrigger onClick={() => handleClickParent(data.url)} className={`w-full flex items-center justify-between py-3 px-2 group bg-transparent hover:bg-muted rounded hover:no-underline ${isActive && 'bg-primary'}`}>
          <div className="flex items-center gap-x-4">
            <Icons className={`w-4 h-4 ${isActive ? 'stroke-white' : 'stroke-muted-foreground'}`} />
            <p className={`text-sm ${isActive ? 'text-white font-bold' : 'text-muted-foreground'}`}>{data.title}</p>
          </div>
        </AccordionTrigger>

        {data.children.map((item: any, index: number) => {
          const Icon : LucideIcon = item.icon
          return (
            <AccordionContent onClick={() => handleClick(item.url)} key={index} className="flex items-center gap-x-2 text-balance flex-1 ml-6 px-3 border-l py-3 hover:bg-muted duration-200 ease-in-out hover:rounded" asChild>
                <Icon className="w-3 h-3" />
                <NavLink to={item.url} className="text-xs text-muted-foreground">{item.title}</NavLink>
            </AccordionContent>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}

export default PustakawanCollapseNavlinkItem
