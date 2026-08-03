/* ============================================================
   CONFIGURACIÓN DE FIREBASE — Ruta San Simón (R-18)
   ============================================================
   Este archivo lo usan index.html, conductor.html y dueno.html.
   Sin llenarlo, la app principal sigue funcionando 100% normal
   (horarios, mapa, tarifas, etc.) — solo no funcionarán la
   ubicación en vivo del conductor ni el botón de ayuda hasta que
   completes esta configuración.

   CÓMO OBTENER TUS DATOS (gratis, ~5 minutos):
   1. Ve a https://console.firebase.google.com y crea un proyecto
      (ej. "ruta-san-simon"). No necesitas tarjeta para el plan
      gratuito (Spark).
   2. En el menú lateral: Compilación → Realtime Database →
      "Crear base de datos". Elige la región más cercana (us-central
      está bien) y arranca en "modo de prueba" (lo ajustamos abajo).
   3. En el menú lateral: ⚙️ Configuración del proyecto → baja hasta
      "Tus apps" → ícono Web "</>" → registra la app (no necesita
      Firebase Hosting). Te va a mostrar un bloque `firebaseConfig`
      como el de abajo: copia esos valores aquí.
   4. Sube este archivo junto con los demás a tu repo de GitHub
      Pages (mismo lugar que index.html, manifest.json, sw.js).

   REGLAS DE SEGURIDAD RECOMENDADAS (Realtime Database → Reglas):
   Como la app no tiene un sistema de usuarios/login real (es un
   proyecto pequeño y local), las reglas de abajo dejan leer y
   escribir sin autenticación — cualquiera con el link técnico de
   tu base de datos podría en teoría escribir ahí. El PIN de abajo
   (PANEL_PIN) evita que alguien casual entre a los paneles desde la
   app, pero NO es seguridad real a nivel de base de datos. Si más
   adelante quieres cerrarlo mejor, se puede agregar Firebase
   Authentication (te ayudo cuando quieras dar ese paso).

   {
     "rules": {
       "driverLocation": { ".read": true, ".write": true },
       "panicAlerts":     { ".read": true, ".write": true }
     }
   }
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyBybW-iSHh7jL8_rMQ9RKxiI6AupPNk9iY",
  authDomain: "rutassansi.firebaseapp.com",
  databaseURL: "https://rutassansi-default-rtdb.firebaseio.com",
  projectId: "rutassansi",
  storageBucket: "rutassansi.firebasestorage.app",
  messagingSenderId: "952247065643",
  appId: "1:952247065643:web:1544ce12d74d3e32dd5e6e"
};

// PIN compartido para entrar al panel del conductor y al panel del
// dueño. Cámbialo por uno que solo tú y Pedro conozcan (4-6 dígitos
// o lo que quieras, es solo texto).
const PANEL_PIN = "1818";

// Número de WhatsApp del dueño de la ruta para el botón de ayuda de
// respaldo (código de país + número, sin espacios, sin "+").
// Ejemplo México: "521XXXXXXXXXX"
const OWNER_WHATSAPP_NUMBER = "52XXXXXXXXXX";

let db = null;
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.database();
  }
} catch (e) {
  console.warn('Firebase todavía no está configurado (firebase-config.js). La app sigue funcionando normal sin ubicación en vivo ni botón de ayuda.', e);
  db = null;
}
