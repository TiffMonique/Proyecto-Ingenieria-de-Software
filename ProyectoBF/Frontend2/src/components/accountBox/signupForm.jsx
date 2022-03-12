import {  useFormik } from "formik";
import React, { useContext } from "react";
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
import * as yup from "yup";
//import axios from "axios";

/*La contraseña debe tener al entre 8 y 16 caracteres,
al menos un dígito, al menos una minúscula y al menos una mayúscula.*/
const PASSWORD_REGEX= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const phoneRegExp = /^\d{7,14}$/; // 7 a 14 numeros.

const validationSchema = yup.object({
  nombre:yup.string().min(3, "Ingrese un nombre real").required("El nombre es requerido"),
  apellido:yup.string().min(3, "Ingrese un apellido real").required("El apellido es requerido"),
  correo:yup.string().email("Por favor ingrese un correo válido").required("El correo es requerido"),
  telefono: yup.string().matches(phoneRegExp, "Numero de Telefóno inválido"),
  direccion:yup.string().max(100, "Ingrese una dirección mas corta").min(10, "Ingrese una dirección mas larga"),
  pass: yup.string().matches(PASSWORD_REGEX, "Por favor ingrese una contraseña fuerte").required("La contraseña es requerida"),
  passConfirmation: yup.string().when("pass", {
    is: val => (val && val.length > 0 ? true: false),
    then : yup.string().oneOf([yup.ref("pass")], "Las contraseñas no coninciden")
  }),

});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
};
  
const formik = useFormik( {initialValues: {nombre: "", apellido: "", correo: "", telefono: "", direccion: "", pass: "", passConfirmation: ""},
  validateOnBlur: true,
  onSubmit,
  validationSchema: validationSchema,
});

console.log("Error: ", formik.errors);

  return (
    <BoxContainer>
      <FormContainer action="http://localhost:4000/api/tienda/crear" method="post">
        <FieldContainer>
          <Input icon="user" type="text" name="nombre" id="nombre" placeholder="Nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.nombre && formik.errors.nombre ? formik.errors.nombre: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="text" name="apellido" id="apellido" placeholder="Apellido" value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.apellido && formik.errors.apellido ? formik.errors.apellido: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="email" name="correo" id="correo" placeholder="Correo" value={formik.values.correo} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.correo && formik.errors.correo ? formik.errors.correo: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="text" name="telefono" id="telefono" placeholder="Telefóno" value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.telefono && formik.errors.telefono ? formik.errors.telefono: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="texto" name="direccion" id="direccion" placeholder="Dirección" value={formik.values.direccion} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.direccion && formik.errors.direccion ? formik.errors.direccion: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="password" name="pass" id="pass"  placeholder="Contraseña" value={formik.values.pass} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.pass && formik.errors.pass? formik.errors.pass: ""}</FieldError>
        </FieldContainer>
        
        <FieldContainer>
          <Input type="password" name="passConfirmation" placeholder="Confirmar Contraseña" value={formik.values.passConfirmation} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.passConfirmation && formik.errors.passConfirmation ? formik.errors.passConfirmation: ""}</FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin={25} />
      <SubmitButton type="submit">Registrarse</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
        
      </FormContainer>
      
      <MutedLink href="#">
      ¿Ya tienes una cuenta?
        <BoldLink href="#" onClick={switchToSignin}>
        
        Iniciar sesión
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
