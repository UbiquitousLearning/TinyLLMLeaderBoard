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
  getExpandedRowModel,
} from "@tanstack/react-table";
import { info, Info, Record, records } from "./lib/data";
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
import React, { Fragment } from "react";
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
const recordhelper = createColumnHelper<Record>();
const infohelper = createColumnHelper<Info>();

export const dataColumns: ColumnDef<Record>[] = [
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
  recordhelper.group({
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

  recordhelper.group({
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
    columns: dataColumns,
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
              <TableCell
                colSpan={dataColumns.length}
                className="h-24 text-center"
              >
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
const modelTypeIcon = {
  "": "🤖",
  instruct: "💠",
  chat: "💬",
  undefined: "🤖",
};

export const accColumns: ColumnDef<Info>[] = [
  {
    header: "Name",
    accessorKey: "Model",
    cell: (record) => (
      <a
        href={
          record.row.original.Link ??
          "https://huggingface.co/" + record.row.original.Model
        }
        target="_blank"
        rel="noreferrer"
        style={{ maxWidth: "350px", display: "inline-block" }}
        className={record.row.original.Link ? "text-blue-500" : "text-gray-500"}
      >
        {
          modelTypeIcon[
            record.row.original.Type.toLowerCase() as keyof typeof modelTypeIcon
          ]
        }{" "}
        {record.getValue() as string}
      </a>
    ),
  },
  {
    header: "Parameters",
    accessorKey: "Parameters",
    cell: (record) => (
      <span>
        {(record.getValue() as string).length > 1
          ? (record.getValue() as string)
          : "-"}
      </span>
    ),
  },
  {
    header: "Release Date",
    accessorKey: "ReleaseDate",
    cell: (record) => <span>{record.getValue() as string}</span>,
  },
  {
    header: "Affiliation",
    accessorKey: "affiliation",
    cell: (record) => <span>{record.getValue() as string}</span>,
  },
  {
    header: "Context Window",
    accessorKey: "MaxContextWindow",
    cell: (record) => (
      <span>
        {(record.getValue() as string).length > 1
          ? (record.getValue() as string)
          : "-"}
      </span>
    ),
  },
  {
    header: "Training Tok",
    accessorKey: "TrainingTokens",
    cell: (record) => (
      <span style={{ width: "150px", display: "inline-block" }}>
        {(record.getValue() as string).length > 1
          ? (record.getValue() as string)
          : "-"}
      </span>
    ),
  },
  infohelper.group({
    header: () => {
      return <div>Performance</div>;
    },
    id: "performance",
    columns: [
      {
        // header: "Commonsense \n reasoning/understanding",
        header: () => {
          return (
            <span>
              Commonsense <br />
              reasoning
            </span>
          );
        },
        accessorKey: "Commonsensereasoning",
        // fixed 2 decimal points

        cell: (record) => {
          const value = parseFloat(record.getValue()?.toString() ?? "");
          return <span>{isNaN(value) ? "-" : value.toFixed(4)}</span>;
        },
      },
      {
        header: () => {
          return (
            <span>
              Problem <br />
              solving
            </span>
          );
        },
        accessorKey: "Problemsolving",
        cell: (record) => {
          const value = parseFloat(record.getValue() as string);
          return <span>{isNaN(value) ? "-" : value.toFixed(4)}</span>;
        },
      },
      {
        header: "Math",
        accessorKey: "Math",
        cell: (record) => {
          const value = parseFloat(record.getValue()?.toString() ?? "");
          return <span>{isNaN(value) ? "-" : value.toFixed(4)}</span>;
        },
      },
    ],
  }),
];
export function InfoTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data: info,
    columns: accColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,

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
                // console.log(header);
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
              <Fragment key={row.id}>
                <TableRow
                  onClick={() => {
                    row.toggleExpanded();
                    console.log(row);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      {/* Description of rows of Attention Type ,	Layer Number,	Hidden Size,	Head Num,	Activation,	Vocabulary Size,	FFN ratio	,Architecture Innovation ,Training Innovations,Training Datasets */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                        <div>
                          <span className="font-bold">Attention Type:</span>{" "}
                          {row.original.AttentionType}
                        </div>
                        <div>
                          <span className="font-bold">Layer Number:</span>{" "}
                          {row.original.LayerNumber}
                        </div>
                        <div>
                          <span className="font-bold">Hidden Size:</span>{" "}
                          {row.original.HiddenSize}
                        </div>
                        <div>
                          <span className="font-bold">Head Num:</span>{" "}
                          {row.original.HeadNum}
                        </div>
                        <div>
                          <span className="font-bold">Activation:</span>{" "}
                          {row.original.Activation}
                        </div>
                        <div>
                          <span className="font-bold">Vocabulary Size:</span>{" "}
                          {row.original.VocabularySize}
                        </div>
                        <div>
                          <span className="font-bold">FFN ratio:</span>{" "}
                          {row.original.FFNratio}
                        </div>
                        {row.original.ArchitectureInnovation.length > 1 && (
                          <div className="col-span-4">
                            <span className="font-bold">
                              Architecture Innovation:
                            </span>
                            {"{"}
                            {row.original.ArchitectureInnovation}
                            {"}"}
                          </div>
                        )}
                        {row.original.TrainingInnovations.length > 1 && (
                          <div className="col-span-4">
                            <span className="font-bold">
                              Training Innovations:
                            </span>
                            {"{"}
                            {row.original.TrainingInnovations}
                            {"}"}
                          </div>
                        )}
                        <div className="col-span-4">
                          <span className="font-bold">Training Datasets:</span>{" "}
                          {row.original.TrainingDatasets}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={100} className="h-24 text-center">
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