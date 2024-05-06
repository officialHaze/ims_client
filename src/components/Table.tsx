import React, { ReactNode, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface Props extends React.HTMLProps<HTMLElement> {
  columnLabels: string[];
  rowData: ReactNode[];
}

export default function Table({ className, columnLabels, rowData }: Props) {
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState<ReactNode[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Set the initial row count
  useEffect(() => {
    setRowCount(Math.ceil(rowData.length / 2));

    return () => setRowCount(0);
  }, [rowData]);

  // Filter the rows whenever the row count changes
  useEffect(() => {
    const rows: ReactNode[] = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(rowData[i]);
    }

    setRows([...rows]);

    return () => setRows([]);
  }, [rowCount, rowData]);

  // Update the total pages state whenever the row count changes
  useEffect(() => {
    setTotalPages(Math.ceil(rowData.length / rowCount) || 0);

    return () => setTotalPages(0);
  }, [rowCount, rowData]);

  // Pagination. Display rows based on the change in current page
  useEffect(() => {
    const j = rowCount * currentPage;
    let i = j - rowCount;

    const rows: ReactNode[] = [];
    while (i < j) {
      rows.push(rowData[i]);
      i++;
    }

    setRows([...rows]);

    return () => setRows([]);
  }, [currentPage, rowCount, rowData]);

  useEffect(() => {
    totalPages > 0 && setCurrentPage(1); // Reset to default anytime the total pages value and state changes

    return () => setCurrentPage(0);
  }, [totalPages]);

  return (
    <div>
      <table className="w-full rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#C0D6E8]">
            {columnLabels.map((label, idx) => (
              <td
                key={idx}
                className={`text-center font-bold p-2 ${
                  idx !== columnLabels.length - 1 && "border-r border-gray-400"
                }`}
              >
                {label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(row => row)}</tbody>
      </table>
      <footer className="flex items-center justify-center p-6 gap-6">
        <div className="flex items-center gap-4 w-[8rem]">
          Rows:{" "}
          <span>
            <input
              className="outline-none bg-transparent border-b border-gray-300 text-center w-full"
              type="text"
              value={rowCount || ""}
              onChange={e =>
                (parseInt(e.currentTarget.value) <= rowData.length || !e.currentTarget.value) &&
                setRowCount(parseInt(e.currentTarget.value))
              }
            />
          </span>
        </div>
        <div className="flex items-center gap-2 w-[10rem]">
          Page:{" "}
          <span>
            <MdOutlineKeyboardArrowLeft
              onClick={e => setCurrentPage(currentPage - 1)}
              className={`text-xl cursor-pointer ${
                (currentPage <= 1 || totalPages <= 0) && "hidden"
              }`}
            />
          </span>
          <span>
            <input
              disabled={totalPages <= 0}
              className="outline-none bg-transparent border-b border-gray-300 text-center w-full"
              type="text"
              value={currentPage || ""}
              onChange={e =>
                (parseInt(e.currentTarget.value) <= totalPages || !e.currentTarget.value) &&
                setCurrentPage(parseInt(e.currentTarget.value) || 0)
              }
            />
          </span>
          <span>
            <MdOutlineKeyboardArrowRight
              onClick={e => setCurrentPage(currentPage + 1)}
              className={`text-xl cursor-pointer ${
                (currentPage === totalPages || totalPages <= 0) && "hidden"
              }`}
            />
          </span>
        </div>
        <div>
          Total pages: <span>{totalPages || ""}</span>
        </div>
      </footer>
    </div>
  );
}
