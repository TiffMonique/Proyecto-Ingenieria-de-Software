import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
  
         <Input icon="user" type="text" name="nombre" id="nombre" placeholder="Nombre" />
        <Input type="text" placeholder="Apellido" />
        <Input type="email" placeholder="Correo" />
        <Input type="number" placeholder="Telefóno"/>
        <Input type="texto" placeholder="Dirección"/>
        <Input type="password" placeholder="Contraseña" />
        <Input type="password" placeholder="Confirmar Contraseña" />
      </FormContainer>
      <Marginer direction="vertical" margin={25} />
      <SubmitButton type="submit">Registrarse</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
      ¿Ya tienes una cuenta?
        <BoldLink href="#" onClick={switchToSignin}>
        Iniciar sesión
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
