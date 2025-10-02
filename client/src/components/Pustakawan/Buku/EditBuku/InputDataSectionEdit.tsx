import GeneralInfoContainerEdit from "./GeneralInfoContainerEdit"
import PriceDanStockContainerEdit from "./PriceDanStockContainerEdit"
import DetailBukuInputContainerEdit from "./DetailBukuInputContainerEdit"

const InputDataSectionEdit = ({buku} : {buku: any}) => {
  return (
    <section className='w-[70%] flex flex-col items-center justify-center gap-y-4'> 
      <GeneralInfoContainerEdit buku={buku} />
      <DetailBukuInputContainerEdit buku={buku} />
      <PriceDanStockContainerEdit  buku={buku} />
    </section>
  )
}

export default InputDataSectionEdit