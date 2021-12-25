import { Card } from 'reactstrap'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

const Users = () => {
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //users
  const users = [{id: '1', name: 'saleh'}, {id: '2', name: 'faisal'}]


  // ** Table columns
  const columns = [
    {
      name: '#',
      minWidth: '107px',
      selector: 'id'
    },
    {
      name: '#fvf',
      minWidth: '107px',
      selector: 'name'
    }
  ]


  return (
      <div className='invoice-list-wrapper'>
        <Card>
          <div className='invoice-list-dataTable'>
            <DataTable
              noHeader
              pagination
              paginationServer
              subHeader={true}
              columns={columns}
              responsive={true}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='invoiceId'
              paginationDefaultPage={1}
              data={users}
            />
          </div>
        </Card>
      </div>
    )

}

export default Users
