/* eslint-disable @typescript-eslint/no-explicit-any */
import MetricCard from "../molecules/metric-card";
import {
  ArrowUpRight,
  Calendar,
  CalendarClock,
  Clock,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import PatientTable from "../template/tables/patient-table";
import { patientColumns } from "../template/tables/patient-columns";
import { getAllPatient } from "@/services/patient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const location = useLocation();
  const { pathname } = location;

  const fetchAllPatients = async () => {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 1000)
      );

      const res = await getAllPatient();

      if (res.status === 200) {
        return res.data;
      }

      return res;
    } catch (error: any) {
      toast.error(error?.toString());
    }
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["patient-list"],
    queryFn: async () => {
      const res = await fetchAllPatients();
      return res?.data;
    },
  });

  console.log("data", data);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard
          className="h-fit"
          title="Total Patients"
          metric="20,123"
          icon={<Users />}
        >
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </MetricCard>
        <MetricCard title="Next Appointment" icon={<Calendar />}>
          <div>
            {/* date */}
            <div className="flex items-center gap-2">
              <CalendarClock className="size-4" />
              <p>Monday, 21 December 2024</p>
            </div>
            {/* time */}
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <p className="">3:30 PM</p>
            </div>
            {/* patient name */}
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <p>John Doe</p>
            </div>
            {/* appointment type */}
            <div className="flex items-center gap-2">
              <Stethoscope className="size-4" />
              <p>Medications Only</p>
            </div>
          </div>
        </MetricCard>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        {/* list of recent patients */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Patients</CardTitle>
              <CardDescription>
                Recent Patients from your clinic.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="gap-1 ml-auto">
              <Link to={`${pathname}/patient`}>
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <PatientTable
              isLoading={isLoading}
              data={data?.patients}
              columns={patientColumns}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
