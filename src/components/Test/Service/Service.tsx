import React from "react";
import {FormGroup, Input, Label} from "reactstrap";

type ServicePropsType = {
    id: number
    name: string
    innerRef: React.Ref<HTMLInputElement | HTMLTextAreaElement>
}
const Service:React.FC<ServicePropsType> = ({id, name,innerRef}) => {
    return (
        <FormGroup check>
            <Label check>
                <Input type="checkbox" name={`checkboxService.${id}`} innerRef={innerRef}/>{' '}
                {name}
            </Label>
        </FormGroup>
    )
}
export default Service
