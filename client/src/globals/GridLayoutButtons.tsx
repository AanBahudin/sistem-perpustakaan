import { Share2 } from 'lucide-react'
import ShareBookDialog from './ShareBookDialog'
import { generateBookLink } from '@/utils/generateBookLink'
import AddLikedButton from './AddLikedButton'
import FormContainer from '@/components/form/FormContainer'
import { addOrRemoveSuka } from '@/actions/sukaActions'
import { addOrRemoveSimpanan } from '@/actions/simpanActions'
import AddSimpananButton from './AddSimpananButton'

const GridLayoutButtons = ({id, data, savedData} : {id: string, data: any, savedData: any}) => {
    return (
        <div className="flex justify-center items-center gap-x-2">
            <FormContainer className='w-fit' action={addOrRemoveSuka}>
                <AddLikedButton id={id} likedData={data} />
            </FormContainer>

            <FormContainer className='w-fit' action={addOrRemoveSimpanan}>
                <AddSimpananButton id={id} savedData={savedData} />
            </FormContainer>

            <ShareBookDialog>
                <Share2 onClick={() => generateBookLink(id)} className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
            </ShareBookDialog>
        </div>
  )
}

export default GridLayoutButtons