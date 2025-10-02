import Container from "@/globals/Container"
import StatisticCard from "./Statistik/StatisticCard"

const Statistik = () => {
  return (
    <Container className="my-20 pt-10">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:gap-x-6 gap-y-4 lg:gap-y-0 gap-x-0 ">
        <StatisticCard />
      </section>
    </Container>
  )
}

export default Statistik