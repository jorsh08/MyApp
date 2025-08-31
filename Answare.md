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
