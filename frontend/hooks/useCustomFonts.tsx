import { configureFonts } from "react-native-paper";
import { useFonts } from "expo-font";
import { MD3Typescale } from "react-native-paper/lib/typescript/types";

export default function useCustomFonts(): [MD3Typescale, boolean] {
  const [fontLoaded] = useFonts({
    Fontastique: require("../assets/fonts/fontastique.ttf"),
  });
  const baseFont = {
    fontFamily: "Fontastique",
  } as const;
  const baseVariants = configureFonts({ config: baseFont });

  const fonts = configureFonts({
    config: {
      ...baseVariants,
    },
  });

  return [fonts, fontLoaded];
}
