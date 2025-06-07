import CalendarPengguna from "./CalendarUser"
import StatsContainer from "./StatsContainer"

type StatsOverviewType = {
    peminjaman: any,
    bukuHilang: any
}

const StatsOverview = ({peminjaman, bukuHilang} : StatsOverviewType) => {
    return (
        <section className='flex'>
            <StatsContainer peminjaman={peminjaman} bukuHilang={bukuHilang} />
            <CalendarPengguna peminjaman={peminjaman} />
        </section>
    )
}

export default StatsOverview