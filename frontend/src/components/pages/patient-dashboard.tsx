import MetricCard from "../molecules/metric-card";
import { Users } from "lucide-react";
import PatientByAgeCard from "../organisms/patient-by-age-card";
import PatientByGenderCard from "../organisms/patient-by-gender-card";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import PatientTable from "../template/tables/patient-table";
import { patientColumns } from "../template/tables/patient-columns";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllPatient } from "@/services/patient";
import { toast } from "sonner";

const PatientDashboard = () => {
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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col space-y-4">
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
          <PatientByGenderCard />
        </div>
        <PatientByAgeCard />
      </div>
      <div className="grid grid-cols-1">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Patients List</CardTitle>
            <div className="flex items-center justify-between">
              <div></div>
              <Button asChild>
                <Link to={"/dashboard/patient/add"}>Add Patients</Link>
              </Button>
            </div>
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

export default PatientDashboard;
