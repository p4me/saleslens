import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import './datatable.css'

export default function DataTable({
  data,
  columns,
  globalFilter = '',
  columnFilters = [],
  pageSize = 10,
  onRowClick,
}) {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize })

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  const { pageIndex, pageSize: ps } = table.getState().pagination
  const total   = table.getFilteredRowModel().rows.length
  const from    = total === 0 ? 0 : pageIndex * ps + 1
  const to      = Math.min((pageIndex + 1) * ps, total)
  const pageCount = table.getPageCount()

  return (
    <div className="dt-wrapper">
      <div className="dt-scroll">
        <table className="dt-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  const canSort = header.column.getCanSort()
                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={canSort ? 'dt-th dt-th--sortable' : 'dt-th'}
                      style={{ width: header.column.columnDef.width }}
                    >
                      <span className="dt-th-inner">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="dt-sort-icon">
                            {sorted === 'asc'  ? '↑' : sorted === 'desc' ? '↓' : '⇅'}
                          </span>
                        )}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="dt-empty">
                  No results found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`dt-row${onRowClick ? ' dt-row--clickable' : ''}`}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="dt-td">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="dt-pagination">
        <span className="dt-count">
          {total === 0 ? 'No results' : `Showing ${from}–${to} of ${total}`}
        </span>
        <div className="dt-page-controls">
          <button
            className="dt-page-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ← Prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => i)
            .filter((i) => Math.abs(i - pageIndex) <= 2)
            .map((i) => (
              <button
                key={i}
                className={`dt-page-btn dt-page-num ${i === pageIndex ? 'dt-page-num--active' : ''}`}
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </button>
            ))}

          <button
            className="dt-page-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
