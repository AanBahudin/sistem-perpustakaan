import { ChevronLeft, Home, User } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const PenggunaBreadCrumbs = ({title} : {title: string}) => {

    const location = useLocation()
    const pathURL = location.pathname.replace('/', ' ').trim().split('/').slice(0, 2)
    const navigate = useNavigate()
    const toPreviousPage = () => {
        navigate(-1)
    }

    return (
        <section className="mb-6 flex items-center gap-x-8">
            <div onClick={toPreviousPage} className="w-7 h-7 bg-muted/20 hover:bg-muted/30 p-1 rounded-full flex items-center justify-center">
                <ChevronLeft />
            </div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/pustakawan" className="flex items-center gap-x-2"><Home className="stroke-muted-foreground w-4 h-4" /> Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {pathURL.map((item: string, index: number) => {
                        if (item !== 'pustakawan') {
                            return (
                                <div key={index} className="flex items-center gap-x-2">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/pustakawan/${item}`} className="capitalize">
                                            {item}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </div>
                            );
                        }
                    })}
                    <BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbLink href={location.pathname.toString()} className="flex items-center gap-x-2 text-primary capitalize">
                            <User className="stroke-muted-foreground w-4 h-4" />
                            {title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    )
}

export default PenggunaBreadCrumbs