import { useNavigate } from "react-router-dom"
import LandingKatalogBook from "./LandingKatalogBook"

const LandingKatalogBookList = ({dataBuku} : {dataBuku: any}) => {
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(`/katalog/${id}`)
    }

    return (
        <section className='w-full grid grid-cols-12 gap-6'>
            {dataBuku.map((item:any, index: number) => {
                return <LandingKatalogBook key={index} item={item} handleNavigate={handleNavigate} />
            })}
        </section>
    )
}

export default LandingKatalogBookList