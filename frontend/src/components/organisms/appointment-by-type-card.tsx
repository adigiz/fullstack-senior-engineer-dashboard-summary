import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    name: "appointment",
    label: "Appointment",
    count: 120,
    fill: "var(--color-appointment)",
  },
  {
    name: "medications",
    label: "Medications",
    count: 350,
    fill: "var(--color-medications)",
  },
];

const chartConfig = {
  appointment: {
    label: "Appointment",
    color: "hsl(var(--chart-1))",
  },
  medications: {
    label: "Medications",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const AppointmentByTypeCard = () => {
  return (
    <Card className="flex flex-col md:flex-row">
      <CardHeader className="justify-center mx-auto md:mx-0 !pl-0 md:!pl-6 !pr-0 max-w-56">
        <CardTitle className="text-center md:text-left">
          Appointment by Type
        </CardTitle>
        <p className="text-sm text-center md:text-left text-muted-foreground">
          Showing total appointment - group by type
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-52"
        >
          <PieChart className="">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={55}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent className="flex-wrap gap-y-1" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentByTypeCard;
