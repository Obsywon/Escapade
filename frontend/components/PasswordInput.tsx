import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface PasswordInputProps {
  label?: string | undefined;
  value: string | undefined;
  setPassword(password: string): void;
}

const PasswordInput = ({label, value, setPassword}: PasswordInputProps) => {
  const [isSecured, setSecured] = useState<boolean>(true);

  function toggleSecure() {
    setSecured(s => !s);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="*******"
        mode="outlined"
        label={label != null ? label : 'Mot de passe'}
        value={value}
        onChangeText={setPassword}
        style={styles.textInput}
        secureTextEntry={isSecured}
        right={<TextInput.Icon icon="eye" onPress={toggleSecure} />}
      />
    </View>
  );
};

const styles = {
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
};

export default PasswordInput;
