import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { AuthProvider } from './providers/AuthProvider'

export default function RootLayout() {
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') })
  if (!loaded) return null

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" />
          <Stack.Screen name="Screens/Home" />
          <Stack.Screen name="Screens/SignIn" />
          <Stack.Screen name="Screens/SignUp" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  )
}