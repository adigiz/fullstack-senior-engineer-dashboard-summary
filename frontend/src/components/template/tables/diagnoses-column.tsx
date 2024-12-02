import { TDiagnosesItem } from "@/types/diagnoses";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const diagnosesColumn: ColumnDef<TDiagnosesItem>[] = [
  {
    accessorKey: "diagnosis",
    header: () => <span className="block w-36">Diagnosis Result</span>,
  },
  {
    accessorKey: "date",
    header: () => <span className="block w-28">Diagnosed At</span>,
    cell: ({ row }) => {
      const diagnoses = row.original;
      const diagnoseAt = format(diagnoses.date, "E, dd MMM yyyy");

      return <p>{diagnoseAt}</p>;
    },
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
