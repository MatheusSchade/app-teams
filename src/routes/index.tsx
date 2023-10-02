import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from 'styled-components/native';
import AppRoutes from "./app.routes";

export default function Routes() {
  const theme = useTheme();

  return (
    // Essa View com style (flex: 1, backgroundColor: theme.COLORS.GRAY_600 ) 
    // foi utilizada para evitar o efeito branco no fundo ao fazer mudanças de tela
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}