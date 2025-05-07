import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import ProductGrid from '@/components/pengguna/KatalogBukuPengguna/ProductGrid'
import Container from '@/globals/Container'
import React from 'react'

const KatalogPenggunaPage = () => {
  return (
    <Container className='my-20'>
      <BookRecomendation />
      <ProductGrid />
    </Container>
  )
}

export default KatalogPenggunaPage