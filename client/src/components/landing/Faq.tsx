import Container from "@/globals/Container"
import Questions from "./Faq/Questions"

const Faq = () => {
  return (
    <Container className="my-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
      
        <div className="place-self-center mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-semibold">Punya pertanyaan? <br /> Kami siap membantu</h1>
          <p className="w-[90%] text-muted-foreground mt-8">Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif perpustakaan ini siap menjadi ruang belajar yang inspirati</p>
        </div>

        <Questions />

      </section>
    </Container>
  )
}

export default Faq