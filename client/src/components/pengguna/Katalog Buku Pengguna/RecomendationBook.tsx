import { ImageOff } from "lucide-react"

const RecomendationBook = ({data} : {data:any}) => {

  return (
    <main className='flex gap-x-8 my-8'>
      {data.map((item:any, index:number) => {
        return (
          <>
            {item.cover ? (
              <img key={index} className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src={item?.cover} alt={item.judul} />
            ) : (
              <div className="h-[300px] w-[230px] rounded-xl border flex items-center justify-center"> <ImageOff /> </div>
            )}
          </>
        )
      })}
    </main>
  )
}

export default RecomendationBook