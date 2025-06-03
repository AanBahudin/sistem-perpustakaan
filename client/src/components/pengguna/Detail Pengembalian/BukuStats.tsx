import GlobalTooltip from "@/globals/GlobalTooltip"
import { BookCheck, BookMarked, Eye, ThumbsUp } from "lucide-react"

const BukuStats = ({data} : {data: any}) => {
  return (
    <div className="w-full flex items-center gap-x-3 my-2 ">
        <GlobalTooltip text="Dilihat">
            <main className="flex py-1 px-4 w-20 flex-col rounded bg-popover items-center">
                <p className="text-[12px] text-muted-foreground">Dilihat</p>
                    <p className="flex gap-x-2 items-center text-[12px]">
                        <span className="font-bold">{data.totalDilihat}</span>
                        <Eye className="stroke-primary w-3 h-3" />
                    </p>
            </main>
        </GlobalTooltip>

        <GlobalTooltip text="Total dipinjam">
            <main className="flex py-1 px-4 w-20 flex-col rounded bg-popover items-center">
                <p className="text-[12px] text-muted-foreground">Dipinjam</p>
                <p className="flex gap-x-2 items-center text-[12px] justify-center">
                    <span className="font-bold">{data.totalDipinjam}</span>
                    <BookCheck className="stroke-primary w-3 h-3" />
                </p>
            </main>
        </GlobalTooltip>
    

        <GlobalTooltip text="Total Disukai">
            <main className="flex py-1 px-4 w-20 flex-col rounded bg-popover items-center">
                <p className="text-[12px] text-muted-foreground">Disuka</p>
                <p className="flex gap-x-2 items-center text-[12px] justify-center">
                    <span>{data.totalDisukai}</span>
                    <ThumbsUp className="stroke-primary w-3 h-3" />
                </p>
            </main>
        </GlobalTooltip>

        <GlobalTooltip text="Total Disukai">
            <main className="flex py-1 px-4 w-20 flex-col rounded bg-popover items-center">
                <p className="text-[12px] text-muted-foreground">Disimpan</p>
                <p className="flex gap-x-2 items-center text-[12px] justify-center">
                    <span className="text-muted-foreground">{data.totalDisimpan || 0}</span>
                    <BookMarked className="stroke-primary w-3 h-3" />
                </p>
            </main>
        </GlobalTooltip>
    </div>
  )
}

export default BukuStats