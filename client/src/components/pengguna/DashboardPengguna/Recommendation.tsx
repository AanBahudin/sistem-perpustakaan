import RecommendationBook from './RecommendationBook'

const BookRecommendation = () => {
  return (
    <section className='col-span-12 lg:col-span-6 bg-card rounded-xl border p-2 lg:p-6 hidden lg:flex justify-start items-start flex-col'>
        <h3 className='mb-6'>Anda mungkin suka</h3>
        <RecommendationBook />
    </section>
  )
}

export default BookRecommendation