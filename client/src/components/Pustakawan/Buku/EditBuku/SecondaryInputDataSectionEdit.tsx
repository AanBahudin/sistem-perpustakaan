import UploadImageContainerEdit from "./UploadImageContainerEdit"
import CategorySectionContainerEdit from "./CategorySectionContainerEdit"

const SecondaryInputDataSectionEdit = ({buku} : {buku: any}) => {
  return (
    <section className='flex-1 rounded-xl flex flex-col items-center justify-center gap-y-4'>
      <UploadImageContainerEdit buku={buku} />
      <CategorySectionContainerEdit buku={buku} />
    </section>
  )
}

export default SecondaryInputDataSectionEdit