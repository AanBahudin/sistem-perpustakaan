import InputDataSectionEdit from "./InputDataSectionEdit"
import SecondaryInputDataSectionEdit from "./SecondaryInputDataSectionEdit"

const InputDataContainerEdit = ({data} : {data: any}) => {
  return (
    <section className='w-full flex items-start justify-start gap-x-6'>
      <InputDataSectionEdit buku={data} />
      <SecondaryInputDataSectionEdit buku={data} />
    </section>
  )
}

export default InputDataContainerEdit