import { Book, ChevronLeft, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const DetailBukuBreadcrumbs = ({text} : {text: string}) => {
    const navigate = useNavigate()
    const toPreviousPage = () => {
        navigate(-1)
    }
    return (
        <section className="mb-4 flex items-center gap-x-8">
            <div onClick={toPreviousPage} className="w-7 h-7 bg-muted/20 hover:bg-muted/30 p-1 rounded-full flex items-center justify-center">
                <ChevronLeft />
            </div>
        
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/pustakawan" className="flex items-center gap-x-2"><Home className="stroke-muted-foreground w-4 h-4" /> Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/pustakawan/buku" className="flex items-center gap-x-2">Buku</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="text-primary flex items-center gap-x-2">
                        <Book className="stroke-muted-foreground w-4 h-4"  />
                        {text}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    )
}

export default DetailBukuBreadcrumbs