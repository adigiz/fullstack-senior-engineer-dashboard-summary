import { TAppointmentsItem } from "@/types/appointment";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const appointmentColumns: ColumnDef<TAppointmentsItem>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const appointment = row.original;
      const date = format(appointment.date, "EEEE, dd MMMM yyyy");

      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "room",
    header: "Room",
  },
];
