import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Welcome = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la App!</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      <View style={styles.buttonContainer}>
        <Button title="Iniciar sesión" onPress={() => router.push('/screens/SignIn')} />
        <View style={{ height: 12 }} />
        <Button title="Registrarse" onPress={() => router.push('/screens/SignUp')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center'
  }
})

export default Welcome