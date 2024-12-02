import { Button } from "@/components/ui/button";
import { TPatientItem } from "@/types/patients";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const patientColumns: ColumnDef<TPatientItem>[] = [
  {
    accessorKey: "name",
    header: () => <span className="block w-36">Name</span>,
  },
  {
    accessorKey: "age",
    header: () => <span className="block w-12">Age</span>,
  },
  {
    accessorKey: "dateOfBirth",
    header: () => <span className="block w-32">Date of Birth</span>,
    cell: ({ row }) => {
      const patient = row.original;
      const dob = format(patient.dateOfBirth, "E, dd MMM yyyy");

      return <p>{dob}</p>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    id: "actions",
    header: () => <span className="block w-32">Actions</span>,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <Button asChild variant={"outline"}>
          <Link to={`/dashboard/patient/edit/${patient.id}`}>
            <EditIcon />
          </Link>
        </Button>
      );
    },
  },
];
