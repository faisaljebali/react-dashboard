import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  UncontrolledTooltip,
  Input,
  Label,
  Row,
  Col } from 'reactstrap'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Eye, Archive, Trash, MoreVertical, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import { getAllDataEmploi } from '@store/actions/emploi'
import Spinner from '@src/@core/components/spinner/Loading'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from '@components/breadcrumbs'
import {columns} from './datatable/column'

const EmploiListe = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.emploi)
  const history = useHistory()
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    dispatch(
      getAllDataEmploi({
        page: 1,
        perPage: 1,
        status: 1,
        q: 1
      })
    )
  }, [])
  console.log(store.loading)
  //emploi
  const emploiData = store.data

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)
    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = emploiData.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
      let result
  
      const columnDelimiter = ','
      const lineDelimiter = '\n'
      const keys = Object.keys(emploiData[0])
  
      result = ''
      result += keys.join(columnDelimiter)
      result += lineDelimiter
  
      array.forEach(item => {
        let ctr = 0
        keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter
  
          result += item[key]
  
          ctr++
        })
        result += lineDelimiter
      })
  
      return result
    }
  
  // ** Downloads CSV
  function downloadCSV(array) {
      const link = document.createElement('a')
      let csv = convertArrayOfObjectsToCSV(array)
      if (csv === null) return
  
      const filename = 'export.csv'
  
      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`
      }
  
      link.setAttribute('href', encodeURI(csv))
      link.setAttribute('download', filename)
      link.click()
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / rowsPerPage : emploiData.length / rowsPerPage || 1}
      breakLabel='...'
      pageRangeDisplayed={1}
      marginPagesDisplayed={3}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  const NotFoundData = () => {
    return (<div className='notFoundData'>Il n'y a aucune offre à afficher</div>)
  }

  return (
      <div className='invoice-list-wrapper'>
        <Breadcrumbs breadCrumbTitle="Offres d'emploi" breadCrumbParent="Offres d'emploi" breadCrumbActive='Annonces' />
        <Card>
          <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
            <CardTitle tag='h1'></CardTitle>
            <div className='d-flex mt-md-0 mt-1'>
              <UncontrolledButtonDropdown>
                <DropdownToggle color='secondary' caret outline>
                  <Share size={15} />
                  <span className='align-middle ml-50'>Export</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className='w-100'>
                    <Printer size={15} />
                    <span className='align-middle ml-50'>Print</span>
                  </DropdownItem>
                  <DropdownItem className='w-100' onClick={() => downloadCSV(emploiData)}>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>CSV</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <Grid size={15} />
                    <span className='align-middle ml-50'>Excel</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <File size={15} />
                    <span className='align-middle ml-50'>PDF</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <Copy size={15} />
                    <span className='align-middle ml-50'>Copy</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <Button className='ml-2' color='primary' onClick={() => history.push("/jobs/add")}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Ajouter</span>
              </Button>
            </div>
          </CardHeader>
          <Row className='justify-content-end mx-0'>
            <Col className='d-flex align-items-center justify-content-end mt-1' md='3' sm='12'>
              <Label className='mr-1' for='search-input'>
                Rechercher
              </Label>
              <Input
                className='dataTable-filter mb-50'
                type='text'
                bsSize='sm'
                id='search-input'
                value={searchValue}
                onChange={handleFilter}
              />
            </Col>
          </Row>
          <div className='invoice-list-dataTable'>
          {!store.loading ? <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={rowsPerPage}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : emploiData}
            noDataComponent={<NotFoundData/>}
          /> : <Spinner/>}
          </div>
        </Card>
      </div>
    )

}

export default EmploiListe
