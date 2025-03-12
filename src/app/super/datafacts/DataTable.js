import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check, SortAsc, SortDesc } from "lucide-react";

const DataTable = ({ data }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSort = (columnIndex) => {
    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
  };

  // Sort data if sorting is active
  const sortedRows = React.useMemo(() => {
    if (sortColumn === null) return data.rows;

    return [...data.rows].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      // Handle different data types
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle string comparison
      const stringA = String(valueA).toLowerCase();
      const stringB = String(valueB).toLowerCase();

      if (stringA < stringB) return sortDirection === "asc" ? -1 : 1;
      if (stringA > stringB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data.rows, sortColumn, sortDirection]);

  return (
    <div className="w-full overflow-x-auto">
      <h3 className="font-medium text-gray-900 mb-2">{data.title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {data.columns.map((column, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-sm font-medium text-gray-700 border border-gray-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(index)}
              >
                <div className="flex items-center gap-1">
                  <span className="truncate">{column}</span>
                  {sortColumn === index ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="w-3 h-3 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-blue-600" />
                    )
                  ) : (
                    <div className="w-3 h-3" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr
                className={`border-t border-gray-200 hover:bg-blue-50 ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} ${expandedRow === rowIndex ? "bg-blue-50" : ""}`}
                onClick={() =>
                  data.rowDetails
                    ? setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
                    : null
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3 py-2 text-sm border border-gray-200 ${cellIndex === 0 ? "font-medium" : ""}`}
                  >
                    {/* Customize cell display based on data type */}
                    {typeof cell === "number" ? (
                      data.columns[cellIndex].toLowerCase().includes("price") ||
                      data.columns[cellIndex].toLowerCase().includes("cost") ||
                      data.columns[cellIndex].toLowerCase().includes("value") ||
                      data.columns[cellIndex]
                        .toLowerCase()
                        .includes("investment") ? (
                        `$${cell.toLocaleString()}`
                      ) : data.columns[cellIndex]
                          .toLowerCase()
                          .includes("rate") ||
                        data.columns[cellIndex]
                          .toLowerCase()
                          .includes("percentage") ||
                        data.columns[cellIndex]
                          .toLowerCase()
                          .includes("change") ||
                        data.columns[cellIndex]
                          .toLowerCase()
                          .includes("growth") ? (
                        `${cell}%`
                      ) : (
                        cell.toLocaleString()
                      )
                    ) : typeof cell === "boolean" ? (
                      cell ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        "No"
                      )
                    ) : Array.isArray(cell) ? (
                      <div className="flex flex-wrap gap-1">
                        {cell.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>

              {/* Expandable row details if available */}
              {data.rowDetails && expandedRow === rowIndex && (
                <tr>
                  <td
                    colSpan={data.columns.length}
                    className="bg-blue-50 px-4 py-3 text-sm border border-gray-200"
                  >
                    <div className="text-gray-700">
                      {data.rowDetails[rowIndex]}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {data.footnote && (
        <div className="mt-2 text-xs text-gray-500 italic">{data.footnote}</div>
      )}
    </div>
  );
};

export default DataTable;
