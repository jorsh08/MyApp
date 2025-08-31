import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup'
import { TokenStorageAdapter } from '../adapters/TokenStorageAdapter'
import { UsernameLogin } from '../strategies/SignIn/UsernameLogin'

const tokenAdapter = new TokenStorageAdapter()
const usernameLogin = new UsernameLogin()

const SignIn = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'El usuario debe tener al menos 3 caracteres')
      .required('Usuario es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es obligatoria')
  })

  const handleSubmit = async (values: { username: string; password: string }) => {
    const res = await usernameLogin.login(values.username, values.password)
    if (!res.error && res.token) {
      await tokenAdapter.saveToken(res.token)
      router.replace('/screens/Home')
    } else {
      Alert.alert('Error', res?.errorMessage || 'Credenciales incorrectas')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>  

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {touched.username && errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TouchableOpacity style={styles.primaryButton} onPress={() => handleSubmit()}>
              <Text style={styles.primaryButtonText}>Ingresar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/screens/SignUp')}>
        <Text style={styles.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  primaryButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#1E90FF',
    fontSize: 14
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8
  }
})

export default SignIn