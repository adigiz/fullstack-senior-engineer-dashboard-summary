import React, { useEffect } from "react";
import { useParams } from "react-router";
import AddEditPatientForm from "../template/forms/add-edit-patient-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AppointmentTable from "../template/tables/appointment-table";
import { appointmentColumns } from "../template/tables/appointment-columns";
import MedicationTable from "../template/tables/medication-table";
import { medicationColumns } from "../template/tables/medication-columns";
import DiagnosesTable from "../template/tables/diagnoses-table";
import { diagnosesColumn } from "../template/tables/diagnoses-column";
import AllergiesTable from "../template/tables/allergies-table";
import { allergiesColumns } from "../template/tables/allergies-columns";
import { Button } from "../ui/button";
import { getPatientById } from "@/services/patient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import AddMedicationForm from "../template/forms/add-medication-form";

const CreateEditPatient = () => {
  const { id: patientId } = useParams(); 
  const isEditMode = Boolean(patientId); 

  const fetchPatientById = async (id: string) => {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 1000)
      );

      const res = await getPatientById(id);

      if (res.status === 200) {
        return res.data;
      }

      return res;
    } catch (error: any) {
      toast.error(error?.toString());
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      const res = await fetchPatientById(patientId as string);
      return res?.data;
    },
    enabled: isEditMode,
  });

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to={"/dashboard"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/dashboard/patient">Patient List</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditMode ? "Patient Detail" : "Add Patient"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[40vh]">
            <Loader2 className="animate-spin size-16" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <AddEditPatientForm data={data} />
            <div className="lg:col-span-2">
              <Tabs defaultValue="medications">
                <TabsList className="grid h-auto grid-cols-2 gap-2 sm:inline-flex">
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
                  <TabsTrigger value="allergies">Allergies</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="medications">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Medication List</p>
                    <AddMedicationForm />
                  </div>
                  <div className="mt-4">
                    <MedicationTable
                      columns={medicationColumns}
                      data={data?.medications || []}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="diagnoses">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Diagnosis List</p>
                    <Button>Add Diagnosis</Button>
                  </div>
                  <div className="mt-4">
                    <DiagnosesTable
                      columns={diagnosesColumn}
                      data={data?.diagnoses || []}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="allergies">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Allergy List</p>
                    <Button>Add Allergy</Button>
                  </div>
                  <div className="mt-4">
                    <AllergiesTable
                      columns={allergiesColumns}
                      data={data?.allergies || []}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="appointments">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Appointment List</p>
                    <Button>Add Appointment</Button>
                  </div>
                  <div className="mt-4">
                    <AppointmentTable
                      columns={appointmentColumns}
                      data={data?.appointments || []}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateEditPatient;
