import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import ErrorText from './ErrorText';

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label?: string | undefined;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

const PasswordInput = ({control, name, label, rules}: PasswordInputProps) => {
  const [isSecured, setSecured] = useState<boolean>(true);
  function toggleSecure(): void {
    setSecured(s => !s);
  }

  function onLostFocus(): void {
    setSecured(true);
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={
          rules != null
            ? rules
            : {
                // Le mot de passe doit contenir 8 caractères avec au moins 1 majuscule, 1 minuscule et 1 chiffre.'
                minLength: {
                  value: 8,
                  message:
                    'Le mot de passe doit contenir au moins 8 caractères.',
                },
                validate: {
                  uppercase: v =>
                    /[A-Z]/.test(v) ||
                    'Le mot de passe doit contenir au moins 1 majuscule.',
                  lowercase: v =>
                    /[a-z]/.test(v) ||
                    'Le mot de passe doit contenir au moins 1 minuscule.',
                  atLeastOneDigit: v =>
                    /\d/.test(v) ||
                    'Le mot de passe doit contenir au moins 1 chiffre.',
                },
                required: true,
              }
        }
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              mode="outlined"
              label={label != null ? label : 'Mot de passe'}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onLostFocus();
                onBlur();
              }}
              style={styles.textInput}
              error={error != null}
              secureTextEntry={isSecured}
              right={<TextInput.Icon icon="eye" onPress={toggleSecure} />}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default PasswordInput;
