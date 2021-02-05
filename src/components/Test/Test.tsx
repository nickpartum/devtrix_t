import {
    Button,
    Col, Container,
    Form,
    FormFeedback,
    FormGroup, FormText,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Service from "./Service/Service";

type FormValues = {
    title: string
    descrption: string
    status: boolean
    phone: string
    email: string
    file: object
    checkboxService: object
}

const serviceData = [
    {id: 1, name: 'checkbox с платной услугой 1'},
    {id: 2, name: 'checkbox с платной услугой 2'},
    {id: 3, name: 'checkbox с платной услугой 3'},
    {id: 4, name: 'checkbox с платной услугой 4'},
]

const Test = () => {

    const [activeTab, setActiveTab] = useState('1')
    const {register, handleSubmit, errors, getValues, watch, setError, clearErrors, setValue} = useForm()
    const onSubmit = (data: FormValues, error: any) => {
        console.log(data);
        console.log(error);
    }
    const isValid = () => {
        if (+activeTab === 1 && watch('title') === '') {
            setError("title", {
                type: "manual",
                message: "Dont Forget Your Title Should Be Cool!"
            })
            return false
        }
        if (+activeTab === 2 && watch('phone') === '') {
            setError("phone", {
                type: "manual",
                message: "Dont Forget Your Phone Number!"
            })
            return false
        }
        return true
    }
    const previosTab = () => {
        if (+activeTab > 1) {
            const newTab = +activeTab - 1
            setActiveTab(`${newTab}`)
        }
    }
    const nextTab = () => {
        if (isValid()) {
            if (+activeTab < 4) {
                const newTab = +activeTab + 1
                setActiveTab(`${newTab}`)
            }
        }
    }
    const onSelectFile = () => {
        const files  = Object.values(getValues('file'))
        if(files.length > 5){
            setError("file", {
                type: "manual",
                message: "Too many files! Only 5!"
            })
            setValue('file', null)
        }else{
            clearErrors("file")
        }
    }

    const serviceElements = serviceData.map((e)=>{
        return <Service name={e.name} id={e.id} key={e.id} innerRef={register()}/>
    })

    return (
        <Container>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({active: activeTab === '1'})}>
                        Основная информация
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: activeTab === '2'})}>
                        Контактная информация
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: activeTab === '3'})}>
                        Фотография
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: activeTab === '4'})}>
                        Публикация
                    </NavLink>
                </NavItem>
            </Nav>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="formTitle">Заголовок</Label>
                                    <Input type="text"
                                           name="title"
                                           id="formTitle"
                                           innerRef={register({required: true})}
                                           invalid={(errors.title ? true : false)}
                                           onChange={() => clearErrors("title")}
                                    />
                                    <FormFeedback>{errors.title && errors.title.message}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="formDescription">Описание</Label>
                                    <Input type="textarea" name="description" id="formDescription"/>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox"
                                               name="status"
                                               innerRef={register}
                                        />{' '}
                                        Статус {watch('status') ? 'on' : 'off'}
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <FormGroup>
                                    <Label for="formPhone">Номер телефона</Label>
                                    <Input type="text"
                                           name="phone"
                                           id="formPhone"
                                           innerRef={register({required: true})}
                                           invalid={(errors.phone ? true : false)}
                                           onChange={() => clearErrors("phone")}
                                    />
                                    <FormFeedback>{errors.phone && errors.phone.message}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="formEmail">Емайл</Label>
                                    <Input type="text" name="email" id="formEmail"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <FormGroup>
                                    <Label for="exampleFile">Загрузка до 5 фотографий</Label>
                                    <Input type="file"
                                           name="file"
                                           id="formFile"
                                           innerRef={register}
                                           multiple
                                           maxLength={5}
                                           max={5}
                                           onChange={onSelectFile}
                                           invalid={(errors.file ? true : false)}
                                    />
                                    <FormFeedback>{errors.file && errors.file.message}</FormFeedback>
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </FormGroup>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        {serviceElements}
                    </TabPane>
                </TabContent>
                {/*<input type="submit"/>*/}
                {(+activeTab !== 1) && <Button onClick={previosTab}>Prev</Button>}
                {(+activeTab !== 4) && <Button onClick={nextTab}>Next</Button>}
                {(+activeTab === 4) && <Button color={'success'} type="submit">Save</Button>}
            </Form>
        </Container>
    )
}
export default Test
