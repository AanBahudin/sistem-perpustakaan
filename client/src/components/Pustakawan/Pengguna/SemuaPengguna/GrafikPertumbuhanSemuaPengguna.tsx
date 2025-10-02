import { AlignEndHorizontal, Ratio } from 'lucide-react';
import UserGrowthCart from '../UserGrowthCart';
import UserRatioDougnut from '../UserRatioDougnut';
import DosenMahasiswaRatio from '../DosenMahasiswaRatio';

type GrafikPertumbuhanSemuaPenggunaType = {
  monthlyUserGrowData: any, 
  userAccountStatusRatio: any,
  title?: string,
  graphFor?: string
}

const GrafikPertumbuhanSemuaPengguna = ({graphFor="default", title='Statistik Pertumbuhan Pengguna Bulanan', monthlyUserGrowData, userAccountStatusRatio} : GrafikPertumbuhanSemuaPenggunaType) => {
  return (
    <section className="w-full border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
        <main className="w-[70%] border-r h-full flex flex-col justify-between gap-y-5 items-start">
            <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
              <AlignEndHorizontal className='w-4 h-4 stroke-muted-foreground' /> 
              {title}
            </h1>

            {monthlyUserGrowData?.length === 0 && (
              <div className='w-full h-full flex items-center justify-center flex-col mt-20'>
                <h1 className='text-center text-muted-foreground text-sm'>Belum ada pertumbuhan</h1>
              </div>
            )}
            <UserGrowthCart monthlyUserGrowData={monthlyUserGrowData} />
            
        </main>

        <main className="flex-1 max-h-full flex flex-col items-center justify-center">
            <h1 className='font-semibold items-center flex gap-x-4 capitalize'>
              <Ratio  className='w-4 h-4 stroke-muted-foreground' /> 
              {graphFor === 'default' ? 'Rasio Aktivasi Akun' : `Rasio perbanding akun ${graphFor}`}
              
            </h1>

            {graphFor === 'default' ? (
              <UserRatioDougnut userAccountStatusRatio={userAccountStatusRatio} />
            ) : (
              <DosenMahasiswaRatio userAccountStatusRatio={userAccountStatusRatio} />
            )}
        </main>
    </section>
  )
}

export default GrafikPertumbuhanSemuaPengguna