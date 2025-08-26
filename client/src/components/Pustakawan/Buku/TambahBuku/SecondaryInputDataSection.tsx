import UploadImageContainer from "./UploadImageContainer"
import CategorySectionContainer from "./CategorySectionContainer"

const SecondaryInputDataSection = () => {
  return (
    <section className='flex-1 rounded-xl flex flex-col items-center justify-center gap-y-4'>
      <UploadImageContainer />
      <CategorySectionContainer />
    </section>
  )
}

export default SecondaryInputDataSection