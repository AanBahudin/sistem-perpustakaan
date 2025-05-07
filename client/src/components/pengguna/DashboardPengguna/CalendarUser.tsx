import React from 'react'
import { Calendar } from "@/components/ui/calendar"


const CalendarPengguna = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    
    return (
        <div className='hidden lg:block lg:col-span-3 w-fit place-self-center bg-primary-foreground dark:bg-card rounded-xl border'>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
    )
}

export default CalendarPengguna