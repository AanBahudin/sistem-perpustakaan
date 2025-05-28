import GlobalTooltip from "@/globals/GlobalTooltip"
import { BookCheck, CheckCircle, Eye, ThumbsUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const StatsDetailInfo = ({data} : {data: any}) => {
  return (
    <div className="w-full flex items-center gap-x-10 my-2 ">
        <GlobalTooltip text="Dilihat">
            <p className="flex gap-x-2 items-center text-sm justify-center">
                <Eye className="stroke-muted-foreground w-6 h-6" />
                <span>{data.totalDilihat}</span>
            </p>
        </GlobalTooltip>
    
        <Separator orientation="vertical" />
    
        <GlobalTooltip text="Total dipinjam">
            <p className="flex gap-x-2 items-center text-sm justify-center">
                <BookCheck className="stroke-muted-foreground w-5 h-5" />
                <span>{data.totalDipinjam}</span>
            </p>
        </GlobalTooltip>
    
        <Separator orientation="vertical" />

        <GlobalTooltip text="Total Disukai">
            <p className="flex gap-x-2 items-center text-sm justify-center">
                <ThumbsUp className="stroke-muted-foreground w-5 h-5" />
                <span>{data.totalDisukai}</span>
            </p>
        </GlobalTooltip>

        <Separator orientation="vertical" />

        <p className="flex gap-x-2 items-center text-sm justify-center">
            <CheckCircle className="stroke-muted-foreground w-5 h-5" />
            <span className="text-muted-foreground">{data.status}</span>
        </p>
    </div>
  )
}

export default StatsDetailInfo