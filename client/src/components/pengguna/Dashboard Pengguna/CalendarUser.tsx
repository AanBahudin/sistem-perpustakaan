import React from 'react'
import { Calendar } from "@/components/ui/calendar"


const CalendarPengguna = ({peminjaman} : {peminjaman: any}) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    
    const dataPeminjaman = peminjaman.filter((item: any) => {
        return item.statusPeminjaman === 'Dipinjam' || item.statusPeminjaman === 'Terlambat'
    }).map((item: any) => new Date(item.berakhirPada))


    function isSameDate(date1: Date, date2: Date) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
    }
    
    return (
        <Calendar
            mode="single"
            selected={date}
            modifiers={{
                deadline: tanggal => dataPeminjaman.some((d: any) => isSameDate(d, tanggal))
            }}
            onSelect={setDate}
             modifiersClassNames={{
                deadline: "bg-red-200 text-red-800 font-bold"
            }}
            className="w-fit ml-auto hover:bg-primary/20 rounded-2xl border bg-primary/20"
        />
    )
}

export default CalendarPengguna