import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TokenStorageAdapter } from '../adapters/TokenStorageAdapter'
import { User } from '../models/User'
import { UserRepository } from '../repositories/UserRepository'

const userRepository = new UserRepository()

const Home = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => { 
      const tokenAdapter = new TokenStorageAdapter()
      const token = await tokenAdapter.getToken()
      if (!token) {
        router.replace('/screens/SignIn')
        return
      } 
      const users = await userRepository.getUsers(token)
      setUsers(users)
    }
    fetchUsers()
  }, [])

  const handleLogout = async () => {
    const tokenAdapter = new TokenStorageAdapter()
    await tokenAdapter.removeToken()
        router.replace('/screens/Welcome')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ width: '100%' }}>
        {users.map(user => (
          <Text key={user.id} style={styles.userName}>{user.username}</Text>
        ))}
      </ScrollView>
      <View style={{ marginBottom: 20 }}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
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
  scrollContent: {
    alignItems: 'center',
    paddingTop: 120,
    width: '100%'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a7ae4',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#eaf1fb',
    borderRadius: 8,
    width: '80%',
    textAlign: 'center'
  }
})

export default Home