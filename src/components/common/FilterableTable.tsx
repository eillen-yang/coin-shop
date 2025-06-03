import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
};

type FilterableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function FilterableTable<T>({ data, columns }: FilterableTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilter = (key: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key as keyof T]) === value;
      })
    );
  }, [data, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (!sortKey) return 0;

      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {columns
          .filter((col) => col.filterable)
          .map((col) => {
            const values = Array.from(
              new Set(data.map((item) => String(item[col.key])))
            );
            return (
              <div className="text-sm">
                <label className="mr-2">{col.label}</label>
                <select
                  className="px-2 py-1 border"
                  value={filters[col.key] ?? ""}
                  onChange={(e) => handleFilter(col.key, e.target.value)}
                >
                  <option value="">전체</option>
                  {values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className="p-2 border-b bg-gray-100 cursor-pointer"
                key={col.key as string}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((col) => (
                <td key={col.key as string} className="p-2 text-center">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
