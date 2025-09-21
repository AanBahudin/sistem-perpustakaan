const RecomendationBook = ({data} : {data:any}) => {

  console.log(data)

  return (
    <main className='flex gap-x-8 my-8'>
      {data.recommendation.map((item:any, index:number) => {
        return (
          <img key={index} className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src={item.cover} alt={item.judul} />
        )
      })}
    </main>
  )
}

export default RecomendationBook