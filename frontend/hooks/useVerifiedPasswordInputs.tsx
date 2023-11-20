import {useState, useEffect} from 'react';

const MINIMAL_LENGTH: number = 8;

interface PasswordInputState {
  value: string; // Valeur réelle du mot de passe
  isValid: boolean; // Utiliser pour montrer qu'un des mots de passe n'est pas bon
}

interface PasswordValidation {
  isValid: boolean;
  errors: Array<string>;
}

function validatePassword(value: string): PasswordValidation {
  const res: PasswordValidation = {
    isValid: false,
    errors: [],
  };
  if (value.length === 0) {
    res.isValid = false;
    return res;
  }
  if (value.length < MINIMAL_LENGTH) {
    res.errors.push('Au moins 8 caractères.');
  }
  if (value.search(/[a-z]/) < 0) {
    res.errors.push('Au moins 1 caractère minuscule.');
  }
  if (value.search(/[A-Z]/) < 0) {
    res.errors.push('Au moins 1 caractère majuscule.');
  }
  if (value.search(/[0-9]/) < 0) {
    res.errors.push('Au moins 1 chiffre.');
  }
  if (res.errors.length === 0) {
    res.isValid = false;
  } else {
    res.isValid = true;
  }
  console.log(res.errors);
  return res;
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


  function setPassword(value: string) {
    const res = validatePassword(value);
    setPasswordState({
      value: value,
      isValid: res.isValid,
    });
  }

  function setSecondPassword(value: string) {
    const res = validatePassword(value);
    setSecondPasswordState({
      value: value,
      isValid: res.isValid,
    });
  }

  useEffect(() => {
    if (password.value === secondPassword.value) {
      const resValid = validatePassword(password.value);
      if (resValid.errors.length === 0) {
        setVerifiedPassword(true);
        setErrorMessage('');
      } else {
        setVerifiedPassword(false);
        if (password.value.length === 0) {
          setErrorMessage('');
        } else {
          setErrorMessage(
            'Le mot de passe doit contenir 8 caractères avec au moins 1 majuscule, 1 minuscule et 1 chiffre.',
          );
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
