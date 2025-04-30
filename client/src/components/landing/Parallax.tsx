import library from '@/assets/images/library.jpg'

const Parallax = () => {
  return (
    <div className="w-full h-[200px] lg:h-[300px] bg-fixed bg-center bg-cover relative grayscale-50 mt-20" style={{ backgroundImage: `url(${library})` }}>
        <div className='w-full h-full'></div>
    </div>
  )
}

export default Parallax