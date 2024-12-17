import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'
import { PrimeReactProvider } from 'primereact/api'
import { Paginator } from 'primereact/paginator'
import { useEffect, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useRef } from 'react'
import { Button } from 'primereact/button'
import { FaChevronDown } from 'react-icons/fa'

export default function Table() {
  const [page, setPage] = useState(1)
  const [rowInput, setRowInput] = useState(0)
  const rows = 12
  const onPageChange = (e: { page: number }) => {
    setPage(e.page + 1)
  }
  return (
    <div className="p-20 ">
      <PrimeReactProvider>
        <DataTable rows={12} stripedRows dataKey="id" className="custom-table" tableStyle={{ minWidth: '50rem' }}>
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="place_of_origin" header="Place of Origin" style={{ width: '25%' }}></Column>
          <Column field="artist_display" header="Artist Display" style={{ width: '25%' }}></Column>
          <Column field="inscriptions" header="Inscriptions" style={{ width: '25%' }}></Column>
          <Column field="date_start" header="Date Start" style={{ width: '15%' }}></Column>
          <Column field="date_end" header="Date End" style={{ width: '15%' }}></Column>
        </DataTable>
        <Paginator first={(page - 1) * rows} rows={12} totalRecords={126335} onPageChange={onPageChange} />
      </PrimeReactProvider>
    </div>
  )
}
