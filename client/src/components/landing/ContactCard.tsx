import { contactCard } from '@/utils/constants'

const ContactCard = () => {
  return (
    <>
        {contactCard.map((item, index) => {
            return (
                <main key={index}>
                    <div className='flex items-center gap-x-2'>
                        {item.icon}
                        <h5 className='lg:text-xl font-semibold'>{item.title}</h5>
                    </div>
                    <p className="text-sm lg:text-md text-muted-foreground">{item.value}</p>
                </main>
            )
        })}
    
    </>
  )
}

export default ContactCard