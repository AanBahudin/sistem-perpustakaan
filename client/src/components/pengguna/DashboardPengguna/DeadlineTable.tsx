import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const DeadlineTable = () => {
  return (
    <ScrollArea className="w-1/3 h-[350px] rounded-xl border bg-card">
        <div className="p-4">
        <h4 className="mb-8 text-md font-medium leading-none">Deadline Pengembalian</h4>
        {Array.from({length: 3}).map((_, index) => (
            <>
            <div key={index} className="text-sm flex justify-between">
                <h1>Clean Architecture</h1>
                <p className='text-muted-foreground'>3 Hari Lagi</p>
            </div>
            <Separator className="my-2" />
            </>
        ))}
        </div>
    </ScrollArea>
  )
}

export default DeadlineTable