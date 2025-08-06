import { AlignEndHorizontal, Ratio } from 'lucide-react';
import UserGrowthCart from '../UserGrowthCart';
import UserRatioDougnut from '../UserRatioDougnut';

type GrafikPertumbuhanSemuaPenggunaType = {
  monthlyUserGrowData: any, 
  userAccountStatusRatio: any,
  title?: string
}

const GrafikPertumbuhanSemuaPengguna = ({title='Statistik Pertumbuhan Pengguna Bulanan', monthlyUserGrowData, userAccountStatusRatio} : GrafikPertumbuhanSemuaPenggunaType) => {
  return (
    <section className="w-full border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
        <main className="w-[70%] border-r h-full flex flex-col justify-between gap-y-5 items-start">
            <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
              <AlignEndHorizontal className='w-4 h-4 stroke-muted-foreground' /> 
              {title}
            </h1>
            <UserGrowthCart monthlyUserGrowData={monthlyUserGrowData} />
            
        </main>

        <main className="flex-1 max-h-full flex flex-col items-center justify-center">
            <h1 className='font-semibold items-center flex gap-x-4'>
              <Ratio  className='w-4 h-4 stroke-muted-foreground' /> 
              Rasio Aktivasi Akun
            </h1>

            <UserRatioDougnut userAccountStatusRatio={userAccountStatusRatio} />
        </main>
    </section>
  )
}

export default GrafikPertumbuhanSemuaPengguna