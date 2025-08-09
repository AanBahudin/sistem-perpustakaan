import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Check, RotateCcw } from "lucide-react"

const SemuaPeminjamanFilterSheet = ({children} : {children: React.ReactNode}) => {

  const handleClick = () => {
    console.log('button clicked')
  }

  const handleReset = () => {
    console.log('reset button clicked')
  }

  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col items-start justify-between w-full">
            <SheetHeader className="w-full py-10">
              <SheetTitle className="mt-3">Filter Data Peminjaman</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                    Saring data peminjaman sesuai kebutuhanmu.
                </SheetDescription>

                {/* {usedIn === 'default' &&  <RoleFilter />}
                <StatusAkunFilter />
                <VerifikasiEmail />
                <VerifikasiProdi /> */}
              </SheetHeader>

              <main className="w-full flex gap-x-4 items-center justify-stretch self-baseline p-4">
                <Button onClick={handleClick} className="text-white flex-1 font-normal text-xs flex items-center gap-x-2" size='sm'>
                  <Check className="w-3 h-3" />
                  Terapkan
                </Button>
                <Button onClick={handleReset} className="text-white flex-1 flex items-center gap-x-2" size='sm' variant='destructive'>
                  <RotateCcw className="w-2 h-2" />
                  Reset
                </Button>
              </main>
        </SheetContent>
    </Sheet>
  )
}

export default SemuaPeminjamanFilterSheet