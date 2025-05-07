import LineChartComponent from "./LineChartComponent"

const PenggunaCharts = () => {

    return (
        <div className='w-1/3 border bg-card rounded-xl p-6'>
            <h3>Total Denda</h3>
            <h1 className='text-2xl mt-4 font-semibold text-white'>IDR 150.000</h1>
            <p className='text-muted-foreground text-sm mb-6'>+20.1% dari pengembalian terakhir</p>

            <LineChartComponent />
        </div>
        
    )
}

export default PenggunaCharts