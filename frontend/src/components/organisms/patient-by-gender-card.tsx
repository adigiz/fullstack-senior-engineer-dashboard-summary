import React from "react";
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
    name: "male",
    label: "Male",
    count: 120,
    fill: "var(--color-male)",
  },
  {
    name: "female",
    label: "Female",
    count: 350,
    fill: "var(--color-female)",
  },
  {
    name: "other",
    label: "Other",
    count: 50,
    fill: "var(--color-other)",
  },
];

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const PatientByGenderCard = () => {
  return (
    <Card className="flex flex-col md:flex-row">
      <CardHeader className="justify-center mx-auto md:mx-0 !pl-0 md:!pl-6 !pr-0 max-w-56">
        <CardTitle className="text-center md:text-left">
          Patient by Gender
        </CardTitle>
        <p className="text-sm text-center md:text-left text-muted-foreground">
          Showing total patient - group by gender
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

export default PatientByGenderCard;
