import RecommendationBook from './RecommendationBook'

const BookRecommendation = () => {
  return (
    <section className='w-2/4 bg-card rounded-xl border p-6 flex justify-start items-start flex-col'>
        <h3 className='mb-6'>Anda mungkin suka</h3>
        <RecommendationBook />

    </section>
  )
}

export default BookRecommendation