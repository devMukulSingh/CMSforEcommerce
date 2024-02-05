import { Bar,BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface ChartProps{
    data : []
}

const Chart = () => {

  return (
    <main>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <XAxis
                dataKey="xAxis"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                dataKey="yAxis"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <Bar dataKey="total" fill="#3498db" radius={[ 4,4,0,0]} />
        </BarChart>
        </ResponsiveContainer>  
    </main>
  )
}

export default Chart