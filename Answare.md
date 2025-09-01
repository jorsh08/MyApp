1. Enumera 3 amenazas comunes en apps móviles bancarias y cómo las mitigarías.
   - Robo de credenciales: Se puede mitigar agregando verificación en dos pasos o Face ID, Touch ID.
   - Robo de tokens: Se puede mitigar con rotación de tokens frecuente y un almacenamiento cifrado.
   - Dispositivos comprometidos: Se puede mitigar con detección de celulares root y detectando modo debug en producción.

2. Explica las diferencias entre almacenamiento seguro en iOS y Android.
   El almacenamiento de iOS es más seguro que el de Android, ya que iOS tiene hardware dedicado específico para eso y Android varía, por lo que está fragmentado, no todos los dispositivos Android ofrecen el mismo nivel de seguridad, mientras que en iOS es más consistente en todos los dispositivos iOS.

3. ¿Cómo aplicarías el patrón Adapter al integrar EncryptedStorage?
   El patrón Adapter lo integraría para guardar, obtener y eliminar el token y encriptarlo con EncryptedStorage. Esta arquitectura ayuda a encapsular esta parte del proyecto y lo hace más escalable. El patrón Adapter permitiría cambiar de expo-secure-store a EncryptedStorage sin afectar el resto del código, manteniendo la flexibilidad.

4. ¿Qué ventaja ofrece react-query sobre Redux para datos asincrónicos?

5. ¿Qué patrón aplicarías para aislar reglas de negocio del UI?
   Aplicaría el patrón Repository para aislar el acceso a los datos como la API y storage, y la UI solo se encarga de recibir los datos.

# Refactor de codigo inseguro

Este fragmento muestra cómo implementar un **login seguro** en React Native aplicando las siguientes medidas:

- **HTTPS obligatorio**  
- **Almacenamiento seguro del token**  
- **Mecanismo defensivo contra errores**  
- **Protección en segundo plano**
- **Llamada a la API por variable de etorno**  

---

## Código corregido

```typescript
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage'; 
import { AppState } from 'react-native';
import { API_URL } from '@env'; // variable de entorno

const login = async (email: string, password: string, navigation: any) => {
  try {
    // 1. Llamada a la API usando dotenv + HTTPS

    if (!API_URL.startsWith('https://')) {
      throw new Error('Las peticiones sólo se permiten mediante HTTPS');
    }

    const response = await axios.post(`${API_URL}/login`, { email, password }, {
      timeout: 10000, // mecanismo defensivo: evita bloqueos por red lenta
      validateStatus: status => status >= 200 && status < 300 // acepta solo 2xx
    });

    const token = response.data?.token;
    if (!token) {
      throw new Error('Token inválido en la respuesta');
    }

    // 2. Almacenamiento seguro
    await EncryptedStorage.setItem('auth_token', token);

    // 3. Protección en segundo plano
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'background') {
        // Opcional: limpiar token al ir a segundo plano
        await EncryptedStorage.removeItem('auth_token');
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    // Navegación segura
    navigation.navigate('Home');
  } catch (error: any) {
    console.error('Error en login:', error?.message || error);
    alert('No se pudo iniciar sesión. Verifica tus credenciales o tu conexión.');
  }
};



