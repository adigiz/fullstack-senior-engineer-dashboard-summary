import MetricCard from "../molecules/metric-card";
import {
  Calendar,
  CalendarClock,
  Clock,
  Stethoscope,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AppointmentTable from "../template/tables/appointment-table";
import { appointmentColumns } from "../template/tables/appointment-columns";
import { APPOINTMENTS_DATA_MOCK } from "@/mock/appointments-data";
import AppointmentByTypeCard from "../organisms/appointment-by-type-card";

const AppointmentDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard title="Next Appointment" icon={<Calendar />}>
          <div>
            <div className="flex items-center gap-2">
              <CalendarClock className="size-4" />
              <p>Monday, 21 December 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <p className="">3:30 PM</p>
            </div>
            {/* patient name */}
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <p>John Doe</p>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="size-4" />
              <p>Medications Only</p>
            </div>
          </div>
        </MetricCard>
        <AppointmentByTypeCard />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Upcoming Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentTable
            columns={appointmentColumns}
            data={APPOINTMENTS_DATA_MOCK}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AppointmentDashboard;
