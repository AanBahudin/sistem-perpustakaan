import { CalendarCheck, CalendarX } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const PeminjamanList = () => {
  const url = 'https://res.cloudinary.com/dhthnjizr/image/upload/v1746590828/ybtknqtmtdtjfnhmoarf.jpg'
  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {Array.from({length: 10}).map(_ => {
          return (
              <main className="w-full h-full col-span-12 border rounded-2xl flex gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
                  <img src={url} className="w-24 object-fill rounded" />
                  <div className="w-full flex flex-col items-start justify-stretch ">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-2xl font-semibold group-hover:underline">Deep Work</h2>
                    <h5 className="bg-primary px-6 text-sm py-1 rounded">Dipinjam</h5>
                  </div>
                  <Separator className="my-2 w-full" />

                  <div className="w-full flex items-center justify-between">
                    <main className="w-2/3">
                      <h5 className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti minus atque quibusdam impedit corrupti, accusantium est a qui recusandae illo ab reprehenderit laborum dolores laboriosam suscipit assumenda sapiente illum quidem. Accusantium porro ipsum eum recusandae ad nesciunt rerum, amet voluptatem.</h5>
                    </main>
                    <Separator orientation="vertical" className="mx-2" />
                    <main className="self-center flex items-center flex-col justify-center w-1/3">
                      <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                            <CalendarCheck className="w-5 h-5 stroke-primary" />
                            <span>10 September 2001</span>
                      </p>
                      <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                          <CalendarX className="w-5 h-5 stroke-destructive" />
                          <span>10 September 2001</span>
                      </p>
                    </main>
                  </div>
                  </div>
              </main>
          )
      })}
    </div>
  )
}

export default PeminjamanList