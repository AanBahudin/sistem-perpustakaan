import Container from '@/globals/Container'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import LayananCard from './Layanan/LayananCard'

const Layanan = () => {
  return (
    <Container className='py-20 px-10 my-10 bg-muted rounded-2xl grid grid-cols-1 lg:grid-cols-3'>

      <section id='layanan' className='flex flex-col items-start justify-center lg:col-span-2'>
        <h1 className='text-3xl xl:text-4xl font-semibold text-start'>Lihat dan Telurusi Layanan dan Penawaran Perpustakaan  Kami</h1>
        <p className='my-6 text-muted-foreground w-full lg:w-1/2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur obcaecati nesciunt, ea in error eius earum ipsum! Ullam vitae odio maiores. Porro numquam magnam accusantium impedit dignissimos nobis aperiam doloribus?</p>

        <Button asChild variant={'default'} className='w-1/3 text-center text-white lg:block hidden'>
          <Link to='/login'>Bergabung</Link>
        </Button>
      </section>

      <LayananCard />
       
    </Container>
  )
}

export default Layanan