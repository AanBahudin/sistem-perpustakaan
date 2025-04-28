import {stats} from '@/utils/constants'

const StatisticCard = () => {
  return (
    <>
        {stats.map((item, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center px-4 py-8 lg:py-12 rounded-2xl shadow-primary/50 shadow-2xl">
              {item.icon}
              <h1 className="font-semibold text-3xl lg:text-4xl">{item.total}</h1>
              <p className="text-muted-foreground mt-2 text-md text-center">{item.text}</p>
            </div>
          )
        })}
    </>
  )
}

export default StatisticCard