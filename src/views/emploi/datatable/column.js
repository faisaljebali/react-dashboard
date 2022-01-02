import {
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownItem,
    UncontrolledTooltip,
    Badge
    } from 'reactstrap'
  import { Link } from 'react-router-dom'
  import {Plus, Eye, Archive, Trash, MoreVertical, Edit, FileText, Users } from 'react-feather'
  import moment from 'moment'
  import 'moment/locale/fr'

// ** Table Column
export const columns = [
    {
      name: 'Titre',
      selector: 'title',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Remote',
      selector: 'isRemote',
      sortable: true,
      maxWidth: '100px',
      cell: row => {
        if (row.isRemote === 0) {
            return (<Badge color='danger' pill>Non</Badge>)
        } else {
            return (<Badge color='success' pill>Oui</Badge>)
        }
      }  
    },
    {
        name: 'Candidats',
        selector: 'created_at',
        sortable: true,
        maxWidth: '150px',
        cell: row => {
            return (<span>0 <Users size='15'/></span>)
        }
    },
    {
      name: 'Ajouté à',
      selector: 'created_at',
      sortable: true,
      cell: row => {
          return (<span>{moment(row.created_at).format("Do MMMM YYYY")}</span>)
      }
    },
    {
      name: '',
      allowOverflow: true,
      maxWidth: '200px',
      cell: row => {
        return (
          <div className='d-flex'>
            <Link to={`/apps/invoice/preview/${row.id}`} id={`tr-tooltip-${row.id}`}>
              <Trash size={17} className='mx-0' />
            </Link>
            <UncontrolledTooltip placement='top' target={`tr-tooltip-${row.id}`}>
              Delete Invoice
            </UncontrolledTooltip>
            <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
              <Eye size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
              Preview Invoice
            </UncontrolledTooltip>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={17} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>Details</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Archive size={15} />
                  <span className='align-middle ml-50'>Archive</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    }
  ]