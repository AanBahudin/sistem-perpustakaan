import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const UserGrowthCart = ({monthlyUserGrowData} : {monthlyUserGrowData: any}) => {
    return (
        <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyUserGrowData}
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
    )
}

export default UserGrowthCart