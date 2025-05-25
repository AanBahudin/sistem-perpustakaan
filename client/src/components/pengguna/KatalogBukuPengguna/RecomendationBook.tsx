import BookRecomendationLoading from "./BookRecomendationLoading"
import AwaitHooks from "@/hooks/AwaitHooks"

const RecomendationBook = ({data} : {data:any}) => {
  return (
    <AwaitHooks data={data} loadingComponent={<BookRecomendationLoading />}>
        {data => (
            <main className='flex gap-x-8 my-8'>
                {data.data.recommendation.map((item:any, index:number) => {
                return (
                    <img key={index} className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src={item.cover} alt={item.judul} />
                )
                })}
            </main>
        )}
    </AwaitHooks>
  )
}

export default RecomendationBook