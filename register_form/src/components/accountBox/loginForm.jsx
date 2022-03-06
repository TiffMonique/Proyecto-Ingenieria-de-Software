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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email"  name="correo" id="correo" placeholder="Email" />
        <Input type="password" name="pass" id="pass" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">¿Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Iniciar sesión</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
      ¿No tienes una cuenta?{" "}
        <BoldLink href="#" onClick={switchToSignup}>Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
