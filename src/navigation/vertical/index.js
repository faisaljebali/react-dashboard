import { Mail, Home, Users } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/users'
    /*children: [
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Mail size={20} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Users size={20} />,
        navLink: '/apps/invoice/preview'
      }
    ]*/
  }
]
