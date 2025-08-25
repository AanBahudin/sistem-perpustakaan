import { ChevronLeft, Home } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const DetailPengajuanBreadCrumbs = ({text} : {text: string}) => {
    const location = useLocation().pathname.replace('/', ' ').trim().split('/')
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
                    {location.map((item: string, index: number) => {
                        const isLastItem = index === location.length - 1;
                        if (item !== 'pustakawan') {
                            return (
                                <div key={index} className="flex items-center gap-x-2">
                                    <BreadcrumbItem>
                                    {isLastItem ? (
                                        <BreadcrumbPage className="text-primary capitalize">
                                            {text}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={`/pustakawan/${item}`} className="capitalize">
                                            {item}
                                        </BreadcrumbLink>
                                    )}
                                    </BreadcrumbItem>
                                    {!isLastItem && <BreadcrumbSeparator />}
                                </div>
                            );
                        }
                    })} 
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    )
}

export default DetailPengajuanBreadCrumbs