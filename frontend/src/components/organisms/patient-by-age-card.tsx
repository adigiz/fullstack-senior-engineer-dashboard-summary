import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    name: "age_0_17",
    label: "0-17",
    count: 120,
    fill: "var(--color-age_0_17)",
  },
  {
    name: "age_18_34",
    label: "18-34",
    count: 350,
    fill: "var(--color-age_18_34)",
  },
  {
    name: "age_35_50",
    label: "35-50",
    count: 420,
    fill: "var(--color-age_35_50)",
  },
  {
    name: "age_51_64",
    label: "51-64",
    count: 280,
    fill: "var(--color-age_51_64)",
  },
  {
    name: "age_65_plus",
    label: "65+",
    count: 64,
    fill: "var(--color-age_65_plus)",
  },
];

const chartConfig = {
  age_0_17: {
    label: "0-17",
    color: "hsl(var(--chart-1))",
  },
  age_18_34: {
    label: "18-34",
    color: "hsl(var(--chart-2))",
  },
  age_35_50: {
    label: "35-50",
    color: "hsl(var(--chart-3))",
  },
  age_51_64: {
    label: "50-64",
    color: "hsl(var(--chart-4))",
  },
  age_65_plus: {
    label: "65+",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const PatientByAgeCard = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Patient by Age</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto my-auto aspect-square h-[250px]"
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
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent className="flex-wrap gap-y-1" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total patient - group by age
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientByAgeCard;
