import { tabPerpanjangan } from '@/utils/constants'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PerpanjanganTab = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const kondisiPerpanjangan = searchParams.get('disetujui') || 'Semua'

  const handleTabs = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (!value || value === 'Semua') {
      params.delete('disetujui')
    } else {
      params.set('disetujui', value)
    }

    navigate(`?${params.toString()}`);
  }
  
  return (
    <div className="w-full grid grid-cols-4 place-items-center gap-x-2 rounded-xl border">
        {tabPerpanjangan.map((item, index) => {
            return (
            <div key={index} onClick={() => handleTabs(item)} className={`${item === kondisiPerpanjangan ? 'bg-muted text-primary-foreground' : ''} w-full cursor-default col-span-1 py-4 first:rounded-l last:rounded-l hover:text-primary-foreground duration-300 ease-in-out`}>
                <h3 className="capitalize text-center">{item}</h3>
            </div>
            )
        })}
    </div>
  )
}

export default PerpanjanganTab