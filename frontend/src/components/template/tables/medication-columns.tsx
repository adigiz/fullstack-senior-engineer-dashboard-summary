import { TMedicationsItem } from "@/types/medications";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const medicationColumns: ColumnDef<TMedicationsItem>[] = [
  {
    accessorKey: "name",
    header: () => <span className="block w-36">Name</span>,
  },
  {
    accessorKey: "dosage",
    header: () => <span className="block w-28">Dosage</span>,
  },
  {
    accessorKey: "frequency",
    header: () => <span className="block w-36">Frequency</span>,
  },
  {
    accessorKey: "createdAt",
    header: () => <span>Created At</span>,
    cell: ({ row }) => {
      const medication = row.original;
      const createdAt = format(medication.createdAt, "E, dd MMM yyyy");

      return <p>{createdAt}</p>;
    },
  },
];
