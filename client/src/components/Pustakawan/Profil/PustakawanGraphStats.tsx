import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer } from 'recharts';
import { LucideIcon } from 'lucide-react';

const PustakawanGraphStats = ({data, title, Icon} : {data: any, title: string, Icon: LucideIcon}) => {
  return (
    <main className="w-full border rounded-xl p-4 h-full flex flex-col justify-between gap-y-5 items-start">
        <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
          <Icon className='w-4 h-4 stroke-muted-foreground' /> 
          {title}
        </h1>

        {data?.length === 0 && (
          <div className='w-full h-full flex items-center justify-center flex-col mt-20'>
            <h1 className='text-center text-muted-foreground text-sm'>Belum ada pertumbuhan</h1>
          </div>
        )}
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={data}
              margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
              }} >
              {/* <CartesianGrid strokeDasharray="2 2" /> */}
              <XAxis dataKey="bulan" className='text-xs ' />
              <YAxis className='text-xs' />
              <Area type="monotone" dataKey="jumlah" fill='#155DFC' className='stroke-[#155DFC]' />
          </AreaChart>
        </ResponsiveContainer>
      </main>
  )
}

export default PustakawanGraphStats