import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import ProductGrid from '@/components/pengguna/KatalogBukuPengguna/ProductGrid'
import Container from '@/globals/Container'
import React from 'react'

const KatalogPenggunaPage = () => {
  return (
    <Container className='my-20'>
      <BookRecomendation />
      <LastAdded />
      <ProductGrid />
    </Container>
  )
}

export default KatalogPenggunaPage