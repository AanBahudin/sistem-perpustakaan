const DetailTags = ({kategori} : {kategori: any}) => {
  return (
    <main className="w-full rounded">
        <div className="w-full flex flex-wrap gap-x-4 mt-4">
            {kategori.map((item : string) => {
                return (
                    <p key={item} className="w-fit px-6 py-1 bg-secondary border rounded text-muted-foreground">{item}</p>
                )
            })}
        </div>
    </main>
  )
}

export default DetailTags