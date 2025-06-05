import React from 'react'
import { Calendar } from "@/components/ui/calendar"


const CalendarPengguna = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-fit ml-auto rounded-2xl border bg-primary/20"
        />
    )
}

export default CalendarPengguna