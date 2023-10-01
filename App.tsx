import Loading from "@components/LoaderScreen";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import NewGroup from "@screens/NewGroups";
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
        barStyle={`light-content`}
        backgroundColor={`transparent`}
        translucent
      />
      {/* {fontsLoaded ? <Groups /> : <Loading />} */}
      {fontsLoaded ? <NewGroup /> : <Loading />}
    </ThemeProvider>
  );
}


