'use client'
import { SquareCheck, TrendingUp } from "lucide-react"
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/src/components/ui/chart"

import moment from "moment"
import { maskMoney } from "@/src/lib/utils"

export const description = "A bar chart"


const chartConfig = {
    vendas: {
        label: "Vendas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface ComposeChartProps {
    data: any;
}
export default function CompositeChartApp({ data }: ComposeChartProps) {

    const chartData = data?.map((value: any) => ({
        diasemana: moment(value?.resumo_datmvt).format("DD"),
        vendas: parseFloat(value?.resumo_valven),
        meta: parseFloat(value?.resumo_metdia),
        margem: (parseFloat(value?.resumo_margem) * parseFloat(value?.resumo_valven)) / 100,
        pmargem: parseFloat(value?.resumo_margem)
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vendas no período</CardTitle>
                <CardDescription>{moment(data[0]?.anomes).format("MM/YYYY")}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[180px] w-full">
                    <ComposedChart width={730} height={180} data={chartData}>
                        <XAxis dataKey="diasemana" />
                        <YAxis />
                        {/* //console.log("V", value, "N", name, "P", payload) */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel formatter={(value: any, name, props: any) => (
                                <div>
                                    <p className="flex items-center gap-2">
                                        {name == 'vendas' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'vendas' && name + ': ' + (value)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {name == 'meta' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'meta' && name + ': ' + (value)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {name == 'margem' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'margem' && name + ': ' + (props.payload.pmargem).toFixed(2) + '%'}
                                    </p>
                                </div>
                            )} />}
                        //(value / props.payload.vendas) * 100
                        />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="vendas" barSize={20} fill="#009689" />
                        <Line type="monotone" dataKey="meta" stroke="#ff7300" />
                        <Line type="monotone" dataKey="margem" stroke="#f50000" />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Sendo a meta diária de R$ {maskMoney(data[0]?.resumo_metdia)} para este mês. <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando as vendas e as margens alcançadas para os {data?.length} dias do mês
                </div>
            </CardFooter>
        </Card>
    )
}
