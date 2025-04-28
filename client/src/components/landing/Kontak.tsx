import Container from '@/globals/Container'
import Map from './Map'
import ContactCard from './Contact/ContactCard'

const Kontak = () => {
  return (
    <Container className='mt-10 py-10'>
        <section className='grid grid-cols-1 lg:grid-cols-12'>
            <div className='col-span-8'>
                <h1 id='kontak' className='text-4xl font-semibold'>Butuh Bantuan?</h1>
                <p className='text-muted-foreground'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora in quibusdam?</p>
            </div>

            <div className='grid grid-cols-1 col-span-4 gap-y-6 mt-10 lg:mt-0'>
                <ContactCard />
            </div>
        </section>
        <Map />
    </Container>
  )
}

export default Kontak