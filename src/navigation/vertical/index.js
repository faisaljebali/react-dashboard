import { Database, Home, Users, Calendar, Briefcase, Sliders, Cpu, HardDrive } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Tableau de bord',
    icon: <Cpu size={25} />,
    navLink: '/home'
  },
  {
    id: 'jobs',
    title: "Offres d'emploi",
    icon: <Briefcase size={25} />,
    navLink: '/jobs'
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
  },  
  {
    id: 'condidat',
    title: 'Candidats',
    icon: <Users size={25} />,
    navLink: '/condidat'
  },
  {
    id: 'departement',
    title: 'Département',
    icon: <HardDrive size={25} />,
    navLink: '/departement'
  },
  {
    id: 'calander',
    title: 'Calendrier',
    icon: <Calendar size={25} />,
    navLink: '/calander'
  },
  {
    id: 'equipe',
    title: 'Equipe',
    icon: <Database size={25} />,
    navLink: '/equipe'
  },
  {
    id: 'parametre',
    title: 'Parametre',
    icon: <Sliders size={25} />,
    navLink: '/Parametre'
  }
]
