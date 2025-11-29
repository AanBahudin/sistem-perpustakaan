import {
    CalendarUser,
    StatsContainer
} from '@/components/pengguna/DashboardPengguna'

type StatsOverviewType = {
    peminjaman: any,
    bukuHilang: any
}

const StatsOverview = ({peminjaman, bukuHilang} : StatsOverviewType) => {
    return (
        <section className='flex'>
            <StatsContainer peminjaman={peminjaman} bukuHilang={bukuHilang} />
            <CalendarUser peminjaman={peminjaman} />
        </section>
    )
}

export default StatsOverview