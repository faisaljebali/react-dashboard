import { Fragment, useState, useContext } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Loader } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, FormFeedback, Label, Button, Form, Input, CustomInput } from 'reactstrap'

import '@styles/base/pages/page-auth.scss'

const Register = () => {
  
  const SignupSchema = yup.object().shape({
    email: yup.string().email("Veuillez saisir une adresse email valide").required("Adresse email est obligatoire"),
    lastName: yup.string().required("Le prénom est obligatoire"),
    name: yup.string().required("Le nom est obligatoire"),
    companyName: yup.string().required("Le nom de l'entreprise est obligatoire"),
    password: yup.string().min(8, "Veuillez saisir 8 caractères minimum").required("Mot de passe est obligatoire"),
    terms: yup.boolean().oneOf([true], 'Ce champ est obligatoire')  
  })  
  const ability = useContext(AbilityContext)

  const [skin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [terms, setTerms] = useState(false)
  const [loader, setLoader] = useState(false)
  
  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        J'accepte les 
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
            Conditions d'utilisation 
        </a>.
      </Fragment>
    )
  }

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      setLoader(!loader)
      useJwt
        .register({ name, last_name:lastName, email, password, companyName })
        .then(res => {
          setLoader(false)
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
            //if (res.data.error.email && res.data.error.email !== null) console.error(res.data.error.email)
            //if (res.data.error.name && res.data.error.name !== null) console.error(res.data.error.name)
        } else {
            setValErrors({})
            const data = { ...res.data.user, accessToken: res.data.accessToken }
            ability.update(res.data.user.ability)
            dispatch(handleLogin(data))
            history.push('/')
          }
        })
        .catch(err => {
            setLoader(false)
            console.log(err)
        })
    }
  }

  const handleUsernameChange = e => {
    const errs = valErrors
    if (errs.name) delete errs.name
    setName(e.target.value)
    setValErrors(errs)
  }

  const handleLastNameChange = e => {
    const errs = valErrors
    if (errs.lastName) delete errs.lastName
    setLastName(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }

  const handleCompanyNameChange = e => {
    const errs = valErrors
    if (errs.companyName) delete errs.companyName
    setCompanyName(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ml-1'>Vuexy</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label className='form-label' for='register-username'>
                    Prénom
                    </Label>
                    <Input
                    autoFocus
                    type='text'
                    placeholder='Prénom'
                    id='register-username'
                    name='lastName'
                    onChange={handleLastNameChange}
                    className={classnames({ 'is-invalid': errors['lastName'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                    {Object.keys(valErrors).length && valErrors.lastName ? (
                    <small className='text-danger'>{valErrors.lastName}</small>
                    ) : null}
                    {errors && errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Nom
                </Label>
                <Input
                  type='text'
                  placeholder='Nom'
                  id='register-username'
                  name='name'
                  onChange={handleUsernameChange}
                  className={classnames({ 'is-invalid': errors['name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.name ? (
                  <small className='text-danger'>{valErrors.name}</small>
                ) : null}
                {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='register-email'
                  name='email'
                  onChange={handleEmailChange}
                  placeholder='john@example.com'
                  className={classnames({ 'is-invalid': errors['email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null}
                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Nom de l'entreprise 
                </Label>
                <Input
                  type='text'
                  id='register-company'
                  name='companyName'
                  onChange={handleCompanyNameChange}
                  placeholder='Entreprise'
                  className={classnames({ 'is-invalid': errors['companyName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.companyName ? (
                  <small className='text-danger'>{valErrors.companyName}</small>
                ) : null}
                {errors && errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Mot de passe
                </Label>
                <InputPasswordToggle
                  id='register-password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value={terms}
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
              {loader && <Loader className='loader'/>} Inscrivez-vous
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Vous avez déjà un compte?</span>
              <Link to='/login'>
                <span>Connexion</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
