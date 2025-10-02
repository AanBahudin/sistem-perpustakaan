import PustakawanMainProfile from "./PustakawanMainProfile"
import PustakawanDetailStats from "./PustakawanDetailStats"
import PustakawanGraphStatsContainer from "./PustakawanGraphStatsContainer"

const PustakawanMainProfileContainer = ({data} : {data: any}) => {
  return (
    <section className="w-full flex flex-col items-start justify-start gap-x-6 my-6">
      <main className="w-full flex items-start justify-start gap-x-6">
        <PustakawanMainProfile profil={data.profile} />
        <PustakawanDetailStats data={data} />
      </main>
      <PustakawanGraphStatsContainer data={data.stats} />
    </section>
  )
}

export default PustakawanMainProfileContainer