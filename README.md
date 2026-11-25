WonderBeautyShop

App móvil de marketplace de productos de maquillaje, accesorios, perfumes y cuidado de la piel, hecha con React Native y Expo. 
Siendo una simulación académica: no hay cobros reales y todos los datos son ficticios.

Las dos versiones se encuentran en el repositorio y a continuación una pequeña explicacion de como ejecutar la version 1 y 2.

Tambien al momento de visualiar la app te pedira iniciar sesión, puede colocar un correo ficticio y una contraseña de 6 digitos y le dejara entrar y navegar por WonderBeautyShop
Se recomienda poner la pagina en ingles ya que al traducir en español algunas palabras se desacomodan.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Cómo ejecutar.

  El proyecto tiene dos versiones, cada una en su propia rama:

  VERSION 1:
    - En rama main
    - Catálogo, carrito, compra, historial y descuento de existencias

  Para ver la version 1 ejecuta :

  git checkout main         
  npm install
  npx expo start

-----------------------------------------------------------------------------------------------------------------------------------------

- Como ejecutar :
  
  VERSION 2:
    - marketplace-v2
    - comparador, filtros, direcciones y envío, seguimiento y cancelación, alertas y notificaciones, y centro de ayuda

  Para ejecutar la versión 2, ejecuta:

  git checkout marketplace-v2 
  npm install
  npx expo start

------------------------------------------------------------------------------------------------------------------------------------------

## Solución de problemas

Si aparece un error de fuentes o de módulos que no se encuentran, instala las dependencias con:

```bash
npx expo install expo-font @expo-google-fonts/fredoka @react-native-async-storage/async-storage
```

Si nada de lo anterior funciona, reinstala todo desde cero:

```bash
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```
  
  
