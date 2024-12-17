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
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [rowInput, setRowInput] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const rows = 12
  const op = useRef<OverlayPanel>(null)
  const handleOverlaySubmit = () => {
    selectRows(rowInput)
    op.current?.hide()
  }

  const selectRows = async (numRows: number) => {
    const selected: any[] = []
    let remainingRows = numRows
    let currentPage = page
    while (remainingRows > 0 && currentPage <= Math.ceil(totalRecords / rows)) {
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${currentPage}`)
      const pageData = response.data.data
      const rowsToSelect = pageData.slice(0, remainingRows)
      selected.push(...rowsToSelect)
      remainingRows -= rowsToSelect.length
      currentPage += 1
    }
    setSelectedRows(selected)
  }

  const headerTemplate = (
    <div className="flex align-items-center gap-2">
      <Button onClick={(e) => op.current?.toggle(e)}>
        <FaChevronDown />
      </Button>
      <OverlayPanel ref={op} className="custom-overlay-panel">
        <div className="overlay-content">
          <h5 className="overlay-title">Select Rows</h5>
          <input type="number" className="overlay-input p-inputtext p-component" value={rowInput || ''} onChange={(e) => setRowInput(Number(e.target.value))} placeholder="Enter number of rows" />
          <Button label="Submit" icon="pi pi-check" onClick={handleOverlaySubmit} className="p-button-sm overlay-submit-btn" />
        </div>
      </OverlayPanel>
      <h2>Title</h2>
    </div>
  )
  useEffect(() => {
    axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`).then((res) => {
      setData(res.data.data)
      setTotalRecords(res.data.pagination.total)
    })
  }, [page])
  const onPageChange = (e: { page: number }) => {
    setPage(e.page + 1)
  }
  return (
    <div className="p-20 ">
      <PrimeReactProvider>
        <DataTable
          value={data}
          rows={12}
          stripedRows
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          className="custom-table"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="title" header={headerTemplate} style={{ width: '25%', justifyContent: 'space-around' }}></Column>
          <Column field="place_of_origin" header="Place of Origin" style={{ width: '25%' }}></Column>
          <Column field="artist_display" header="Artist Display" style={{ width: '25%' }}></Column>
          <Column field="inscriptions" header="Inscriptions" style={{ width: '25%' }}></Column>
          <Column field="date_start" header="Date Start" style={{ width: '15%' }}></Column>
          <Column field="date_end" header="Date End" style={{ width: '15%' }}></Column>
        </DataTable>
        <Paginator first={(page - 1) * rows} rows={12} totalRecords={126335} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
      </PrimeReactProvider>
    </div>
  )
}
