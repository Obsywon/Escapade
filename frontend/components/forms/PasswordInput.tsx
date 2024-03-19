import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import ErrorText from './ErrorText';
import { CustomColors } from '../../themes/CustomColors';

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

export default function PasswordInput ({control, name, label, rules}: PasswordInputProps) {
  const [secured, setSecured] = useState<boolean>(true);
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
          rules ?? {
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
              label={label ?? 'Mot de passe'}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onLostFocus();
                onBlur();
              }}
              error={error != null}
              secureTextEntry={secured}
              right={<TextInput.Icon icon="eye" onPress={toggleSecure} color={styles.content.color}/>}
              style={styles.textInput}
              contentStyle={styles.content}
              outlineStyle={styles.outline}
              theme={{
                colors: {
                     onSurfaceVariant: CustomColors.inputOutline,
                }
            }}
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
  outline: {
    borderColor: CustomColors.inputOutline,
    borderWidth: 2,
  },
  content: {
    color: CustomColors.inputOutline,
  },
});

