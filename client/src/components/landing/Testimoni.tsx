import Container from "@/globals/Container"
import TestimonialCarousel from "./Testimoni/TestimoniCurousel"
import { Quote } from "lucide-react"

const Testimoni = () => {
  return (
    <Container className="my-10 py-10">
      <h1 className="lg:text-center text-4xl font-semibold">Baca Ulasan</h1>
      <h5 className="lg:text-center mt-2 lg:mx-auto mb-16 text-muted-foreground lg:w-2/3">Setiap pengguna punya kisahnya sendiri. Temukan bagaimana aplikasi ini memberikan pengalaman baru dalam mengakses dan memanfaatkan literasi kampus. Baca cerita mereka dan lihat bagaimana teknologi mendukung kemajuan belajar dan mengajar.</h5>

      <section className="grid grid-cols-1 lg:grid-cols-8 items-center-safe">
        <div className="hidden lg:grid col-span-3">
          <Quote className="stroke-primary fill-primary w-20 h-20 rotate-180 mb-6" />
          <h1 className="text-4xl font-semibold">Apa kata <br /> pengguna <br /> perpustakaan kami</h1>
        </div>

        <div className="col-span-6 lg:col-span-5 w-full">
          <TestimonialCarousel />
        </div>
      </section>
    </Container>
  )
}

export default Testimoni