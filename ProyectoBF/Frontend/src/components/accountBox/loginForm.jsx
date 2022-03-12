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
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  correo: yup.string().required("Campo requerido"),
  pass: yup.string().required("Campo requerido"),
})

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const onSubmit = (values)=>{
    console.log(values);

  }

  const formik = useFormik({initialValues :{correo: "", pass:""}, validateOnBlur: true, onSubmit, validationSchema: validationSchema});

  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
        <Input type="email"  name="correo" id="correo" placeholder="Email" value={formik.values.correo} onChange={formik.handleChange}  onBlur={formik.handleBlur}/> 
        <FieldError>{formik.touched.correo && formik.errors.correo ? formik.errors.correo:""}</FieldError>
        </FieldContainer>

        <FieldContainer>
        <Input type="password" name="pass" id="pass" placeholder="Password" value={formik.values.pass} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <FieldError>{formik.touched.pass && formik.errors.pass ? formik.errors.pass:""}</FieldError>
        </FieldContainer>


        
        
        <MutedLink href="#">¿Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" disabled={!formik.isValid}>Iniciar sesión</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
      ¿No tienes una cuenta?{" "}
        <BoldLink href="#" onClick={switchToSignup}>Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
