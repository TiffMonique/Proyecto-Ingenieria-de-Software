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

//Validacion de campos vacios
const validationSchema = yup.object({
  correo : yup.string().email("Por favor ingrese un correo válido").required("El correo es requerido"),

})


//Componente funcional del Login
export function RecoverPassword(props) {
  //Comunica los componentes para luego  pasar de login al registro
    const { switchToSignup } = useContext(AccountContext);
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
        {/*se maneja el estado de las entradas con value={formik.values.correo} y onChange={formik.handleChange}*/}
        <Input type="email"  name="correo" id="correo" placeholder="Email" value={formik.values.correo} onChange={formik.handleChange}  onBlur={formik.handleBlur}/> 
        {/*Si hay un error durante la validación formik.touched.correo && formik.errors.correo se lo mostrará al usuario.*/}
        <FieldError>{formik.touched.correo && formik.errors.correo ? formik.errors.correo:""}</FieldError>
        </FieldContainer>
    <Marginer direction="vertical" margin="1.6em" />
      {/*Si los campos estan llenos se inicia seccion con el boton de lo contrario el boton esta deshabilitado */}
    <SubmitButton type="submit" disabled={!formik.isValid}>Enviar Contraseña</SubmitButton>
    <Marginer direction="vertical" margin="1em" />
    </FormContainer>
   
    
    <MutedLink href="#">
    ¿No tienes una cuenta?{" "}
        {/* Para pasar a Registrarse*/}
        <BoldLink href="#" onClick={switchToSignup}>Registrate

        </BoldLink>
    </MutedLink>
    </BoxContainer>
    );
};

