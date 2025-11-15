import { useNavigate, useSearchParams } from 'react-router-dom'

const PustakawanPengaturanTabsMenu = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'
  const fullParams = new URLSearchParams(searchParams)
  const values: Array<string> = ['Kondisi Buku', 'Denda', 'Kategori', 'Durasi', 'Lainnya']

  const handleClick = (value: string) => {
    if (value === 'Kondisi Buku') {
      fullParams.delete('menu')
    } else {
      fullParams.set('menu', value)
    }

    navigate(`?${fullParams.toString()}`)
  }

  return (
    <section className='w-full flex items-center justify-start gap-x-4 my-4'>
      {values.map((item: string, index: number) => {
        const isActiveMenu = currentParams === item
        return (
          <main onClick={() => handleClick(item)} key={index} className={`${isActiveMenu ? 'bg-primary/80  text-white' : 'bg-transparent hover:bg-muted'} min-w-[150px] text-xs cursor-default duration-200 ease-in-out text-muted-foreground px-2 rounded-lg py-2 border text-center`}>
            <p>{item}</p>
          </main>
        )
      })}
    </section>
  )
}

export default PustakawanPengaturanTabsMenu