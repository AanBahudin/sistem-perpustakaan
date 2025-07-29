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
  
  const locationName = location.pathname
  const isMatch = locationName.includes(data.url)

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={data.title} className="m-0">
        <AccordionTrigger className={`w-full flex items-center justify-between py-3 px-2 group bg-transparent rounded hover:no-underline ${isMatch ? 'bg-primary text-white' : 'hover:bg-muted'}`}>
          <div className="flex items-center gap-x-4">
            <Icons className={`w-4 h-4 ${isMatch ? 'stroke-white' : 'stroke-muted-foreground'}`} />
            <p className={`text-sm ${isMatch ? 'text-white' : 'text-muted-foreground'}`}>{data.title}</p>
          </div>
        </AccordionTrigger>

        {data.children.map((item: any, index: number) => {
          const Icon : LucideIcon = item.icon
          return (
            <AccordionContent onClick={() => handleClick(item.url)} key={index} className="flex items-center gap-x-2 text-balance flex-1 ml-6 px-3 border-l py-3 hover:bg-muted duration-200 ease-in-out hover:rounded" asChild>
                <Icon className="w-3 h-3" />
                <NavLink to={item.url}
                  end
                  className={({isActive}) => `${isActive && 'text-primary font-bold'} text-xs text-muted-foreground`}>{item.title}</NavLink>
            </AccordionContent>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}

export default PustakawanCollapseNavlinkItem
