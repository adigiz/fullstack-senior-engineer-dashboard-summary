import { TAlergiesItem } from "@/types/alergies";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const allergiesColumns: ColumnDef<TAlergiesItem>[] = [
  {
    accessorKey: "allergy",
    header: () => <span className="block w-36">Allergy Name</span>,
  },
  {
    accessorKey: "severity",
    header: () => <span className="block w-36">Severity</span>,
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="block w-28">Created At</span>,
    cell: ({ row }) => {
      const diagnoses = row.original;
      const createdAt = format(diagnoses.createdAt, "E, dd MMM yyyy");

      return <p>{createdAt}</p>;
    },
  },
];
