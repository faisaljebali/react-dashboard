import {
    Input,
    Label,
    CardText,
    Form,
    FormFeedback,
    CustomInput,
    Button,
    FormGroup,
    Row,
    Col } from 'reactstrap'
  import { EditorState, convertToRaw } from 'draft-js'
  import draftToHtml from 'draftjs-to-html'
  import { isObjEmpty, selectThemeColors } from '@utils'
  import classnames from 'classnames'
  import * as yup from 'yup'
  import NumberInput from '@components/number-input'
  import { yupResolver } from '@hookform/resolvers/yup'
  import { useState, useRef } from 'react'
  import { useForm } from 'react-hook-form'
  import { addEmploi } from '@store/actions/emploi'
  import { useDispatch, useSelector } from 'react-redux'
  import { Editor } from 'react-draft-wysiwyg'
  import Select from 'react-select'
  import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
  
  const Details = ({ stepper, type }) => {
    const createSchema = yup.object().shape({
        title: yup.string().required("Titre est obligatoire"),
        description: yup.string().min(10, "Le prénom est obligatoire").required("Le prénom est obligatoire")
    })  
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(createSchema) })
    const dispatch = useDispatch()
    //const store = useSelector(state => state.emploi)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [location, setLocation] = useState('')
    const [typeEmploi, setTypeEmploi] = useState('')
    const [typeContrat, setTypeContrat] = useState('')
    const [numEmp, setNumEmp] = useState(1)
    const [isRemote, setIsRemote] = useState(0)

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    )
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)


    //Description Field
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    //Field title
    const handleTitleChange = e => {
        setTitle(e.target.value)
    }
    //Experience
    const handleExperienceChange = e => {
        setExperience(e.target.value)
        console.log(errors)
    }
    //Emplacement
    const handleLocationChange = e => {
        setLocation(e.target.value)
    }
    //NbEmployer
    const handlenumEmp = e => {
        setNumEmp(e.target.value)
    }
    //Type Contrat
    const handletypeContrat = e => {
        setTypeContrat(JSON.stringify(e))
    }
    //type Emploi
    const handletypeEmploi = e => {
        setTypeEmploi(JSON.stringify(e))
    }
    //Remote
    const handleIsRemote = e => {
        if (e.target.checked) {
            setIsRemote(1)
        } else {
            setIsRemote(0)
        }
    }

    //Submit Form
    const onSubmitForm = async (e) => {
        //console.log({title, markup, experience, location, numEmp, isRemote, typeEmploi, typeContrat})
        if (isObjEmpty(errors)) {
            await dispatch(
                addEmploi({title, description: markup, experience, location, numEmp, isRemote, typeEmploi, typeContrat})
            )  
            stepper.next()
        }
    }

    const TypeOptions = [
        { value: 'plein', label: 'Temps plein' },
        { value: 'partiel', label: 'Temps partiel' },
        { value: 'temporaire', label: 'Temporaire' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'stage', label: 'Stage' }
    ]

    const contratOptions = [
        { value: 'cdi', label: 'CDI'},
        { value: 'cdd', label: 'CDD'},
        { value: 'sivp', label: 'SIVP' }
    ]

    return (
        <div className='invoice-list-wrapper'>
                <Form className='emploi-form mt-2' onSubmit={handleSubmit(onSubmitForm)}>
                    <Row>
                        <Col md="12" className='mb-1'>
                            <FormGroup>
                                <Label for='emploi-titre'>Titre *</Label>
                                <Input 
                                    autoFocus
                                    type='text'
                                    placeholder="Titre de l'offre"
                                    id='emploi-titre'
                                    name='title'
                                    className={classnames({ 'is-invalid': errors['title'] })}
                                    onChange={handleTitleChange}
                                    innerRef={register({ required: true })}
                                />
                                {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col className='mb-1' md='6' sm='12'>
                            <Label>Type d'emploi *</Label>
                            <Select
                            theme={selectThemeColors}
                            name='typeEmploi'
                            className='react-select'
                            classNamePrefix='select'
                            options={TypeOptions}
                            isMulti
                            isClearable={false}
                            onChange={handletypeEmploi}
                            />
                        </Col>    
                        <Col className='mb-1' md='6' sm='12'>
                            <FormGroup>
                                <Label>Type de contrat</Label>
                                <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                isMulti
                                name='typeContrat'
                                options={contratOptions}
                                className='react-select'
                                classNamePrefix='select'
                                onChange={handletypeContrat}
                                />
          
                            </FormGroup>
                        </Col>  
                        <Col md="4" className='mb-1'>
                            <FormGroup>
                                <Label for='emploi-titre'>Expérience</Label>
                                <Input 
                                    type='text'
                                    placeholder="Expérience"
                                    id='emploi-titre'
                                    name='experience'
                                    className={classnames({ 'is-invalid': errors['experience'] })}
                                    onChange={handleExperienceChange}
                                    innerRef={register({ required: true })}
                                />
                            </FormGroup>
                        </Col> 
                        <Col md="4" className='mb-1'>
                            <FormGroup>
                                <Label for='emploi-titre'>Localisation</Label>
                                <Input 
                                    type='text'
                                    placeholder="Pays - ville"
                                    id='emploi-location'
                                    name='location'
                                    className={classnames({ 'is-invalid': errors['location'] })}
                                    onChange={handleLocationChange}
                                    innerRef={register({ required: true })}
                                />
                            </FormGroup>
                        </Col> 
                        <Col md="4" className='mb-1'>
                            <FormGroup>
                                <Label for='emploi-titre'>Nombre total d'embauches pour ce poste</Label>
                                <Col md="6" className='px-0'>
                                <Input 
                                    type='number'
                                    placeholder="1"
                                    id='emploi-num'
                                    name='numEmp'
                                    className={classnames({ 'is-invalid': errors['numEmp'] })}
                                    onChange={handlenumEmp}
                                    innerRef={register({ required: true })}
                                />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md="6" className='mb-1'>
                            <FormGroup>
                            <div>
                                <CardText className='mb-0'>Remote</CardText>
                                <CustomInput
                                className='custom-control-success'
                                type='switch'
                                id='secondary'
                                name='isRemote'
                                onChange={handleIsRemote}
                                //inline
                                value='1'
                                />
                            </div>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                            <Label for='basicInput'>Description</Label>
                            <Editor 
                                    defaultEditorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                            />
                            <div >
                                <Input 
                                    type='textarea'
                                    value={markup}
                                    placeholder='Description'
                                    id='emploi-description'
                                    name='description'
                                    className={classnames({ 'is-invalid': errors['description'], 'd-none': true})}
                                    onChange={handleDescriptionChange}
                                    innerRef={register({ required: true })}
                                />   
                                {errors && errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                            </div>
                            </FormGroup>
                        </Col>
                        <Col md="2" className='d-flex justify-flex-end'>
                            <Button type='submit' block color='primary' >
                                Suivant
                            </Button>
                        </Col>
                    </Row>     
                </Form>    
        </div>
    )
  
  }
  
  export default Details
  