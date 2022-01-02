import {
    Row,
    Col } from 'reactstrap'
  import Wizard from '@components/wizard'
  import { useState, useRef } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import Breadcrumbs from '@components/breadcrumbs'
  import Details from './steps/Details'
  
  const AddEmploi = () => {

    const dispatch = useDispatch()
    //const store = useSelector(state => state.emploi)
    const [description, setDescription] = useState('')
    const [stepper, setStepper] = useState(null)
    const ref = useRef(null)

    const steps = [
        {
          id: 'account-details',
          title: 'Offre Détails',
          subtitle: 'Entrez les détails de votre travail.',
          content: <Details stepper={stepper} type='wizard-vertical' />
        },
        {
          id: 'personal-info',
          title: 'Formulaire',
          subtitle: 'Formulaire de candidature',
          content: <Details stepper={stepper} type='wizard-vertical' />
        },
        {
          id: 'step-address',
          title: 'Email',
          subtitle: 'Add Address',
          content: <Details stepper={stepper} type='wizard-vertical' />
        },
        {
          id: 'social-links',
          title: 'Publier',
          subtitle: 'Publier votre offre',
          content: <Details stepper={stepper} type='wizard-vertical' />
        }
    ]

    return (
        <div className='vertical-wizard'>
            <Breadcrumbs linkParant='/jobs' breadCrumbTitle="Offres d'emploi" breadCrumbParent="Offres d'emploi" breadCrumbActive='Ajouter' />
            <Wizard
                //type='vertical'
                ref={ref}
                steps={steps}
                instance={el => setStepper(el)}
            />
        </div>
      )
  
  }
  
  export default AddEmploi
  