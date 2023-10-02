import Loading from "@components/LoaderScreen";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import Routes from "@routes/index";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import theme from './src/theme/index';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={`transparent`}
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}


