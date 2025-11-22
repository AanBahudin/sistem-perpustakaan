const SimpanPageNoData = () => {
  return (
    <section className='w-full min-h-[60vh] mt-6 flex items-center justify-center flex-col'>
        <img className='w-[200px] mx-auto object-fill grayscale' src='https://res.cloudinary.com/dhthnjizr/image/upload/v1748687309/r6tn8ltecwwatlcteiw7.png' alt="no data" />
        <h1 className='text-center font-semibold text-xl mt-4 text-muted-foreground'>Belum ada buku yang disimpan...</h1>
    </section>
  )
}

export default SimpanPageNoData