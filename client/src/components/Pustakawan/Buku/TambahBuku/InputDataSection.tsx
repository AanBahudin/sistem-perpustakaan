import GeneralInfoContainer from "./GeneralInfoContainer"
import DetailBukuInputContainer from "./DetailBukuInputContainer"
import PriceDanStockContainer from "./PriceDanStockContainer"

const InputDataSection = () => {
  return (
    <section className='w-[70%] flex flex-col items-center justify-center gap-y-4'> 
      <GeneralInfoContainer />
      <DetailBukuInputContainer />
      <PriceDanStockContainer />
    </section>
  )
}

export default InputDataSection