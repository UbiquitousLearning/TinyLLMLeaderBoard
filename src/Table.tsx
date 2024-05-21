import { Badge } from "./components/ui/badge";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { Record, records } from "./lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const helper = createColumnHelper<Record>();
export const columns: ColumnDef<Record>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (record) => (
      <a
        href={record.row.original.link ?? null}
        target="_blank"
        rel="noreferrer"
        className={record.row.original.link ? "text-blue-500" : "text-gray-500"}
      >
        {record.getValue() as string}
      </a>
    ),
  },

  {
    header: "Quantization",
    accessorKey: "quantization",
    cell: (record) => {
      const quantization = record.getValue() as string;
      return (
        <Badge variant={quantization === "INT4" ? "default" : "secondary"}>
          {quantization}
        </Badge>
      );
    },
  },
  {
    // Add Filter
    header: ({ column }) => {
      const sortedUniqueValues = React.useMemo(
        () =>
          Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
        [column.getFacetedUniqueValues()]
      );
      console.log(column.getFilterValue());
      return (
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              Device <Search className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <Select onValueChange={(e: string) => column.setFilterValue(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Device ..."></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {sortedUniqueValues.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
    accessorKey: "device",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Memory Usage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "memory",
    enableSorting: true,
    invertSorting: true,
    cell: (record) => {
      try {
        const memory = Number(record.getValue()) as number;
        if (isNaN(memory)) return <span>-</span>;
        return (
          <span>
            {memory.toFixed(4)} <span className="text-xs"> GB</span>
          </span>
        );
      } catch (error) {
        return <span>-</span>;
      }
    },
  },
  helper.group({
    header: "Latency",
    id: "latency",
    columns: [
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              Prefilling
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "prefilling_latency",
        enableSorting: true,
        invertSorting: true,
        cell: (record) => {
          const latency_ = record.getValue() as string;
          if (latency_.length < 2) return <span>-</span>;
          // latency is in the form of "min/max/avg", we are interested in avg
          // console.log(latency_);
          const latency = latency_.split("/")[3];
          return (
            <span>
              {latency} <span className="text-xs"> Tok/s</span>
            </span>
          );
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              Decoding
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "decoding_latency",
        enableSorting: true,
        invertSorting: true,
        cell: (record) => {
          const latency_ = record.getValue() as string;
          if (latency_.length < 2) return <span>-</span>;
          // latency is in the form of "min/max/avg", we are interested in avg
          const latency = latency_.split("/")[3];
          return (
            <span>
              {latency} <span className="text-xs"> Tok/s</span>
            </span>
          );
        },
      },
    ],
  }),

  helper.group({
    header: () => {
      return <div>Performance</div>;
    },
    id: "performance",
    columns: [
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              Winogrande
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },

        id: "performance.wino",
        accessorFn: (record) => record.performance.wino,
        enableSorting: true,
      },
      // performance.mmlu
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              MMLU
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        id: "performance.mmlu",
        accessorFn: (record) => record.performance.mmlu,
        enableSorting: true,
      },
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              Hellaswag
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        id: "performance.hellaswag",
        accessorFn: (record) => record.performance.hellaswag,
        enableSorting: true,
      },
    ],
  }),
];
export const data: Record[] = records as any as Record[];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border my-2 overflow-auto ">
      <Table>
        <TableHeader className="sticky">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                console.log(header);
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? (
                      <tr></tr>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* <div className="overflow-auto w-full"> */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* </div> */}
      </Table>
    </div>
  );
}
