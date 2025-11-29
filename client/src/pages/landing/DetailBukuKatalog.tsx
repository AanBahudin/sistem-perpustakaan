import useFetchSingleKatalogData from '@/hooks/fetchHooks/landingHooks/useFetchSingleKatalogData'
import Container from '@/globals/Container'
import DetailBuku from '@/components/landing/DetailBukuKatalog/DetailBuku'
import SuggestedBooks from '@/components/landing/DetailBukuKatalog/SuggestedBooks'
import DetailBookLoading from '@/components/pengguna/DetailBukuPengguna/DetailBookLoading'


const DetailBukuKatalog = () => {

  const {data, isLoading} = useFetchSingleKatalogData()
  
  if (isLoading) return <DetailBookLoading />
  const {detailBuku, relatedBooks} = data
  
  return (
    <Container className=' py-20'>
      <DetailBuku data={detailBuku} />
      {relatedBooks.length !== 0 && <SuggestedBooks suggestedBooks={relatedBooks} />}
    </Container>
  )
}



export default DetailBukuKatalog