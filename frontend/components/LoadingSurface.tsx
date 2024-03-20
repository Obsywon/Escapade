import { StyleSheet } from "react-native";
import { ActivityIndicator, Surface, Text } from "react-native-paper";

interface LoadingSurfaceProps {
    text?: string;
  }

export default function LoadingSurface({text}: LoadingSurfaceProps){
    return (
        <Surface style={styles.container}>
          <ActivityIndicator />
          <Text variant="bodyLarge">{text}</Text>
        </Surface>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
  });
  