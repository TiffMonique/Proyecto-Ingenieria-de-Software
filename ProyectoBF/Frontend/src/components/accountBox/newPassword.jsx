import React, { useContext} from "react";
import {
BoldLink,
BoxContainer,
FieldContainer,
FieldError,
FormContainer,
Input,
MutedLink,
SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
import * as yup from "yup";
//import axios from "axios";
//import swal from "sweetalert";



const PASSWORD_REGEX= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

//Validacion de campos vacios
const validationSchema = yup.object({
    pass: yup.string().matches(PASSWORD_REGEX, "Ingrese una contraseña fuerte, al menos 1 digito, 1 mayus, 1 min").required("La contraseña es requerida"),
    passConfirmation: yup.string().when("pass", {
      is: val => (val && val.length > 0 ? true: false),
      then : yup.string().oneOf([yup.ref("pass")], "Las contraseñas no coninciden") //validacion de que la confirmacion de la contraseña sea igual a la contra
    }),

})


//Componente funcional del Login
export function NewPassword(props) {
  //Comunica los componentes para luego  pasar de login al registro
    const { switchToSignin} = useContext(AccountContext);
    const onSubmit = (values) =>{
      alert(JSON.stringify(values));
    }


  //Inicializa los valores del formulario, onsubmit envia la informacion al useFormik y se validan los campos con el validationSchema
    const formik = useFormik({initialValues :{correo: "", pass:""}, validateOnBlur: true, onSubmit, validationSchema: validationSchema});

return (
    <BoxContainer>
      {/*El onSubmit maneja el envio del formulario */}
    <FormContainer onSubmit={formik.handleSubmit}>
    <FieldContainer>
          <Input type="password" name="pass" id="pass"  placeholder="Contraseña" value={formik.values.pass} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.pass && formik.errors.pass? formik.errors.pass: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="password" name="passConfirmation" placeholder="Confirmar Contraseña" value={formik.values.passConfirmation} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.passConfirmation && formik.errors.passConfirmation ? formik.errors.passConfirmation: ""}</FieldError>
        </FieldContainer>
    <Marginer direction="vertical" margin="1.6em" />
      {/*Si los campos estan llenos se inicia seccion con el boton de lo contrario el boton esta deshabilitado */}
    <SubmitButton type="submit" disabled={!formik.isValid}>Cambiar Contraseña</SubmitButton>
    <Marginer direction="vertical" margin="1em" />
    </FormContainer>
   
    
    <MutedLink href="#">
   
        {/* Para pasar a Registrarse*/}
        <BoldLink href="#" onClick={switchToSignin}>Inicio

        </BoldLink>
    </MutedLink>
    </BoxContainer>
    );
};

