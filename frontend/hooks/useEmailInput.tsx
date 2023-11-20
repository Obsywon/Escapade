import {useState, useEffect} from 'react';
import Validator from 'validator';

export default function useEmailInput(): [
  string,
  (email: string) => void,
  string,
  boolean,
] {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [emailIsValid, setEmailValid] = useState<boolean>(false);

  useEffect(() => {
    if (Validator.isEmail(email)) {
      setErrorMessage('');
      setEmailValid(true);
    } else {
      if (email.length === 0) {
        setErrorMessage('');
      } else {
        setErrorMessage('E-mail invalide.');
      }
      setEmailValid(false);
    }
  }, [email]);

  return [email, setEmail, errorMessage, emailIsValid];
}