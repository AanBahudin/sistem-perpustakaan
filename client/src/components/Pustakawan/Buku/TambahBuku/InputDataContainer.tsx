import InputDataSection from "./InputDataSection"
import SecondaryInputDataSection from "./SecondaryInputDataSection"

const InputDataContainer = () => {
  return (
    <section className='w-full flex items-start justify-start gap-x-6'>
      <InputDataSection />
      <SecondaryInputDataSection />
    </section>
  )
}

export default InputDataContainer