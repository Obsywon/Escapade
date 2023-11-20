import {useState, useEffect} from 'react';

const MINIMAL_LENGTH: number = 8;

interface PasswordInputState {
  value: string; // Valeur réelle du mot de passe
  isValid: boolean; // Utiliser pour montrer qu'un des mots de passe n'est pas bon
}

export default function useVerifiedPasswordInputs(): [
  PasswordInputState,
  PasswordInputState,
  (pswd: string) => void,
  (scdPswd: string) => void,
  string,
  boolean,
] {
  const [password, setPasswordState] = useState<PasswordInputState>({
    value: '',
    isValid: false,
  });
  const [secondPassword, setSecondPasswordState] = useState<PasswordInputState>(
    {
      value: '',
      isValid: false,
    },
  );
  const [passwordIsVerified, setVerifiedPassword] = useState<boolean>(false);
  const [passwordErrorMessage, setErrorMessage] = useState<string>('');

  /**
   * Vérifie si un mot de passe satisfait les conditions d'admission de celui-ci
   * @param value string du mot de passe
   * @returns si le mot de passe entrée satisfait (seul) les conditions
   */
  function setValid(value: string): boolean {
    return !(value.length >= 0 && value.length <= MINIMAL_LENGTH);
  }

  function setPassword(value: string) {
    setPasswordState({
      value: value,
      isValid: setValid(value),
    });
  }

  function setSecondPassword(value: string) {
    setSecondPasswordState({
      value: value,
      isValid: setValid(value),
    });
  }

  useEffect(() => {
    if (password.value === secondPassword.value) {
      if (password.value.length >= MINIMAL_LENGTH) {
        setVerifiedPassword(true);
        setErrorMessage('');
      } else {
        setVerifiedPassword(false);
        if (password.value.length === 0) {
          setErrorMessage('');
        } else {
          setErrorMessage('Mot de passe trop court.');
        }
      }
    } else {
      setVerifiedPassword(false);
      if (password.value.length === 0 || secondPassword.value.length === 0) {
        setErrorMessage('');
      } else {
        setErrorMessage('Les mots de passes ne sont pas identiques.');
      }
    }
  }, [password, secondPassword]);

  return [
    password,
    secondPassword,
    setPassword,
    setSecondPassword,
    passwordErrorMessage,
    passwordIsVerified,
  ];
}
