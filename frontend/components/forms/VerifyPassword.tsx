import React, {useState, useEffect} from 'react';
import PasswordInput from './PasswordInput';
import ErrorText from './ErrorText';

interface VerifyPasswordProps {
  setRealPassword(password: string): void;
}

const VerifyPassword = ({setRealPassword}: VerifyPasswordProps) => {
  const [password, setPassword] = useState<string | undefined>();
  const [secondPassword, setSecondPassword] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [passwordIsValid, setPasswordAsValid] = useState<boolean>(false);
  const [secondPasswordIsValid, setSecondPasswordAsValid] =
    useState<boolean>(false);

  // Vérifie si le mot de passe est identique et fait au moins 8 caractères
  useEffect(() => {
    if (
      passwordIsValid ||
      secondPassword == null ||
      password === secondPassword
    ) {
      setErrorMessage('');
    } else {
      setErrorMessage('Les mots de passe ne sont pas identiques.');
    }

    if (
      password != null &&
      secondPassword != null &&
      password === secondPassword &&
      passwordIsValid &&
      secondPasswordIsValid
    ) {
      setRealPassword(password);
    } else {
      setRealPassword('');
    }
  }, [password, secondPassword, passwordIsValid, secondPasswordIsValid]);

  return (
    <>
      <PasswordInput
        label="Mot de passe"
        value={password}
        setPassword={setPassword}
        isValid={setPasswordAsValid}
      />
      <PasswordInput
        label="Vérification mot de passe"
        value={secondPassword}
        setPassword={setSecondPassword}
        isValid={setSecondPasswordAsValid}
      />

      {errorMessage != null && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
};

export default VerifyPassword;
