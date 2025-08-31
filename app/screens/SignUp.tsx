import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup'
import { TokenStorageAdapter } from '../adapters/TokenStorageAdapter'
import { UsernameLogin } from '../strategies/SignIn/UsernameLogin'
import { GoogleSignUp } from '../strategies/SignUp/GoogleSignUp'
import { UsernameSignUp } from '../strategies/SignUp/UsernameSignUp'

const googleStrategy = new GoogleSignUp()
const strategy = new UsernameSignUp()
const strategyLogin = new UsernameLogin()
const tokenAdapter = new TokenStorageAdapter()

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'El usuario debe tener al menos 3 caracteres')
    .required('Usuario es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña es obligatoria')
})

const SignUp: React.FC = () => {
  const handleSignUp = async (values: { username: string; password: string }) => {
    const { username, password } = values
    const res = await strategy.create(username, password)
    if (res && !res.error) {
      // usuario creado, intentar login automático
      const resLogin = await strategyLogin.login(username, password)
      if (resLogin && resLogin.token) {
        await tokenAdapter.saveToken(resLogin.token)
        router.replace('/screens/Home')
      } else {
        Alert.alert('Registro', 'Usuario creado, pero no se pudo iniciar sesión automáticamente')
        router.replace('/screens/SignIn')
      }
    } else {
      Alert.alert('Error', res?.errorMessage || 'Error en el registro')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
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

            <TouchableOpacity
              style={[styles.primaryButton, isSubmitting ? { opacity: 0.8 } : null]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={styles.primaryButtonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/screens/SignIn')}>
        <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Iniciar sesión</Text>
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
    marginBottom: 8
  },
  error: {
    color: '#d32f2f',
    marginBottom: 8,
    marginLeft: 4
  },
  primaryButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#0066FF',
    fontSize: 14
  }
})

export default SignUp