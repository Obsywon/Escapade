import React from 'react';
import {
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

interface FormLayoutProps {
  children: React.ReactElement;
}

/**
 * Permet à l'affichage de s'adapter lorsqu'un formulaire nécessite l'apparition du clavier
 * @param FormLayoutProps enfants react native à afficher dans le formulaire
 * @returns Un formulaire qui s'adapte à l'apparition du clavier
 */
function FormLayout({children}: Readonly<FormLayoutProps>): JSX.Element {
  return (
    <KeyboardAvoidingView
      enabled={false}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FormLayout;
