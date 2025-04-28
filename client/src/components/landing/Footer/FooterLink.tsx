import { landingNavbarLink } from "@/utils/links"

const FooterLink = () => {
  return (
    <div className='flex justify-center lg:justify-end gap-x-6 mt-6 lg:mt-0'>
        {landingNavbarLink.map(item => {
        return (
            <a href={item.url} key={item.id} className='capitalize font-medium text-muted-foreground'>{item.text}</a>
        )
        })}
    </div>
  )
}

export default FooterLink