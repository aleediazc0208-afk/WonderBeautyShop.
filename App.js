// WONDER BEAUTY SHOP - VERSION 2.0
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ScrollView, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Fredoka_700Bold } from '@expo-google-fonts/fredoka';


// CONSTANTES

// CATEGORIAS
const CATEGORIAS = ['Maquillaje', 'Accesorios', 'Perfumes', 'Cuidados Piel'];

// IMAGENES (archivos en assets/productos/)
const IMAGENES = {
  'PROD-001': require('./assets/productos/prod-001.webp'),
  'PROD-002': require('./assets/productos/prod-002.jpg'),
  'PROD-003': require('./assets/productos/prod-003.jpg'),
  'PROD-004': require('./assets/productos/prod-004.webp'),
  'PROD-005': require('./assets/productos/prod-005.jpg'),
  'PROD-006': require('./assets/productos/prod-006.jpg'),
  'PROD-007': require('./assets/productos/prod-007.jpg'),
  'PROD-008': require('./assets/productos/prod-008.webp'),
  'PROD-009': require('./assets/productos/prod-009.webp'),
  'PROD-010': require('./assets/productos/prod-010.jpg'),
  'PROD-011': require('./assets/productos/prod-011.jpg'),
  'PROD-012': require('./assets/productos/prod-012.jpg'),
  'PROD-013': require('./assets/productos/prod-013.avif'),
  'PROD-014': require('./assets/productos/prod-014.jpg'),
  'PROD-015': require('./assets/productos/prod-015.jpg'),
  'PROD-016': require('./assets/productos/prod-016.jpg'),
};

// PRODUCTOS
const PRODUCTOS_INICIALES = [
  { id: 'PROD-001', imagen: IMAGENES['PROD-001'], nombre: 'Brillo labial rosado matte ESIKA', marca: 'Wonder Glam', categoria: 'Maquillaje', precio: 55000, precioAnterior: 61000, oferta: true, stock: 12, vendidos: 320, icono: '💄', variantes: ['Rosado salmón', 'Nude', 'Coral'], descripcion: 'Brillo color rosado salmón con toque neutral para chicas.' },
  { id: 'PROD-002', imagen: IMAGENES['PROD-002'], nombre: 'Base líquida cobertura media', marca: 'Wonder Glam', categoria: 'Maquillaje', precio: 55000, stock: 8, vendidos: 150, icono: '🧴', descripcion: 'Base líquida de acabado natural para todo el día.' },
  { id: 'PROD-003', imagen: IMAGENES['PROD-003'], nombre: 'Set de brochas rosadas', marca: 'Rose Tools', categoria: 'Maquillaje', precio: 25000, stock: 15, vendidos: 90, icono: '🖌️', descripcion: 'Cinco brochas suaves con esponja para aplicar maquillaje.' },
  { id: 'PROD-004', imagen: IMAGENES['PROD-004'], nombre: 'Labial rojo intenso', marca: 'Wonder Glam', categoria: 'Maquillaje', precio: 25000, stock: 20, vendidos: 210, icono: '💋', variantes: ['Rojo intenso', 'Vino', 'Cereza'], descripcion: 'Labial en barra color rojo de larga duración.' },

  { id: 'PROD-005', imagen: IMAGENES['PROD-005'], nombre: 'Espejo de mano floral', marca: 'Rose Tools', categoria: 'Accesorios', precio: 18000, stock: 0, vendidos: 40, icono: '🎀', descripcion: 'Espejo compacto con marco floral para llevar en el bolso.' },
  { id: 'PROD-006', imagen: IMAGENES['PROD-006'], nombre: 'Cosmetiquera lila', marca: 'Lila Style', categoria: 'Accesorios', precio: 32000, stock: 10, vendidos: 75, icono: '👜', descripcion: 'Cosmetiquera impermeable con tres compartimentos amplios.' },
  { id: 'PROD-007', imagen: IMAGENES['PROD-007'], nombre: 'Set de scrunchies', marca: 'Lila Style', categoria: 'Accesorios', precio: 15000, stock: 30, vendidos: 130, icono: '🎀', variantes: ['Pastel', 'Neón'], descripcion: 'Seis coletas de tela suaves en tonos pastel.' },
  { id: 'PROD-008', imagen: IMAGENES['PROD-008'], nombre: 'Diadema de flores', marca: 'Lila Style', categoria: 'Accesorios', precio: 22000, stock: 14, vendidos: 60, icono: '🌼', descripcion: 'Diadema acolchada con flores para peinados y skincare.' },

  { id: 'PROD-009', imagen: IMAGENES['PROD-009'], nombre: 'Perfume Ariana Grande Thank You Next', marca: 'Aura', categoria: 'Perfumes', precio: 200000, stock: 5, vendidos: 60, icono: '🌸', descripcion: 'Fragancia floral y dulce de larga duración.' },
  { id: 'PROD-010', imagen: IMAGENES['PROD-010'], nombre: 'Body splash vainilla', marca: 'Aura', categoria: 'Perfumes', precio: 38000, precioAnterior: 42000, oferta: true, stock: 25, vendidos: 340, icono: '🍦', descripcion: 'Loción corporal perfumada con aroma suave a vainilla.' },
  { id: 'PROD-011', imagen: IMAGENES['PROD-011'], nombre: 'Perfume Brisa Fresca 50 ml', marca: 'Aura', categoria: 'Perfumes', precio: 120000, stock: 7, vendidos: 30, icono: '🌿', descripcion: 'Aroma cítrico y fresco para usar todos los días.' },
  { id: 'PROD-012', imagen: IMAGENES['PROD-012'], nombre: 'Mini perfume de viaje', marca: 'Aura', categoria: 'Perfumes', precio: 45000, stock: 18, vendidos: 85, icono: '✨', variantes: ['Vainilla', 'Floral', 'Cítrico'], descripcion: 'Perfume de 15 ml en frasco pequeño, ideal para el bolso.' },

  { id: 'PROD-013', imagen: IMAGENES['PROD-013'], nombre: 'Crema hidratante facial', marca: 'Pure Skin', categoria: 'Cuidados Piel', precio: 45000, stock: 14, vendidos: 180, icono: '🧼', descripcion: 'Crema ligera con ácido hialurónico para todo tipo de piel.' },
  { id: 'PROD-014', imagen: IMAGENES['PROD-014'], nombre: 'Mascarilla de arcilla', marca: 'Pure Skin', categoria: 'Cuidados Piel', precio: 28000, stock: 3, vendidos: 95, icono: '🧴', descripcion: 'Mascarilla purificante para limpiar poros en diez minutos.' },
  { id: 'PROD-015', imagen: IMAGENES['PROD-015'], nombre: 'Desmaquillante bifásico', marca: 'Pure Skin', categoria: 'Cuidados Piel', precio: 35000, stock: 9, vendidos: 120, icono: '💧', descripcion: 'Retira maquillaje resistente al agua sin irritar la piel.' },
  { id: 'PROD-016', imagen: IMAGENES['PROD-016'], nombre: 'Protector solar facial', marca: 'Pure Skin', categoria: 'Cuidados Piel', precio: 52000, stock: 11, vendidos: 260, icono: '☀️', variantes: ['Con color', 'Sin color'], descripcion: 'Protector solar facial SPF 50 de textura ligera.' },
];

// DATOS POR VARIANTE (lo que no se define se toma del producto base)
// Para cambiar la imagen: guarda el archivo en assets/productos/ y descomenta la línea imagen
const DATOS_VARIANTE = {
  'PROD-001': {
    'Rosado salmón': { color: '#F4A28C', descripcion: 'Brillo color rosado salmón con toque neutral para chicas.' },
    'Nude':          { color: '#D9B49B', descripcion: 'Brillo nude suave, ideal para el día a día y looks naturales.' /*, imagen: require('./assets/productos/prod-001-nude.jpg') */ },
    'Coral':         { color: '#FF7F6E', descripcion: 'Brillo coral vibrante con acabado matte para un look alegre.' /*, imagen: require('./assets/productos/prod-001-coral.jpg') */ },
  },
  'PROD-004': {
    'Rojo intenso': { color: '#C0141C', descripcion: 'Labial en barra color rojo de larga duración.' },
    'Vino':         { color: '#6D1A36', descripcion: 'Labial en barra color vino, profundo y elegante, de larga duración.' },
    'Cereza':       { color: '#9E1B32', descripcion: 'Labial en barra color cereza, intenso y con mucho brillo.' },
  },
  'PROD-007': {
    'Pastel': { color: '#F7C6D9', descripcion: 'Seis coletas de tela suaves en tonos pastel.' },
    'Neón':   { color: '#C6FF3D', descripcion: 'Seis coletas de tela suaves en tonos neón para destacar.' },
  },
  'PROD-012': {
    'Vainilla': { color: '#F3E2B3', icono: '🍦', descripcion: 'Perfume de 15 ml con aroma dulce a vainilla, ideal para el bolso.' },
    'Floral':   { color: '#F2B6D0', icono: '🌸', descripcion: 'Perfume de 15 ml con aroma floral y delicado, ideal para el bolso.' },
    'Cítrico':  { color: '#FFD966', icono: '🍋', descripcion: 'Perfume de 15 ml con aroma cítrico y fresco, ideal para el bolso.' },
  },
  'PROD-016': {
    'Con color': { color: '#E8B796', descripcion: 'Protector solar facial SPF 50 con tinte que unifica el tono de la piel.' },
    'Sin color': { color: '#FFFFFF', descripcion: 'Protector solar facial SPF 50 de textura ligera, sin color.' },
  },
};

// producto con los datos de la variante elegida aplicados
const conVariante = (p, variante) => {
  const extra = (variante && DATOS_VARIANTE[p.id] && DATOS_VARIANTE[p.id][variante]) || {};
  return { ...p, ...extra };
};

// MARCAS (sin repetir)
const MARCAS = [...new Set(PRODUCTOS_INICIALES.map((p) => p.marca))];

// PREGUNTAS INICIALES
const PREGUNTAS_INICIALES = [
  { id: 'Q-001', productoId: 'PROD-001', texto: '¿Este brillo sirve para piel clara?', fecha: '20/11/2026, 10:30 a. m.', estado: 'Respondida', respuesta: 'Respuesta automática de demostración: sí, el tono rosado salmón se ve bien en piel clara.' },
];

// ENVIO GRATIS
const ENVIO_GRATIS_DESDE = 150000;

// TARIFAS DE ENVIO
const TARIFAS_ENVIO = {
  Mosquera: { estandar: { costo: 6000, plazo: '1 a 2 días' }, expres: { costo: 10000, plazo: '1 día' } },
  Funza:    { estandar: { costo: 8000, plazo: '2 a 3 días' }, expres: { costo: 12000, plazo: '1 a 2 días' } },
  Madrid:   { estandar: { costo: 10000, plazo: '2 a 3 días' }, expres: { costo: 14000, plazo: '1 a 2 días' } },
};

// MUNICIPIOS
const MUNICIPIOS = Object.keys(TARIFAS_ENVIO);

// MODALIDADES DE ENVIO
const NOMBRE_MODALIDAD = { estandar: 'Estándar', expres: 'Exprés' };
const MODALIDADES = Object.entries(NOMBRE_MODALIDAD);

// ESTADOS DE PEDIDO
const ESTADOS_PEDIDO = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];

// COLORES DE ESTADO
const ESTADOS_COLOR = {
  Confirmado: { fondo: '#E6DAEE', texto: '#6A3F7E' },
  Preparando: { fondo: '#FFF3D6', texto: '#B7791F' },
  'En camino': { fondo: '#DCEBFF', texto: '#2B6CB0' },
  Entregado: { fondo: '#E3F6E4', texto: '#2E9E47' },
  Cancelado: { fondo: '#FBE0DF', texto: '#C0392B' },
  // estados de soporte
  Abierta: { fondo: '#E6DAEE', texto: '#6A3F7E' },
  'En revisión': { fondo: '#FFF3D6', texto: '#B7791F' },
  Resuelta: { fondo: '#E3F6E4', texto: '#2E9E47' },
};

// DATOS INICIALES
const DIRECCIONES_INICIALES = [];
const PEDIDOS_INICIALES = [];
const TICKETS_INICIALES = [];

// ICONOS DE NOTIFICACION
const NOTI_ICONO = { reposicion: '📦', pedido: '🧾', pregunta: '💬', soporte: '🆘' };

// MAXIMO DE NOTIFICACIONES GUARDADAS
const MAX_NOTIS = 50;

// TEMAS DE SOPORTE
const TEMAS_SOPORTE = ['Pedido', 'Pago', 'Envío', 'Producto', 'Otro'];

// ESTADOS DE SOPORTE
const ESTADOS_SOPORTE = ['Abierta', 'En revisión', 'Resuelta'];

// PREGUNTAS FRECUENTES (centro de ayuda)
const FAQ = [
  { id: 'F-1', pregunta: '¿Cuánto cuesta el envío?', respuesta: 'Enviamos a Mosquera, Funza y Madrid. El costo y el plazo dependen del municipio y de la modalidad (Estándar o Exprés). Las compras desde $150.000 COP tienen envío gratis.' },
  { id: 'F-2', pregunta: '¿Cómo uso un cupón?', respuesta: 'En el carrito escribe el código en "Cupón promocional" y toca Aplicar. El descuento se ve reflejado en el resumen del pedido.' },
  { id: 'F-3', pregunta: '¿Puedo cancelar un pedido?', respuesta: 'Sí, mientras esté en estado Confirmado o Preparando. Si ya está En camino o Entregado no se puede cancelar. Al cancelar, las unidades vuelven al inventario.' },
  { id: 'F-4', pregunta: '¿Cómo activo una alerta de reposición?', respuesta: 'Abre el detalle de un producto agotado y toca "Avisarme cuando haya stock". Cuando la tienda lo reponga recibirás una notificación en el centro de notificaciones.' },
  { id: 'F-5', pregunta: '¿Cómo hago seguimiento a mi pedido?', respuesta: 'Entra a Historial y toca el pedido para ver su estado y el historial de cambios. También recibirás una notificación cada vez que cambie.' },
];

// CUPON
const CUPON_CODIGO = 'BIENVENIDO10';
const CUPON_PORCENTAJE = 0.1;

// CLAVE DE GUARDADO
const CLAVE_GUARDADO = 'wonderbeauty_datos';

// COLORES
const C = {
  fondo: '#F1E8F6', header: '#B79BCB', claro: '#E6DAEE', morado: '#8B64A3',
  ciruela: '#855869', texto: '#6A3F7E', blanco: '#FFFFFF', rojo: '#E0524D',
  verde: '#5CCB5F', gris: '#8A7A92',
};

// FORMULARIOS VACIOS
const FORM_VACIO = { nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', descripcion: '', icono: '' };
const DATOS_VACIOS = { nombre: '', telefono: '' };
const FORM_DIR_VACIO = { alias: '', municipio: '', referencia: '' };
const FILTROS_VACIOS = { min: '', max: '', marca: '', oferta: false, disp: false, valMin: 0 };
const FORM_SOPORTE_VACIO = { tema: '', pedido: '', asunto: '', mensaje: '' };

// NOMBRES DE CAMPOS
const NOMBRES_CAMPOS = { nombre: 'Nombre completo', telefono: 'Teléfono' };


// FUNCIONES AUXILIARES

// precio en pesos
const COP = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' COP';

// fecha y hora actual
const ahora = () => new Date().toLocaleString('es-CO');

// validar entero mayor o igual a un mínimo
const esEntero = (texto, min) => texto.trim() !== '' && Number.isInteger(Number(texto)) && Number(texto) >= min;

// promedio de reseñas
const promedioDe = (lista) => (lista.length === 0 ? 0 : lista.reduce((a, n) => a + n, 0) / lista.length);

// estrellas
const estrellas = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// clave de una línea del carrito
const claveLinea = (l) => l.id + '|' + l.variante;

// costo y plazo de envío (null si no hay tarifa)
const infoEnvio = (municipio, modalidad) => (TARIFAS_ENVIO[municipio] && TARIFAS_ENVIO[municipio][modalidad]) || null;

// nueva notificación (sin leer)
const nuevaNoti = (tipo, titulo, texto, productoId = '') => ({
  id: 'N-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
  tipo, titulo, texto, productoId, fecha: ahora(), leida: false,
});


// COMPONENTES PEQUEÑOS

// mensaje vacío con botón
const Vacio = ({ msg, btn, onPress }) => (
  <View style={s.vacio}>
    <Text style={s.vacioTxt}>{msg}</Text>
    <Pressable style={s.btn} onPress={onPress}><Text style={s.btnTxt}>{btn}</Text></Pressable>
  </View>
);

// resumen de totales
const Resumen = ({ subtotal, descuento = 0, envio, total }) => (
  <View style={s.resumenCaja}>
    <Text style={s.resumenFilaTxt}>Subtotal: {COP(subtotal)}</Text>
    {descuento > 0 && <Text style={s.descuentoTxt}>Descuento ({CUPON_CODIGO}): -{COP(descuento)}</Text>}
    <Text style={s.resumenFilaTxt}>
      Envío: {envio === null ? 'se calcula al elegir dirección y modalidad' : envio === 0 ? 'Gratis' : COP(envio)}
    </Text>
    <Text style={s.resumenTotal}>Total: {COP(total)}</Text>
  </View>
);

// etiqueta de estado del pedido
const EstadoBadge = ({ estado }) => (
  <View style={[s.pedidoBadge, { backgroundColor: ESTADOS_COLOR[estado].fondo }]}>
    <Text style={[s.pedidoBadgeTxt, { color: ESTADOS_COLOR[estado].texto }]}>{estado}</Text>
  </View>
);

// imagen del producto: el recuadro (estilo) tiene tamaño fijo y la imagen se ajusta adentro
// (sin imagen muestra el emoji)
const ImgProducto = ({ p, estilo, emoji = 40, modo = 'contain' }) => (
  <View style={[estilo, s.imgContenedor]}>
    {p.imagen
      ? <Image source={p.imagen} style={s.imgLlena} resizeMode={modo} />
      : <Text style={{ fontSize: emoji }}>{p.icono}</Text>}
  </View>
);


// PROTECCION CONTRA PANTALLA EN BLANCO: si algo falla al dibujar, muestra el error y un botón para reintentar
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: C.blanco }}>
          <Text style={{ color: C.morado, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Ocurrió un error en la pantalla</Text>
          <Text style={{ color: C.gris, fontSize: 12, textAlign: 'center', marginTop: 8 }}>{String(this.state.error && this.state.error.message)}</Text>
          <Pressable style={s.btn} onPress={() => this.setState({ error: null })}>
            <Text style={s.btnTxt}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

// APP
export default function App() {
  return (
    <ErrorBoundary>
      <AppInterna />
    </ErrorBoundary>
  );
}

function AppInterna() {
  const [fontsLoaded] = useFonts({ Fredoka_700Bold });


  // ESTADOS

  // sesión
  const [usuario, setUsuario] = useState(null);
  const [correoLogin, setCorreoLogin] = useState('');
  const [claveLogin, setClaveLogin] = useState('');
  const [verClave, setVerClave] = useState(false);
  const [rolLogin, setRolLogin] = useState('comprador');
  const [errorLogin, setErrorLogin] = useState('');
  const [infoLogin, setInfoLogin] = useState('');

  // perfil
  const [perfil, setPerfil] = useState('comprador');
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [menuConfig, setMenuConfig] = useState(false);
  const esResp = perfil === 'responsable';

  // navegación
  const [vista, setVista] = useState('catalogo');
  const [origen, setOrigen] = useState('catalogo');
  const [aviso, setAviso] = useState('');
  const [cargado, setCargado] = useState(false);

  // catálogo
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Maquillaje');
  const [orden, setOrden] = useState('ninguno');

  // filtros
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  const [verFiltros, setVerFiltros] = useState(false);

  // comparador
  const [comparar, setComparar] = useState([]);

  // detalle
  const [selId, setSelId] = useState(null);
  const [varianteSel, setVarianteSel] = useState('');

  // favoritos
  const [favoritos, setFavoritos] = useState([]);

  // alertas de reposición y notificaciones
  const [alertas, setAlertas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  // reseñas
  const [resenas, setResenas] = useState({});
  const [valorResena, setValorResena] = useState('');
  const [errorResena, setErrorResena] = useState('');

  // preguntas
  const [preguntas, setPreguntas] = useState(PREGUNTAS_INICIALES);
  const [textoPregunta, setTextoPregunta] = useState('');
  const [errorPregunta, setErrorPregunta] = useState('');

  // centro de ayuda y soporte
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [formSoporte, setFormSoporte] = useState(FORM_SOPORTE_VACIO);
  const [errorSoporte, setErrorSoporte] = useState('');
  const [verFormSoporte, setVerFormSoporte] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState('');

  // carrito y cupón
  const [carrito, setCarrito] = useState([]);
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [errorCupon, setErrorCupon] = useState('');

  // direcciones
  const [direcciones, setDirecciones] = useState(DIRECCIONES_INICIALES);
  const [direccionSel, setDireccionSel] = useState('');
  const [formDir, setFormDir] = useState(FORM_DIR_VACIO);
  const [editDirId, setEditDirId] = useState(null);
  const [errorDir, setErrorDir] = useState('');
  const [origenDir, setOrigenDir] = useState('checkout');

  // envío
  const [modalidad, setModalidad] = useState('');

  // compra y pedidos
  const [datos, setDatos] = useState(DATOS_VACIOS);
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES);
  const [pedidoSel, setPedidoSel] = useState('');
  const [cancelando, setCancelando] = useState('');

  // formulario de producto (responsable)
  const [form, setForm] = useState(FORM_VACIO);
  const [editId, setEditId] = useState(null);
  const [errorForm, setErrorForm] = useState('');


  // EFECTOS

  // cargar carrito, favoritos, alertas, notificaciones y solicitudes guardados
  useEffect(() => {
    const cargar = async () => {
      try {
        const texto = await AsyncStorage.getItem(CLAVE_GUARDADO);
        if (texto) {
          const guardado = JSON.parse(texto);

          const carritoOk = [];
          (Array.isArray(guardado.carrito) ? guardado.carrito : []).forEach((l) => {
            const prod = l && PRODUCTOS_INICIALES.find((p) => p.id === l.id);
            if (!prod) return;
            const variante = prod.variantes ? (l.variante || prod.variantes[0]) : '';
            if (prod.variantes && !prod.variantes.includes(variante)) return;
            if (carritoOk.some((x) => x.id === prod.id && x.variante === variante)) return;
            const usadas = carritoOk.filter((x) => x.id === prod.id).reduce((a, x) => a + x.cant, 0);
            const cant = Math.min(Math.floor(Number(l.cant)), prod.stock - usadas);
            if (cant >= 1) carritoOk.push({ id: prod.id, variante, cant });
          });

          const favOk = (Array.isArray(guardado.favoritos) ? guardado.favoritos : [])
            .filter((id, i, lista) => PRODUCTOS_INICIALES.some((p) => p.id === id) && lista.indexOf(id) === i);

          // alertas: solo productos agotados, sin repetir
          const alertasOk = (Array.isArray(guardado.alertas) ? guardado.alertas : [])
            .filter((id, i, lista) => PRODUCTOS_INICIALES.some((p) => p.id === id && p.stock === 0) && lista.indexOf(id) === i);

          // notificaciones: solo las que tienen el formato correcto
          const notisOk = (Array.isArray(guardado.notificaciones) ? guardado.notificaciones : [])
            .filter((n) => n && typeof n.id === 'string' && typeof n.titulo === 'string' && typeof n.texto === 'string')
            .map((n) => ({
              id: n.id,
              tipo: NOTI_ICONO[n.tipo] ? n.tipo : 'pedido',
              titulo: n.titulo,
              texto: n.texto,
              productoId: typeof n.productoId === 'string' ? n.productoId : '',
              fecha: String(n.fecha || ''),
              leida: !!n.leida,
            }))
            .slice(0, MAX_NOTIS);

          // solicitudes de soporte: solo las que tienen el formato correcto
          const ticketsOk = (Array.isArray(guardado.tickets) ? guardado.tickets : [])
            .filter((t) => t && typeof t.id === 'string' && typeof t.asunto === 'string' && ESTADOS_SOPORTE.includes(t.estado))
            .map((t) => ({
              id: t.id,
              tema: TEMAS_SOPORTE.includes(t.tema) ? t.tema : 'Otro',
              pedido: typeof t.pedido === 'string' ? t.pedido : '',
              asunto: t.asunto,
              mensaje: String(t.mensaje || ''),
              fecha: String(t.fecha || ''),
              estado: t.estado,
              respuesta: String(t.respuesta || ''),
            }));

          setCarrito(carritoOk);
          setFavoritos(favOk);
          setAlertas(alertasOk);
          setNotificaciones(notisOk);
          setTickets(ticketsOk);
        }
      } catch (e) {

      }
      setCargado(true);
    };
    cargar();
  }, []);

  // guardar carrito, favoritos, alertas, notificaciones y solicitudes
  useEffect(() => {
    if (!cargado) return;
    AsyncStorage.setItem(CLAVE_GUARDADO, JSON.stringify({ carrito, favoritos, alertas, notificaciones, tickets })).catch(() => {});
  }, [carrito, favoritos, alertas, notificaciones, tickets, cargado]);


  // CALCULOS

  // rango de precio inválido
  const rangoInvalido = filtros.min !== '' && filtros.max !== '' && Number(filtros.min) > Number(filtros.max);

  // productos visibles (búsqueda, categoría, filtros y orden)
  const visibles = productos
    .filter((p) => {
      const prom = promedioDe(resenas[p.id] || []);
      const min = filtros.min === '' || rangoInvalido ? 0 : Number(filtros.min);
      const max = filtros.max === '' || rangoInvalido ? Infinity : Number(filtros.max);
      return p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
        && (categoria === 'Todas' || p.categoria === categoria)
        && (filtros.marca === '' || p.marca === filtros.marca)
        && p.precio >= min && p.precio <= max
        && (!filtros.oferta || p.oferta)
        && (!filtros.disp || p.stock > 0)
        && prom >= filtros.valMin;
    })
    .sort((a, b) => (orden === 'asc' ? a.precio - b.precio : orden === 'desc' ? b.precio - a.precio : 0));

  // filtros activos
  const nFiltros = (filtros.min !== '' ? 1 : 0) + (filtros.max !== '' ? 1 : 0)
    + (filtros.marca !== '' ? 1 : 0)
    + (filtros.oferta ? 1 : 0) + (filtros.disp ? 1 : 0) + (filtros.valMin > 0 ? 1 : 0);

  // notificaciones sin leer
  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  // carrito
  const lineas = carrito.map((l) => ({ ...l, p: productos.find((x) => x.id === l.id) }));
  const cantTotal = carrito.reduce((a, l) => a + l.cant, 0);
  const subtotal = lineas.reduce((a, l) => a + l.cant * l.p.precio, 0);
  const descuento = cuponAplicado ? Math.round(subtotal * CUPON_PORCENTAJE) : 0;

  // envío (siempre se calcula desde cero)
  const dirEnvio = direcciones.find((d) => d.id === direccionSel) || null;
  const infoEnv = dirEnvio && modalidad ? infoEnvio(dirEnvio.municipio, modalidad) : null;
  const envio = subtotal === 0 ? 0 : subtotal >= ENVIO_GRATIS_DESDE ? 0 : infoEnv ? infoEnv.costo : null;

  // total
  const total = Math.max(0, subtotal - descuento + (envio || 0));


  // FUNCIONES: AVISOS

  // aviso emergente
  const avisar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(''), 2200);
  };


  // FUNCIONES: LOGIN

  // iniciar sesión
  const iniciarSesion = () => {
    const correo = correoLogin.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(correo)) return setErrorLogin('Escribe un correo válido. Ej: valentina@correo.com');
    if (claveLogin.length < 6) return setErrorLogin('La contraseña debe tener al menos 6 caracteres.');
    const nombre = correo.split('@')[0];
    setUsuario({ nombre, correo });
    setCorreoLogin('');
    setClaveLogin('');
    setVerClave(false);
    setErrorLogin('');
    setInfoLogin('');
    setPerfil(rolLogin);
    setVista(rolLogin === 'responsable' ? 'inventario' : 'catalogo');
  };

  // olvidé mi contraseña (simulado)
  const olvideClave = () => {
    setErrorLogin('');
    setInfoLogin('Simulación: aquí se enviaría un enlace de recuperación a tu correo.');
  };

  // cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    setMenuPerfil(false);
    setMenuConfig(false);
    setCarrito([]);
    setCuponAplicado(false);
    setCupon('');
    setErrorCupon('');
    setComparar([]);
    setFiltros(FILTROS_VACIOS);
    setVerFiltros(false);
    setDireccionSel('');
    setModalidad('');
    setCancelando('');
    setPedidoSel('');
    setPerfil('comprador');
    setVista('catalogo');
  };

  // cambiar perfil
  const cambiarPerfil = (nuevo) => {
    setPerfil(nuevo);
    setMenuPerfil(false);
    setVista(nuevo === 'responsable' ? 'inventario' : 'catalogo');
    avisar(nuevo === 'responsable' ? 'Perfil: Responsable de la tienda' : 'Perfil: Comprador');
  };


  // FUNCIONES: COMPARADOR Y FAVORITOS

  // agregar o quitar de la comparación
  const toggleComparar = (id) => {
    if (comparar.includes(id)) return setComparar(comparar.filter((c) => c !== id));
    if (comparar.length >= 3) return avisar('Máximo 3 productos para comparar');
    setComparar([...comparar, id]);
  };

  // guardar o quitar favorito
  const toggleFavorito = (id) => {
    const esFav = favoritos.includes(id);
    setFavoritos(esFav ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
    avisar(esFav ? 'Quitado de favoritos' : 'Guardado en favoritos');
  };


  // FUNCIONES: ALERTAS Y NOTIFICACIONES

  // crear una notificación (la más reciente primero)
  const notificar = (tipo, titulo, texto, productoId = '') => {
    setNotificaciones((prev) => [nuevaNoti(tipo, titulo, texto, productoId), ...prev].slice(0, MAX_NOTIS));
  };

  // activar o quitar alerta de reposición (solo productos agotados)
  const toggleAlerta = (id) => {
    const p = productos.find((x) => x.id === id);
    if (!p) return;
    if (alertas.includes(id)) {
      setAlertas(alertas.filter((a) => a !== id));
      return avisar('Alerta de reposición quitada');
    }
    if (p.stock > 0) return avisar('Este producto ya tiene stock disponible');
    setAlertas([...alertas, id]);
    avisar('Te avisaremos cuando haya stock');
  };

  // revisar si algún producto con alerta volvió a tener stock (antes en 0, ahora mayor a 0)
  const avisarReposicion = (antes, despues) => {
    const repuestos = despues.filter((p) => alertas.includes(p.id) && p.stock > 0
      && ((antes.find((x) => x.id === p.id) || { stock: 0 }).stock === 0));
    if (repuestos.length === 0) return;
    setNotificaciones((prev) => [
      ...repuestos.map((p) => nuevaNoti('reposicion', '¡Ya hay stock!',
        p.nombre + ' volvió a estar disponible (' + p.stock + ' ' + (p.stock === 1 ? 'unidad' : 'unidades') + ').', p.id)),
      ...prev,
    ].slice(0, MAX_NOTIS));
    setAlertas(alertas.filter((a) => !repuestos.some((p) => p.id === a)));
  };

  // abrir una notificación (la marca como leída y, si es de un producto, abre su detalle)
  const abrirNotificacion = (n) => {
    if (!n) return;
    const idNoti = n.id;
    const idProducto = typeof n.productoId === 'string' ? n.productoId : '';
    setNotificaciones((prev) => prev.map((x) => (x.id === idNoti ? { ...x, leida: true } : x)));
    if (idProducto && productos.some((p) => p.id === idProducto)) abrirDetalle(idProducto, 'notificaciones');
  };

  // marcar todas como leídas
  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    avisar('Todas marcadas como leídas');
  };

  // borrar todas las notificaciones
  const borrarNotificaciones = () => {
    setNotificaciones([]);
    avisar('Notificaciones borradas');
  };


  // FUNCIONES: DETALLE, RESEÑAS Y PREGUNTAS

  // abrir detalle
  const abrirDetalle = (id, desde) => {
    setSelId(id);
    setValorResena('');
    setErrorResena('');
    setTextoPregunta('');
    setErrorPregunta('');
    setVarianteSel('');
    setOrigen(desde);
    setVista('detalle');
  };

  // guardar reseña (1 a 5)
  const guardarResena = (id) => {
    const n = Number(valorResena);
    if (!esEntero(valorResena, 1) || n > 5) {
      return setErrorResena('La valoración debe ser un número entero entre 1 y 5.');
    }
    setResenas({ ...resenas, [id]: [...(resenas[id] || []), n] });
    setValorResena('');
    setErrorResena('');
    avisar('Reseña guardada');
  };

  // enviar pregunta (mínimo 10 caracteres)
  const enviarPregunta = (productoId) => {
    const texto = textoPregunta.trim();
    if (texto.length < 10) return setErrorPregunta('La pregunta debe tener al menos 10 caracteres.');
    const nueva = {
      id: 'Q-' + String(preguntas.length + 1).padStart(3, '0'),
      productoId,
      texto,
      fecha: ahora(),
      estado: 'Pendiente',
      respuesta: '',
    };
    setPreguntas([nueva, ...preguntas]);
    setTextoPregunta('');
    setErrorPregunta('');
    avisar('Pregunta enviada');
  };

  // simular respuesta (demo)
  const simularRespuesta = (idPregunta) => {
    const q = preguntas.find((x) => x.id === idPregunta);
    if (!q || q.estado !== 'Pendiente') return;
    const prod = productos.find((x) => x.id === q.productoId);
    setPreguntas(preguntas.map((x) => (x.id === idPregunta && x.estado === 'Pendiente'
      ? { ...x, estado: 'Respondida', respuesta: 'Respuesta automática de demostración. No fue escrita por una persona real.' }
      : x)));
    notificar('pregunta', 'Tu pregunta fue respondida', prod ? prod.nombre : q.productoId, q.productoId);
  };


  // FUNCIONES: CARRITO Y CUPON

  // unidades de un producto en el carrito
  const enCarrito = (id) => carrito.filter((l) => l.id === id).reduce((a, l) => a + l.cant, 0);

  // agregar al carrito
  const agregar = (id, variante = '') => {
    const p = productos.find((x) => x.id === id);
    if (p.stock === 0) return avisar('Producto agotado');
    if (p.variantes && !variante) {
      if (vista !== 'detalle') abrirDetalle(id, vista);
      return avisar('Elige una opción primero');
    }
    if (enCarrito(id) >= p.stock) return avisar('No hay más unidades disponibles');
    const linea = carrito.find((l) => l.id === id && l.variante === variante);
    setCarrito(linea
      ? carrito.map((l) => (l === linea ? { ...l, cant: l.cant + 1 } : l))
      : [...carrito, { id, variante, cant: 1 }]);
    avisar('Agregado al carrito');
  };

  // quitar del carrito
  const quitar = (clave) => {
    setCarrito(carrito.filter((l) => claveLinea(l) !== clave));
    avisar('Producto eliminado');
  };

  // cambiar cantidad
  const cambiarCant = (clave, delta) => {
    const l = carrito.find((x) => claveLinea(x) === clave);
    if (!l) return;
    const nueva = l.cant + delta;
    if (nueva < 1) return quitar(clave);

    if (delta > 0 && enCarrito(l.id) + 1 > productos.find((x) => x.id === l.id).stock) return avisar('Stock insuficiente');
    setCarrito((prev) => prev.map((x) => (claveLinea(x) === clave ? { ...x, cant: nueva } : x)));
  };

  // aplicar cupón
  const aplicarCupon = () => {
    const codigo = cupon.trim().toUpperCase();
    if (carrito.length === 0) return setErrorCupon('Agrega productos al carrito antes de aplicar un cupón.');
    if (codigo === '') return setErrorCupon('Escribe un código de cupón.');
    if (codigo !== CUPON_CODIGO) return setErrorCupon('El cupón "' + codigo + '" no es válido. El total no cambió.');
    setCuponAplicado(true);
    setCupon('');
    setErrorCupon('');
    avisar('Cupón aplicado: 10% de descuento');
  };

  // quitar cupón
  const quitarCupon = () => {
    setCuponAplicado(false);
    setErrorCupon('');
    avisar('Cupón quitado');
  };


  // FUNCIONES: DIRECCIONES

  // abrir pantalla de direcciones
  const abrirDirecciones = (desde) => {
    limpiarFormDir();
    setOrigenDir(desde === 'direcciones' ? origenDir : desde);
    setVista('direcciones');
  };

  // limpiar formulario de dirección
  const limpiarFormDir = () => {
    setEditDirId(null);
    setFormDir(FORM_DIR_VACIO);
    setErrorDir('');
  };

  // cargar dirección para editar
  const editarDireccion = (d) => {
    setEditDirId(d.id);
    setFormDir({ alias: d.alias, municipio: d.municipio, referencia: d.referencia });
    setErrorDir('');
  };

  // guardar dirección (nueva o editada)
  const guardarDireccion = () => {
    const alias = formDir.alias.trim();
    const referencia = formDir.referencia.trim();

    if (alias.length < 2) return setErrorDir('El alias debe tener al menos 2 caracteres.');
    if (!formDir.municipio) return setErrorDir('Elige un municipio.');
    if (referencia.length < 5) return setErrorDir('La referencia de entrega debe tener al menos 5 caracteres.');

    if (editDirId) {
      setDirecciones(direcciones.map((d) => (d.id === editDirId
        ? { ...d, alias, municipio: formDir.municipio, referencia }
        : d)));
      avisar('Dirección actualizada');
    } else {
      const maxN = direcciones.reduce((m, d) => Math.max(m, parseInt(d.id.replace('DIR-', ''), 10) || 0), 0);
      const nueva = {
        id: 'DIR-' + String(maxN + 1).padStart(3, '0'),
        alias, municipio: formDir.municipio, referencia,
        principal: direcciones.length === 0,
      };
      setDirecciones([...direcciones, nueva]);
      avisar('Dirección guardada');
    }
    limpiarFormDir();
  };

  // marcar como principal
  const hacerPrincipal = (id) => {
    setDirecciones(direcciones.map((d) => ({ ...d, principal: d.id === id })));
    avisar('Dirección principal actualizada');
  };

  // elegir dirección del pedido
  const elegirDireccion = (id) => {
    setDireccionSel(id);
    avisar('Dirección elegida para la entrega');
  };


  // FUNCIONES: COMPRA

  // validar checkout y pasar al resumen
  const continuar = () => {
    if (carrito.length === 0) return avisar('Tu carrito está vacío');
    const faltante = Object.keys(datos).find((k) => datos[k].trim() === '');
    if (faltante) return avisar('Completa el campo: ' + NOMBRES_CAMPOS[faltante]);
    if (!dirEnvio && !modalidad) return avisar('Elige una dirección y la modalidad de envío');
    if (!dirEnvio) return avisar('Elige una dirección de entrega');
    if (!modalidad) return avisar('Elige la modalidad de envío');
    setVista('resumen');
  };

  // prueba: simular stock bajo
  const simularStockBajo = () => {
    if (carrito.length === 0) return;
    const id = carrito[0].id;
    const cant = enCarrito(id);
    setProductos(productos.map((p) => (p.id === id ? { ...p, stock: cant - 1 } : p)));
    avisar('Prueba: stock reducido');
  };

  // confirmar pedido (descuenta stock y guarda en historial)
  const confirmar = () => {
    if (carrito.length === 0) return avisar('Tu carrito está vacío');

    const faltante = Object.keys(datos).find((k) => datos[k].trim() === '');
    if (faltante) return avisar('Completa el campo: ' + NOMBRES_CAMPOS[faltante]);

    if (!dirEnvio || !modalidad || !infoEnv) return avisar('Elige una dirección y la modalidad de envío');

    const sinStock = lineas.find((l) => enCarrito(l.id) > l.p.stock);
    if (sinStock) return avisar('Sin stock suficiente de: ' + sinStock.p.nombre);

    // el pedido guarda copia de precios y dirección
    const fechaPedido = ahora();
    const pedido = {
      codigo: 'WB-' + String(pedidos.length + 1).padStart(4, '0'),
      fecha: fechaPedido,
      estado: 'Confirmado',
      historial: [{ estado: 'Confirmado', fecha: fechaPedido }],
      comprador: { nombre: datos.nombre.trim(), telefono: datos.telefono.trim() },
      direccion: { alias: dirEnvio.alias, municipio: dirEnvio.municipio, referencia: dirEnvio.referencia },
      modalidad,
      plazo: infoEnv.plazo,
      items: lineas.map((l) => ({
        productoId: l.id,
        nombre: l.p.nombre + (l.variante ? ' (' + l.variante + ')' : ''),
        variante: l.variante,
        cant: l.cant,
        precio: l.p.precio,
      })),
      subtotal, descuento, envio, total,
      restituido: false,
    };

    setProductos(productos.map((p) => {
      const usado = enCarrito(p.id);
      return usado ? { ...p, stock: p.stock - usado } : p;
    }));
    setPedidos([pedido, ...pedidos]);
    setCarrito([]);
    setCuponAplicado(false);
    setCupon('');
    setErrorCupon('');
    setDatos(DATOS_VACIOS);
    setDireccionSel('');
    setModalidad('');
    setVista('historial');
    notificar('pedido', 'Pedido ' + pedido.codigo + ' confirmado', 'Tu pedido llegará en ' + pedido.plazo + '.');
    avisar('Pedido ' + pedido.codigo + ' confirmado (simulación, sin cobro real)');
  };


  // FUNCIONES: PEDIDOS

  // abrir seguimiento
  const abrirPedido = (codigo) => {
    setPedidoSel(codigo);
    setCancelando('');
    setVista('pedido');
  };

  // simular avance de entrega
  const avanzarPedido = (codigo) => {
    const ped = pedidos.find((p) => p.codigo === codigo);
    if (!ped) return;
    const i = ESTADOS_PEDIDO.indexOf(ped.estado);
    if (ped.estado === 'Cancelado' || i === ESTADOS_PEDIDO.length - 1) {
      return avisar('Este pedido ya no admite más cambios de estado');
    }
    const siguiente = ESTADOS_PEDIDO[i + 1];
    setPedidos(pedidos.map((p) => (p.codigo === codigo
      ? { ...p, estado: siguiente, historial: [...p.historial, { estado: siguiente, fecha: ahora() }] }
      : p)));
    setCancelando('');
    notificar('pedido', 'Pedido ' + codigo + ' actualizado', 'Nuevo estado: ' + siguiente + '.');
    avisar('Pedido ' + codigo + ': ' + siguiente);
  };

  // pedir confirmación para cancelar
  const pedirCancelar = (codigo) => {
    const ped = pedidos.find((p) => p.codigo === codigo);
    if (!ped) return;
    if (ped.estado === 'Cancelado') return avisar('Este pedido ya está cancelado');
    if (ped.estado === 'En camino' || ped.estado === 'Entregado') {
      return avisar('No se puede cancelar: el pedido ya fue despachado (' + ped.estado + ')');
    }
    setCancelando(codigo);
  };

  // cancelar pedido y devolver stock una sola vez
  const cancelarPedido = (codigo) => {
    const ped = pedidos.find((p) => p.codigo === codigo);
    if (!ped) return;
    if (ped.estado !== 'Confirmado' && ped.estado !== 'Preparando') {
      setCancelando('');
      return avisar('Este pedido ya no se puede cancelar');
    }

    if (!ped.restituido) {
      const nuevos = productos.map((p) => {
        const devolver = ped.items.filter((i) => i.productoId === p.id).reduce((a, i) => a + i.cant, 0);
        return devolver ? { ...p, stock: p.stock + devolver } : p;
      });
      setProductos(nuevos);
      avisarReposicion(productos, nuevos);
    }

    setPedidos(pedidos.map((p) => (p.codigo === codigo
      ? { ...p, estado: 'Cancelado', restituido: true, historial: [...p.historial, { estado: 'Cancelado', fecha: ahora() }] }
      : p)));
    setCancelando('');
    notificar('pedido', 'Pedido ' + codigo + ' cancelado', 'Las unidades volvieron al inventario.');
    avisar('Pedido ' + codigo + ' cancelado. Stock devuelto');
  };


  // FUNCIONES: AYUDA Y SOPORTE

  // abrir centro de ayuda
  const abrirAyuda = () => {
    setFormSoporte(FORM_SOPORTE_VACIO);
    setErrorSoporte('');
    setVerFormSoporte(false);
    setVista('ayuda');
  };

  // enviar solicitud de soporte (asunto mínimo 5 y mensaje mínimo 15 caracteres)
  const enviarSolicitud = () => {
    const asunto = formSoporte.asunto.trim();
    const mensaje = formSoporte.mensaje.trim();

    if (!formSoporte.tema) return setErrorSoporte('Elige un tema.');
    if (asunto.length < 5) return setErrorSoporte('El asunto debe tener al menos 5 caracteres.');
    if (mensaje.length < 15) return setErrorSoporte('El mensaje debe tener al menos 15 caracteres.');

    const maxN = tickets.reduce((m, t) => Math.max(m, parseInt(t.id.replace('SOP-', ''), 10) || 0), 0);
    const nuevo = {
      id: 'SOP-' + String(maxN + 1).padStart(3, '0'),
      tema: formSoporte.tema,
      pedido: formSoporte.pedido,
      asunto,
      mensaje,
      fecha: ahora(),
      estado: 'Abierta',
      respuesta: '',
    };
    setTickets([nuevo, ...tickets]);
    setFormSoporte(FORM_SOPORTE_VACIO);
    setErrorSoporte('');
    setVerFormSoporte(false);
    notificar('soporte', 'Solicitud ' + nuevo.id + ' recibida', 'Tu solicitud quedó en estado Abierta.');
    avisar('Solicitud ' + nuevo.id + ' enviada');
  };

  // avanzar estado de una solicitud (demo: Abierta > En revisión > Resuelta)
  const avanzarSoporte = (id) => {
    const t = tickets.find((x) => x.id === id);
    if (!t) return;
    const i = ESTADOS_SOPORTE.indexOf(t.estado);
    if (i === ESTADOS_SOPORTE.length - 1) return avisar('Esta solicitud ya fue resuelta');
    const siguiente = ESTADOS_SOPORTE[i + 1];
    const resuelta = siguiente === 'Resuelta';
    setTickets(tickets.map((x) => (x.id === id
      ? { ...x, estado: siguiente, respuesta: resuelta ? 'Respuesta automática de demostración. No fue escrita por una persona real.' : x.respuesta }
      : x)));
    notificar('soporte', 'Solicitud ' + id + ': ' + siguiente,
      resuelta ? 'Tu solicitud fue resuelta. Revisa la respuesta en el Centro de ayuda.' : 'Estamos revisando tu solicitud.');
    avisar('Solicitud ' + id + ': ' + siguiente);
  };


  // FUNCIONES: RESPONSABLE

  // limpiar formulario de producto
  const limpiarForm = () => {
    setEditId(null);
    setForm(FORM_VACIO);
    setErrorForm('');
  };

  // abrir formulario de producto nuevo
  const abrirNuevo = () => {
    limpiarForm();
    setVista('producto');
  };

  // abrir formulario para editar producto
  const editarProducto = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre, categoria: p.categoria, precio: String(p.precio),
      stock: String(p.stock), descripcion: p.descripcion, icono: p.icono,
    });
    setErrorForm('');
    setVista('producto');
  };

  // guardar producto (nuevo o editado)
  const guardarProducto = () => {
    const nombre = form.nombre.trim();
    const descripcion = form.descripcion.trim();

    if (nombre === '') return setErrorForm('El nombre no puede estar vacío.');
    if (!esEntero(form.precio, 1)) return setErrorForm('El precio debe ser un número entero mayor a 0.');
    if (!esEntero(form.stock, 0)) return setErrorForm('El stock debe ser un número entero igual o mayor a 0.');
    if (descripcion.length < 15) return setErrorForm('La descripción debe tener al menos 15 caracteres.');

    const producto = { nombre, categoria: form.categoria, precio: Number(form.precio), stock: Number(form.stock), descripcion };

    if (editId) {
      const nuevos = productos.map((p) => (p.id === editId
        ? { ...p, ...producto, icono: form.icono.trim() || p.icono }
        : p));
      setProductos(nuevos);
      avisarReposicion(productos, nuevos);
      avisar('Producto ' + editId + ' actualizado');
    } else {
      const maxN = productos.reduce((m, p) => Math.max(m, parseInt(p.id.replace('PROD-', ''), 10) || 0), 0);
      const id = 'PROD-' + String(maxN + 1).padStart(3, '0');
      setProductos([...productos, { id, ...producto, marca: 'Wonder Glam', vendidos: 0, icono: form.icono.trim() || '🛍️' }]);
      avisar('Producto ' + id + ' registrado');
    }
    limpiarForm();
    setVista('inventario');
  };

  // campo de formulario reutilizable
  const campo = (label, clave, placeholder, multiline = false) => (
    <>
      <Text style={s.label}>{label}</Text>
      <TextInput style={[s.input, multiline && { height: 80, textAlignVertical: 'top' }]} multiline={multiline}
        value={form[clave]} placeholder={placeholder}
        onChangeText={(t) => setForm({ ...form, [clave]: t })} />
    </>
  );


  // ESTRUCTURA (VISTAS)

  // VISTA LOGIN
  const vistaLogin = () => (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.blanco }}
      contentContainerStyle={s.loginContenido}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require('./assets/logoo2.png')} style={s.loginLogo} />

      <View style={s.loginCard}>
        <Text style={s.loginTitulo}>Iniciar sesión</Text>

        {/* correo */}
        <Text style={s.label}>Correo</Text>
        <TextInput
          style={s.input}
          value={correoLogin}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(t) => { setCorreoLogin(t); setErrorLogin(''); setInfoLogin(''); }}
        />

        {/* contraseña */}
        <Text style={s.label}>Contraseña</Text>
        <View style={s.claveFila}>
          <TextInput
            style={s.claveInput}
            value={claveLogin}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry={!verClave}
            autoCapitalize="none"
            onChangeText={(t) => { setClaveLogin(t); setErrorLogin(''); setInfoLogin(''); }}
          />
          <Pressable onPress={() => setVerClave(!verClave)} hitSlop={8}>
            <Text style={{ fontSize: 18 }}>{verClave ? '🙈' : '👁️'}</Text>
          </Pressable>
        </View>

        {/* olvidé contraseña */}
        <Pressable onPress={olvideClave} style={{ alignSelf: 'flex-end' }}>
          <Text style={s.olvidasteTxt}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        {/* rol */}
        <Text style={s.label}>Entrar como</Text>
        <View style={s.catFila}>
          {[['comprador', ' Comprador'], ['responsable', 'Responsable']].map(([k, t]) => (
            <Pressable key={k} onPress={() => setRolLogin(k)}
              style={[s.chip, rolLogin === k && s.chipActivo]}>
              <Text style={[s.chipTxt, rolLogin === k && { color: C.blanco }]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* mensajes */}
        {errorLogin !== '' && <Text style={s.errorTxt}>{errorLogin}</Text>}
        {infoLogin !== '' && <Text style={s.infoTxt}>{infoLogin}</Text>}

        {/* botón */}
        <Pressable style={s.btnGrandeInline} onPress={iniciarSesion}>
          <Text style={s.btnGrandeTxt}>Ingresar</Text>
        </Pressable>
      </View>

      <Text style={[s.nota, { textAlign: 'center', marginTop: 18 }]}>
        Simulación académica: usa datos ficticios. No ingreses datos reales.
      </Text>
    </ScrollView>
  );

  // ENCABEZADO
  const encabezado = (conBuscador) => (
    <View style={[s.header, !conBuscador && { paddingBottom: 24 }]}>
      <View style={s.headerFila}>
        <Image source={require('./assets/logo.png')} style={s.logoImg} />
        {conBuscador && !esResp ? (
          <View style={s.buscador}>
            <Text>🔍</Text>
            <TextInput style={s.buscadorInput} placeholder="Buscar productos"
              value={busqueda} onChangeText={setBusqueda} />
            {busqueda !== '' && <Pressable onPress={() => setBusqueda('')}><Text>✕</Text></Pressable>}
          </View>
        ) : (
          <Text style={s.headerTitulo}>{esResp ? 'Panel de la tienda' : 'WonderBeautyShop'}</Text>
        )}
        {!esResp && (
          <Pressable style={s.iconoBtn} onPress={() => { setMenuConfig(false); setMenuPerfil(false); setVista('notificaciones'); }}>
            <Text style={{ fontSize: 24 }}>🔔</Text>
            {noLeidas > 0 && <View style={s.badge}><Text style={s.badgeTxt}>{noLeidas > 99 ? '99+' : noLeidas}</Text></View>}
          </Pressable>
        )}
        <Pressable style={s.iconoBtn} onPress={() => { setMenuConfig(!menuConfig); setMenuPerfil(false); }}>
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </Pressable>
        <Pressable style={s.usuario} onPress={() => { setMenuPerfil(!menuPerfil); setMenuConfig(false); }}>
          <Text style={{ fontSize: 16 }}>{esResp ? '🏪' : '👤'}</Text>
        </Pressable>
      </View>

      {conBuscador && <Text style={s.bienvenido}>¡Bienvenido {usuario ? usuario.nombre : 'Usuario'}!</Text>}
    </View>
  );

  // TARJETA DE PRODUCTO
  const tarjeta = (p) => (
    <Pressable key={p.id} style={s.tarjeta} onPress={() => abrirDetalle(p.id, vista)}>
      {p.oferta && <View style={s.oferta}><Text style={s.ofertaTxt}>10% OFF</Text></View>}
      <ImgProducto p={p} estilo={s.tarjetaImg} emoji={54} />
      <Text style={s.tarjetaNombre} numberOfLines={2}>{p.nombre}</Text>
      <Text style={s.tarjetaPrecio}>Precio: {COP(p.precio)}</Text>
      <Text style={[s.stockTxt, { color: p.stock === 0 ? C.rojo : C.gris }]}>
        {p.categoria} · {p.stock === 0 ? 'Agotado' : 'Disponible'}
      </Text>
      <View style={s.tarjetaFila}>
        <Pressable style={[s.btnComprar, p.stock === 0 && { opacity: 0.4 }]} onPress={() => agregar(p.id)}>
          <Text style={s.btnTxt}>{p.variantes ? 'Elegir' : 'Comprar'}</Text>
        </Pressable>
        <Pressable onPress={() => agregar(p.id)}><Text style={{ fontSize: 24 }}>🛒</Text></Pressable>
      </View>
      <Pressable onPress={() => toggleComparar(p.id)}>
        <Text style={s.compararTxt}>{comparar.includes(p.id) ? 'En comparación' : 'Comparar'}</Text>
      </Pressable>
    </Pressable>
  );

  // GRILLA DE PRODUCTOS (si no hay productos muestra el mensaje vacío)
  const grilla = (data, vacioNode) => (
    data.length === 0 ? (
      <ScrollView key="grilla-vacia" contentContainerStyle={{ paddingBottom: 90 }}>
        {vacioNode}
      </ScrollView>
    ) : (
      <FlatList
        key="grilla"
        data={data}
        numColumns={2}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => tarjeta(item)}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 14 }}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    )
  );

  // VISTA CATALOGO
  const vistaCatalogo = () => (
    <View style={{ flex: 1 }}>
      {encabezado(true)}

      {/* categorías */}
      <View style={s.tabs}>
        {['Todas', ...CATEGORIAS].map((c) => (
          <Pressable key={c} onPress={() => setCategoria(c)} style={[s.tab, categoria === c && s.tabActiva]}>
            <Text style={[s.tabTxt, categoria === c && { fontWeight: 'bold' }]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={s.tituloFila}>
        <Text style={s.titulo}>{categoria}</Text>

        {/* carrito */}
        <Pressable onPress={() => setVista('carrito')} style={s.carritoTitulo2}>
          <Text style={{ fontSize: 30 }}>🛒</Text>
          {cantTotal > 0 && <View style={s.badge}><Text style={s.badgeTxt}>{cantTotal}</Text></View>}
        </Pressable>

        {/* orden y filtros */}
        <View style={s.ordenFila}>
          {[['asc', 'Menor a mayor'], ['desc', 'Mayor a menor']].map(([k, t]) => (
            <Pressable key={k} onPress={() => setOrden(orden === k ? 'ninguno' : k)}
              style={[s.chip, orden === k && s.chipActivo, { marginBottom: 4 }]}>
              <Text style={[s.chipTxt, orden === k && { color: C.blanco }]}>{t}</Text>
            </Pressable>
          ))}
          <Pressable onPress={() => setVerFiltros(!verFiltros)}
            style={[s.chip, (verFiltros || nFiltros > 0) && s.chipActivo, { marginBottom: 4 }]}>
            <Text style={[s.chipTxt, (verFiltros || nFiltros > 0) && { color: C.blanco }]}>
              Filtros{nFiltros > 0 ? ' (' + nFiltros + ')' : ''}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* panel de filtros */}
      {verFiltros && (
        <View style={[s.resumenCaja, { marginHorizontal: 14, marginTop: 0, marginBottom: 8 }]}>
          <Text style={s.lineaNombre}>Filtros combinados</Text>

          {/* precio */}
          <Text style={s.label}>Rango de precio (COP)</Text>
          <View style={s.cuponFila}>
            <TextInput style={[s.input, { flex: 1 }]} value={filtros.min} placeholder="Mínimo" keyboardType="numeric"
              onChangeText={(t) => setFiltros({ ...filtros, min: t.replace(/[^0-9]/g, '') })} />
            <TextInput style={[s.input, { flex: 1, marginLeft: 8 }]} value={filtros.max} placeholder="Máximo" keyboardType="numeric"
              onChangeText={(t) => setFiltros({ ...filtros, max: t.replace(/[^0-9]/g, '') })} />
          </View>
          {rangoInvalido && <Text style={s.errorTxt}>El precio mínimo no puede ser mayor que el máximo.</Text>}

          {/* marca */}
          <Text style={s.label}>Marca</Text>
          <View style={s.catFila}>
            {MARCAS.map((m) => (
              <Pressable key={m} onPress={() => setFiltros({ ...filtros, marca: filtros.marca === m ? '' : m })}
                style={[s.chip, filtros.marca === m && s.chipActivo, { marginBottom: 6 }]}>
                <Text style={[s.chipTxt, filtros.marca === m && { color: C.blanco }]}>{m}</Text>
              </Pressable>
            ))}
          </View>

          {/* valoración */}
          <Text style={s.label}>Valoración mínima</Text>
          <View style={s.catFila}>
            {[[0, 'Todas'], [3, '3★ o más'], [4, '4★ o más'], [5, '5★']].map(([n, t]) => (
              <Pressable key={'val-' + n} onPress={() => setFiltros({ ...filtros, valMin: n })}
                style={[s.chip, filtros.valMin === n && s.chipActivo, { marginBottom: 6 }]}>
                <Text style={[s.chipTxt, filtros.valMin === n && { color: C.blanco }]}>{t}</Text>
              </Pressable>
            ))}
          </View>

          {/* ofertas y disponibilidad */}
          <View style={s.catFila}>
            <Pressable onPress={() => setFiltros({ ...filtros, oferta: !filtros.oferta })}
              style={[s.chip, filtros.oferta && s.chipActivo]}>
              <Text style={[s.chipTxt, filtros.oferta && { color: C.blanco }]}>Solo ofertas</Text>
            </Pressable>
            <Pressable onPress={() => setFiltros({ ...filtros, disp: !filtros.disp })}
              style={[s.chip, filtros.disp && s.chipActivo]}>
              <Text style={[s.chipTxt, filtros.disp && { color: C.blanco }]}>Solo disponibles</Text>
            </Pressable>
          </View>

          <Text style={s.nota}>{visibles.length} {visibles.length === 1 ? 'producto encontrado' : 'productos encontrados'}</Text>
          <Pressable onPress={() => setFiltros(FILTROS_VACIOS)}><Text style={s.link}>Restablecer</Text></Pressable>
        </View>
      )}

      {/* barra del comparador */}
      {comparar.length > 0 && (
        <View style={s.compararBarra}>
          <Text style={s.compararBarraTxt}>{comparar.length}/3 seleccionados</Text>
          <Pressable style={s.btnCupon}
            onPress={() => (comparar.length >= 2 ? setVista('comparar') : avisar('Elige mínimo 2 productos'))}>
            <Text style={s.btnTxt}>Comparar</Text>
          </Pressable>
          <Pressable onPress={() => setComparar([])}><Text style={s.eliminar}>Limpiar</Text></Pressable>
        </View>
      )}

      {/* productos */}
      {grilla(visibles,
        <Vacio
          msg={nFiltros > 0 ? 'Ningún producto cumple los filtros. Cambia o restablece los filtros.' : 'No encontramos productos'}
          btn="Ver todos"
          onPress={() => { setBusqueda(''); setCategoria('Todas'); setFiltros(FILTROS_VACIOS); }} />)}
    </View>
  );

  // VISTA DETALLE
  const vistaDetalle = () => {
    const base = productos.find((x) => x.id === selId);
    if (!base) {
      return (
        <View style={{ flex: 1 }}>
          {encabezado(false)}
          <Vacio msg="No encontramos ese producto" btn="Volver al catálogo" onPress={() => setVista('catalogo')} />
        </View>
      );
    }
    const p = conVariante(base, varianteSel);
    const esFav = favoritos.includes(p.id);
    const esAlerta = alertas.includes(p.id);
    const lista = resenas[p.id] || [];
    const prom = promedioDe(lista);

    // preguntas del producto
    const delProducto = preguntas.filter((q) => q.productoId === p.id);

    // relacionados: misma categoría y con stock
    const relacionados = productos
      .filter((x) => x.categoria === p.categoria && x.id !== p.id && x.stock > 0)
      .slice(0, 4);

    return (
      <View style={{ flex: 1, backgroundColor: C.blanco }}>
        <View style={s.detalleBarra}>
          <Pressable onPress={() => setVista(origen)}><Text style={s.volver}>⬅</Text></Pressable>
          <Text style={s.detalleTitulo}>Detalle</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <ImgProducto p={p} estilo={s.detalleImg} emoji={120} />
          <View style={s.detalleInfo}>

            {/* más vendido y favorito */}
            <View style={s.detalleFila}>
              {p.vendidos > 300 ? <View style={s.masVendido}><Text style={s.masVendidoTxt}>MÁS VENDIDO</Text></View> : <View />}
              <Pressable style={s.corazon} onPress={() => toggleFavorito(p.id)}>
                <Text style={{ fontSize: 20 }}>{esFav ? '💜' : '🤍'}</Text>
              </Pressable>
            </View>

            {/* datos */}
            <Text style={s.detalleNombre}>{p.nombre}{varianteSel ? ' · ' + varianteSel : ''}</Text>
            <Text style={s.detalleDesc}>{p.descripcion}</Text>
            <Text style={s.detalleCat}>Categoría: {p.categoria} · Marca: {p.marca}</Text>

            {/* variantes */}
            {p.variantes && (
              <View>
                <Text style={s.label}>Elige una opción</Text>
                <View style={s.catFila}>
                  {p.variantes.map((v) => {
                    const col = DATOS_VARIANTE[p.id] && DATOS_VARIANTE[p.id][v] && DATOS_VARIANTE[p.id][v].color;
                    return (
                      <Pressable key={v} onPress={() => setVarianteSel(v)}
                        style={[s.chip, varianteSel === v && s.chipActivo, { marginBottom: 6, flexDirection: 'row', alignItems: 'center' }]}>
                        {col && <View style={[s.muestraColor, { backgroundColor: col }]} />}
                        <Text style={[s.chipTxt, varianteSel === v && { color: C.blanco }]}>{v}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* precio y stock */}
            <View style={s.precioFila}>
              <Text style={s.detallePrecio}>{COP(p.precio)}</Text>
              {p.oferta && <View style={s.ofertaCaja}><Text style={s.ofertaCajaTxt}>10% OFF</Text></View>}
            </View>
            {p.oferta && <Text style={s.tachado}>{COP(p.precioAnterior)}</Text>}
            <Text style={[s.stockDetalle, { color: p.stock === 0 ? C.rojo : C.verde }]}>
              {p.stock === 0 ? 'AGOTADO' : 'Stock disponible: ' + p.stock}
            </Text>

            {/* alerta de reposición */}
            {p.stock === 0 && (
              <View>
                <Pressable style={[s.alertaBtn, esAlerta && s.alertaBtnOn]} onPress={() => toggleAlerta(p.id)}>
                  <Text style={s.alertaBtnTxt}>
                    {esAlerta ? 'Alerta activa · Toca para quitarla' : 'Avisarme cuando haya stock'}
                  </Text>
                </Pressable>
                {esAlerta && <Text style={s.nota}>Te llegará una notificación cuando la tienda reponga este producto.</Text>}
              </View>
            )}

            {/* reseñas */}
            <View style={s.resenaCaja}>
              <Text style={s.lineaNombre}>Reseñas de compradores</Text>
              {lista.length === 0 ? (
                <Text style={s.nota}>Aún no hay valoraciones.</Text>
              ) : (
                <View>
                  <Text style={s.promedioTxt}>{estrellas(Math.round(prom))} {prom.toFixed(1)} / 5</Text>
                  <Text style={s.nota}>{lista.length} {lista.length === 1 ? 'valoración' : 'valoraciones'}</Text>
                  {lista.map((n, i) => (
                    <Text key={i} style={s.resumenFilaTxt}>Comprador {i + 1}: {estrellas(n)} ({n})</Text>
                  ))}
                </View>
              )}
              <Text style={s.label}>Tu valoración (número entero de 1 a 5)</Text>
              <View style={s.cuponFila}>
                <TextInput style={[s.input, { flex: 1 }]} value={valorResena} placeholder="Ej: 5"
                  keyboardType="numeric"
                  onChangeText={(t) => { setValorResena(t); setErrorResena(''); }} />
                <Pressable style={s.btnCupon} onPress={() => guardarResena(p.id)}>
                  <Text style={s.btnTxt}>Guardar</Text>
                </Pressable>
              </View>
              {errorResena !== '' && <Text style={s.errorTxt}>{errorResena}</Text>}
            </View>

            {/* preguntas */}
            <View style={s.resenaCaja}>
              <Text style={s.lineaNombre}>Preguntas</Text>
              {delProducto.length === 0 && <Text style={s.nota}>Aún no hay preguntas de este producto.</Text>}
              {delProducto.map((q) => (
                <View key={q.id} style={s.preguntaCaja}>
                  <Text style={s.resumenFilaTxt}>{q.texto}</Text>
                  <Text style={s.nota}>{q.fecha} · {q.estado}</Text>
                  {q.estado === 'Respondida'
                    ? <Text style={s.respuestaTxt}>{q.respuesta}</Text>
                    : <Pressable onPress={() => simularRespuesta(q.id)}>
                        <Text style={s.link}>Simular respuesta (demo)</Text>
                      </Pressable>}
                </View>
              ))}
              <Text style={s.label}>Haz tu pregunta (mínimo 10 caracteres)</Text>
              <TextInput style={[s.input, { height: 70, textAlignVertical: 'top' }]} multiline
                value={textoPregunta} placeholder="Escribe tu pregunta"
                onChangeText={(t) => { setTextoPregunta(t); setErrorPregunta(''); }} />
              {errorPregunta !== '' && <Text style={s.errorTxt}>{errorPregunta}</Text>}
              <Pressable style={s.btnGrandeInline} onPress={() => enviarPregunta(p.id)}>
                <Text style={s.btnGrandeTxt}>Enviar pregunta</Text>
              </Pressable>
            </View>

            {/* relacionados */}
            <View style={s.resenaCaja}>
              <Text style={s.lineaNombre}>Productos relacionados</Text>
              {relacionados.length === 0 ? (
                <Text style={s.nota}>No hay productos relacionados disponibles por ahora.</Text>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                  {relacionados.map((x) => (
                    <Pressable key={x.id} style={s.relCard} onPress={() => abrirDetalle(x.id, origen)}>
                      <ImgProducto p={x} estilo={s.relImg} emoji={34} />
                      <Text style={s.relNombre} numberOfLines={2}>{x.nombre}</Text>
                      <Text style={s.relPrecio}>{COP(x.precio)}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* medios de pago */}
            <Text style={s.medios}>Medios de pago (simulados)</Text>
            <View style={s.mediosFila}>
              <View style={s.medioCaja}><Text style={s.medioTxt}>VISA · Mastercard · PayPal</Text></View>
              <View style={s.medioCaja}><Text style={s.medioTxt}>Nequi · Bancolombia</Text></View>
            </View>
          </View>
        </ScrollView>

        {/* agregar al carrito */}
        <Pressable style={[s.btnGrande, p.stock === 0 && { opacity: 0.4 }]} onPress={() => agregar(p.id, varianteSel)}>
          <Text style={s.btnGrandeTxt}>{p.stock === 0 ? 'Agotado' : 'Agregar al carrito'}</Text>
        </Pressable>
      </View>
    );
  };

  // VISTA COMPARADOR
  const vistaComparar = () => {
    const lista = comparar.map((id) => productos.find((p) => p.id === id)).filter(Boolean);

    if (lista.length < 2) {
      return (
        <View style={{ flex: 1 }}>
          {encabezado(false)}
          <Vacio msg="Elige al menos 2 productos para comparar" btn="Volver al catálogo" onPress={() => setVista('catalogo')} />
        </View>
      );
    }

    // filas de la tabla
    const filas = [
      ['Marca', (p) => p.marca],
      ['Categoría', (p) => p.categoria],
      ['Precio', (p) => COP(p.precio) + (lista.every((x) => x === p || p.precio < x.precio) ? '\nMás económico' : '')],
      ['Oferta', (p) => (p.oferta ? 'Sí, 10% OFF' : 'No')],
      ['Disponibilidad', (p) => (p.stock === 0 ? 'Agotado' : p.stock + ' unidades')],
      ['Opciones', (p) => (p.variantes ? p.variantes.join(', ') : 'Única')],
      ['Valoración', (p) => {
        const r = resenas[p.id] || [];
        return r.length ? promedioDe(r).toFixed(1) + ' / 5 (' + r.length + ')' : 'Sin valoraciones';
      }],
      ['Vendidos', (p) => String(p.vendidos)],
    ];

    return (
      <View style={{ flex: 1 }}>
        {encabezado(false)}
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text style={s.titulo}>Comparador</Text>

          {/* columnas: imagen, nombre y quitar */}
          <View style={s.compFila}>
            <View style={{ width: 90 }} />
            {lista.map((p) => (
              <View key={p.id} style={s.compCol}>
                <ImgProducto p={p} estilo={s.compImg} emoji={40} />
                <Text style={[s.lineaNombre, { textAlign: 'center' }]} numberOfLines={3}>{p.nombre}</Text>
                <Pressable onPress={() => toggleComparar(p.id)}><Text style={s.eliminar}>Quitar</Text></Pressable>
              </View>
            ))}
          </View>

          {/* filas */}
          {filas.map(([etiqueta, fn]) => (
            <View key={etiqueta} style={s.compFila}>
              <Text style={s.compEtiqueta}>{etiqueta}</Text>
              {lista.map((p) => (
                <View key={p.id} style={s.compCol}><Text style={s.compValor}>{fn(p)}</Text></View>
              ))}
            </View>
          ))}

          {/* ver detalle */}
          <View style={s.compFila}>
            <View style={{ width: 90 }} />
            {lista.map((p) => (
              <View key={p.id} style={s.compCol}>
                <Pressable style={s.btnComprar} onPress={() => abrirDetalle(p.id, 'comparar')}>
                  <Text style={s.btnTxt}>Ver</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable onPress={() => { setComparar([]); setVista('catalogo'); }}>
            <Text style={s.link}>Nueva comparación</Text>
          </Pressable>
          <Pressable onPress={() => setVista('catalogo')}><Text style={s.link}>Volver al catálogo</Text></Pressable>
        </ScrollView>
      </View>
    );
  };

  // VISTA FAVORITOS
  const vistaFavoritos = () => {
    const lista = productos.filter((p) => favoritos.includes(p.id));
    return (
      <View style={{ flex: 1, backgroundColor: C.fondo }}>

        {/* encabezado */}
        <View style={s.carritoHeader}>
          <Pressable onPress={() => setVista('catalogo')} hitSlop={10}>
            <Text style={s.carritoVolver}>⬅</Text>
          </Pressable>
          <Text style={s.carritoHeaderTxt}>Mis favoritos</Text>
          <Text style={s.carritoCuenta}>{lista.length} {lista.length === 1 ? 'producto' : 'productos'}</Text>
        </View>

        <View style={{ height: 16 }} />

        {grilla(lista,
          <View style={s.carritoVacio}>
            <Text style={s.carritoVacioTitulo}>Aún no tienes favoritos</Text>
            <Text style={s.nota}>Toca el 🤍 en el detalle de un producto para guardarlo</Text>
            <Pressable style={s.btn} onPress={() => setVista('catalogo')}>
              <Text style={s.btnTxt}>Ir al catálogo</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  // VISTA NOTIFICACIONES
  const vistaNotificaciones = () => {
    const alertasLista = productos.filter((p) => alertas.includes(p.id));
    return (
      <View style={{ flex: 1, backgroundColor: C.fondo }}>

        {/* encabezado */}
        <View style={s.carritoHeader}>
          <Pressable onPress={() => setVista('catalogo')} hitSlop={10}>
            <Text style={s.carritoVolver}>⬅</Text>
          </Pressable>
          <Text style={s.carritoHeaderTxt}>Notificaciones</Text>
          <Text style={s.carritoCuenta}>{noLeidas} sin leer</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>

          {/* alertas de reposición activas */}
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Alertas de reposición activas</Text>
            {alertasLista.length === 0 ? (
              <Text style={s.nota}>No tienes alertas. Actívalas en el detalle de un producto agotado.</Text>
            ) : (
              alertasLista.map((p) => (
                <View key={p.id} style={s.alertaFila}>
                  <Pressable style={{ flex: 1 }} onPress={() => abrirDetalle(p.id, 'notificaciones')}>
                    <Text style={s.resumenFilaTxt} numberOfLines={2}>{p.nombre}</Text>
                  </Pressable>
                  <Pressable onPress={() => toggleAlerta(p.id)}><Text style={s.eliminar}>Quitar</Text></Pressable>
                </View>
              ))
            )}
          </View>

          {/* acciones */}
          {notificaciones.length > 0 && (
            <View style={s.dirBotones}>
              <Pressable style={s.dirBtn} onPress={marcarTodasLeidas}><Text style={s.dirBtnTxt}>Marcar todas como leídas</Text></Pressable>
              <Pressable style={s.dirBtn} onPress={borrarNotificaciones}><Text style={s.dirBtnTxt}>Borrar todas</Text></Pressable>
            </View>
          )}

          {/* lista */}
          {notificaciones.length === 0 ? (
            <View style={s.carritoVacio}>
              <Text style={s.carritoVacioTitulo}>No tienes notificaciones</Text>
              <Text style={s.nota}>Aquí verás avisos de pedidos, reposición, preguntas y soporte</Text>
              <Pressable style={s.btn} onPress={() => setVista('catalogo')}>
                <Text style={s.btnTxt}>Ir al catálogo</Text>
              </Pressable>
            </View>
          ) : (
            notificaciones.map((n) => (
              <Pressable key={n.id} style={[s.notiCard, !n.leida && s.notiNoLeida]} onPress={() => abrirNotificacion(n)}>
                <Text style={s.notiIcono}>{NOTI_ICONO[n.tipo]}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.notiTitulo}>{n.titulo}{!n.leida ? '  •' : ''}</Text>
                  <Text style={s.resumenFilaTxt}>{n.texto}</Text>
                  <Text style={s.nota}>{n.fecha}</Text>
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>
    );
  };

  // VISTA AYUDA (comprador)
  const vistaAyuda = () => (
    <View style={{ flex: 1, backgroundColor: C.fondo }}>

      {/* encabezado */}
      <View style={s.carritoHeader}>
        <Pressable onPress={() => setVista('catalogo')} hitSlop={10}>
          <Text style={s.carritoVolver}>⬅</Text>
        </Pressable>
        <Text style={s.carritoHeaderTxt}>Centro de ayuda</Text>
        <Text style={s.carritoCuenta}>{tickets.length} {tickets.length === 1 ? 'solicitud' : 'solicitudes'}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">

        {/* preguntas frecuentes */}
        <Text style={[s.subtitulo, { marginTop: 4 }]}>Preguntas frecuentes</Text>
        {FAQ.map((f) => (
          <Pressable key={f.id} style={s.faqCard} onPress={() => setFaqAbierta(faqAbierta === f.id ? '' : f.id)}>
            <Text style={s.faqPregunta}>{faqAbierta === f.id ? '▾' : '▸'} {f.pregunta}</Text>
            {faqAbierta === f.id && <Text style={s.faqRespuesta}>{f.respuesta}</Text>}
          </Pressable>
        ))}

        {/* nueva solicitud */}
        <Text style={s.subtitulo}>Solicitudes de soporte</Text>
        <Text style={s.nota}>¿No encontraste lo que buscabas? Escríbenos y revisaremos tu caso (simulación).</Text>
        <Pressable style={s.btnGrandeInline} onPress={() => { setVerFormSoporte(!verFormSoporte); setErrorSoporte(''); }}>
          <Text style={s.btnGrandeTxt}>{verFormSoporte ? 'Cerrar formulario' : 'Nueva solicitud'}</Text>
        </Pressable>

        {verFormSoporte && (
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Nueva solicitud</Text>

            <Text style={s.label}>Tema</Text>
            <View style={s.catFila}>
              {TEMAS_SOPORTE.map((t) => (
                <Pressable key={t} onPress={() => { setFormSoporte({ ...formSoporte, tema: t }); setErrorSoporte(''); }}
                  style={[s.chip, formSoporte.tema === t && s.chipActivo, { marginBottom: 6 }]}>
                  <Text style={[s.chipTxt, formSoporte.tema === t && { color: C.blanco }]}>{t}</Text>
                </Pressable>
              ))}
            </View>

            {pedidos.length > 0 && (
              <View>
                <Text style={s.label}>Pedido relacionado (opcional)</Text>
                <View style={s.catFila}>
                  {pedidos.map((p) => (
                    <Pressable key={p.codigo}
                      onPress={() => setFormSoporte({ ...formSoporte, pedido: formSoporte.pedido === p.codigo ? '' : p.codigo })}
                      style={[s.chip, formSoporte.pedido === p.codigo && s.chipActivo, { marginBottom: 6 }]}>
                      <Text style={[s.chipTxt, formSoporte.pedido === p.codigo && { color: C.blanco }]}>{p.codigo}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <Text style={s.label}>Asunto (mínimo 5 caracteres)</Text>
            <TextInput style={s.input} value={formSoporte.asunto} placeholder="Ej: Mi pedido no ha llegado"
              onChangeText={(t) => { setFormSoporte({ ...formSoporte, asunto: t }); setErrorSoporte(''); }} />

            <Text style={s.label}>Mensaje (mínimo 15 caracteres)</Text>
            <TextInput style={[s.input, { height: 90, textAlignVertical: 'top' }]} multiline
              value={formSoporte.mensaje} placeholder="Cuéntanos qué pasó"
              onChangeText={(t) => { setFormSoporte({ ...formSoporte, mensaje: t }); setErrorSoporte(''); }} />

            {errorSoporte !== '' && <Text style={s.errorTxt}>{errorSoporte}</Text>}

            <Pressable style={s.btnGrandeInline} onPress={enviarSolicitud}>
              <Text style={s.btnGrandeTxt}>Enviar solicitud</Text>
            </Pressable>
          </View>
        )}

        {/* mis solicitudes */}
        {tickets.length === 0 && <Text style={s.nota}>Aún no has enviado solicitudes.</Text>}
        {tickets.map((t) => (
          <View key={t.id} style={s.pedidoCaja}>
            <View style={s.pedidoTop}>
              <Text style={s.lineaNombre}>{t.id} · {t.tema}</Text>
              <EstadoBadge estado={t.estado} />
            </View>
            <Text style={s.nota}>{t.fecha}{t.pedido ? ' · Pedido ' + t.pedido : ''}</Text>
            <Text style={[s.resumenFilaTxt, { fontWeight: 'bold', marginTop: 6 }]}>{t.asunto}</Text>
            <Text style={s.resumenFilaTxt}>{t.mensaje}</Text>
            {t.respuesta !== '' && <Text style={s.respuestaTxt}>{t.respuesta}</Text>}
            {t.estado !== 'Resuelta' && (
              <Pressable onPress={() => avanzarSoporte(t.id)}>
                <Text style={s.link}>Simular avance de la solicitud (demo)</Text>
              </Pressable>
            )}
          </View>
        ))}

        <Text style={s.nota}>Simulación académica: las respuestas no las escribe una persona real.</Text>
      </ScrollView>
    </View>
  );

  // VISTA CARRITO
  const vistaCarrito = () => {
    // progreso para envío gratis
    const faltaEnvio = Math.max(0, ENVIO_GRATIS_DESDE - subtotal);
    const progresoEnvio = Math.min(1, subtotal / ENVIO_GRATIS_DESDE);

    return (
      <View style={{ flex: 1, backgroundColor: C.fondo }}>

        {/* encabezado */}
        <View style={s.carritoHeader}>
          <Pressable onPress={() => setVista('catalogo')} hitSlop={10}>
            <Text style={s.carritoVolver}>⬅</Text>
          </Pressable>
          <Text style={s.carritoHeaderTxt}>Mi carrito</Text>
          <Text style={s.carritoCuenta}>{cantTotal} {cantTotal === 1 ? 'producto' : 'productos'}</Text>
        </View>

        {lineas.length === 0 ? (
          /* vacío */
          <View style={s.carritoVacio}>
            <Text style={s.carritoVacioTitulo}>Tu carrito está vacío</Text>
            <Text style={s.nota}>Agrega productos desde el catálogo</Text>
            <Pressable style={s.btn} onPress={() => setVista('catalogo')}>
              <Text style={s.btnTxt}>Ir al catálogo</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 20 }}>

              {/* envío gratis */}
              <View style={s.envioCard}>
                <Text style={s.envioMsg}>
                  {faltaEnvio === 0 ? ' ¡Tienes envío gratis!' : ' Te faltan ' + COP(faltaEnvio) + ' para envío gratis'}
                </Text>
                <View style={s.envioFondo}>
                  <View style={[s.envioRelleno, { width: (progresoEnvio * 100) + '%', backgroundColor: faltaEnvio === 0 ? C.verde : C.morado }]} />
                </View>
              </View>

              {/* productos */}
              {lineas.map((l) => (
                <View key={claveLinea(l)} style={s.carritoItem}>
                  <ImgProducto p={conVariante(l.p, l.variante)} estilo={s.carritoImg} emoji={36} />

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.lineaNombre} numberOfLines={2}>{l.p.nombre}</Text>
                    {l.variante !== '' && <Text style={s.carritoVar}>Opción: {l.variante}</Text>}
                    <Text style={s.carritoUnit}>{COP(l.p.precio)} c/u</Text>

                    {/* cantidad */}
                    <View style={s.cantFila}>
                      <Pressable style={s.cantBtn} onPress={() => cambiarCant(claveLinea(l), -1)}><Text style={s.cantBtnTxt}>−</Text></Pressable>
                      <View style={s.cantCaja}><Text style={s.cantTxt}>{l.cant}</Text></View>
                      <Pressable style={s.cantBtn} onPress={() => cambiarCant(claveLinea(l), 1)}><Text style={s.cantBtnTxt}>+</Text></Pressable>
                    </View>
                  </View>

                  {/* eliminar y subtotal */}
                  <View style={s.carritoDerecha}>
                    <Pressable onPress={() => quitar(claveLinea(l))} hitSlop={8}>
                      <Text style={{ fontSize: 20 }}>🗑️</Text>
                    </Pressable>
                    <Text style={s.carritoSub}>{COP(l.p.precio * l.cant)}</Text>
                  </View>
                </View>
              ))}

              {/* cupón */}
              <View style={s.resumenCaja}>
                <Text style={s.lineaNombre}> Cupón promocional</Text>
                <View style={s.cuponFila}>
                  <TextInput style={[s.input, { flex: 1 }]} value={cupon} placeholder="Código de cupón"
                    autoCapitalize="characters"
                    onChangeText={(t) => { setCupon(t); setErrorCupon(''); }} />
                  <Pressable style={s.btnCupon} onPress={aplicarCupon}>
                    <Text style={s.btnTxt}>Aplicar</Text>
                  </Pressable>
                </View>
                {errorCupon !== '' && <Text style={s.errorTxt}>{errorCupon}</Text>}
                {cuponAplicado && (
                  <View style={s.cuponFila}>
                    <Text style={s.cuponOk}>{CUPON_CODIGO} aplicado (10% de descuento)</Text>
                    <Pressable onPress={quitarCupon}><Text style={s.eliminar}>Quitar</Text></Pressable>
                  </View>
                )}
              </View>

              {/* resumen */}
              <Resumen subtotal={subtotal} descuento={descuento} envio={envio} total={total} />

              {/* vaciar */}
              <Pressable onPress={() => { setCarrito([]); avisar('Carrito vaciado'); }}>
                <Text style={[s.link, { color: C.rojo }]}>Vaciar carrito</Text>
              </Pressable>
            </ScrollView>

            {/* barra inferior */}
            <View style={s.barraTotal}>
              <View>
                <Text style={s.barraTotalLbl}>{envio === null ? 'Total sin envío' : 'Total a pagar'}</Text>
                <Text style={s.barraTotalVal}>{COP(total)}</Text>
              </View>
              <Pressable style={s.btnContinuar} onPress={() => setVista('checkout')}>
                <Text style={s.btnContinuarTxt}>Continuar ({cantTotal})</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    );
  };

  // VISTA CHECKOUT
  const vistaCheckout = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.titulo}>Tus datos</Text>
        {Object.entries(NOMBRES_CAMPOS).map(([k, label]) => (
          <View key={k}>
            <Text style={s.label}>{label}</Text>
            <TextInput style={s.input} value={datos[k]} placeholder={label}
              onChangeText={(t) => setDatos({ ...datos, [k]: t })} />
          </View>
        ))}

        {/* dirección */}
        <Text style={s.subtitulo}>Dirección de entrega</Text>
        {direcciones.length === 0 && <Text style={s.nota}>Aún no tienes direcciones guardadas.</Text>}
        {direcciones.map((d) => (
          <Pressable key={d.id} style={[s.dirOpcion, direccionSel === d.id && s.dirOpcionSel]} onPress={() => setDireccionSel(d.id)}>
            <View style={s.radio}>{direccionSel === d.id && <View style={s.radioPunto} />}</View>
            <View style={{ flex: 1 }}>
              <Text style={s.lineaNombre}>{d.alias}{d.principal ? '  (Principal)' : ''}</Text>
              <Text style={s.nota}>{d.municipio} · {d.referencia}</Text>
            </View>
          </Pressable>
        ))}
        <Pressable onPress={() => abrirDirecciones('checkout')}>
          <Text style={s.link}>Agregar o editar direcciones</Text>
        </Pressable>

        {/* modalidad */}
        <Text style={s.subtitulo}>Modalidad de envío</Text>
        {!dirEnvio ? (
          <Text style={s.nota}>Elige una dirección para ver el costo y el plazo del envío.</Text>
        ) : (
          MODALIDADES.map(([k, nombre]) => {
            const inf = infoEnvio(dirEnvio.municipio, k);
            return (
              <Pressable key={k} style={[s.dirOpcion, modalidad === k && s.dirOpcionSel]} onPress={() => setModalidad(k)}>
                <View style={s.radio}>{modalidad === k && <View style={s.radioPunto} />}</View>
                <View style={{ flex: 1 }}>
                  <Text style={s.lineaNombre}>{nombre}</Text>
                  <Text style={s.nota}>
                    {subtotal >= ENVIO_GRATIS_DESDE ? 'Gratis (compras desde ' + COP(ENVIO_GRATIS_DESDE) + ')' : COP(inf.costo)} · Llega en {inf.plazo}
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}

        {/* totales */}
        <Resumen subtotal={subtotal} descuento={descuento} envio={envio} total={total} />

        <Pressable style={s.btnGrandeInline} onPress={continuar}>
          <Text style={s.btnGrandeTxt}>Continuar</Text>
        </Pressable>
        <Pressable onPress={() => setVista('carrito')}><Text style={s.link}>Volver al carrito</Text></Pressable>
      </ScrollView>
    </View>
  );

  // VISTA RESUMEN
  const vistaResumen = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.titulo}>Revisa tu pedido</Text>

        {/* comprador */}
        <View style={s.resumenCaja}>
          <Text style={s.lineaNombre}>Datos del comprador</Text>
          {Object.keys(NOMBRES_CAMPOS).map((k) => (
            <Text key={k} style={s.resumenFilaTxt}>{NOMBRES_CAMPOS[k]}: {datos[k]}</Text>
          ))}
        </View>

        {/* entrega */}
        {dirEnvio && infoEnv && (
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Entrega</Text>
            <Text style={s.resumenFilaTxt}>{dirEnvio.alias} · {dirEnvio.municipio}</Text>
            <Text style={s.resumenFilaTxt}>{dirEnvio.referencia}</Text>
            <Text style={s.resumenFilaTxt}>Envío {NOMBRE_MODALIDAD[modalidad]} · llega en {infoEnv.plazo}</Text>
          </View>
        )}

        {/* productos */}
        <View style={s.resumenCaja}>
          <Text style={s.lineaNombre}>Productos</Text>
          {lineas.map((l) => (
            <Text key={claveLinea(l)} style={s.resumenFilaTxt}>
              {l.cant} × {l.p.nombre}{l.variante ? ' (' + l.variante + ')' : ''} — {COP(l.cant * l.p.precio)}
            </Text>
          ))}
        </View>

        {/* totales */}
        <Resumen subtotal={subtotal} descuento={descuento} envio={envio} total={total} />
        <Text style={s.nota}>Simulación académica: no se realiza ningún cobro real.</Text>

        <Pressable onPress={simularStockBajo}><Text style={s.link}>PRUEBA: simular stock insuficiente</Text></Pressable>

        <Pressable style={s.btnGrandeInline} onPress={confirmar}>
          <Text style={s.btnGrandeTxt}>Confirmar compra</Text>
        </Pressable>
        <Pressable onPress={() => setVista('checkout')}><Text style={s.link}>Editar mis datos</Text></Pressable>
      </ScrollView>
    </View>
  );

  // VISTA HISTORIAL
  const vistaHistorial = () => (
    <View style={{ flex: 1, backgroundColor: C.fondo }}>

      {/* encabezado */}
      <View style={s.carritoHeader}>
        <Pressable onPress={() => setVista('catalogo')} hitSlop={10}>
          <Text style={s.carritoVolver}>⬅</Text>
        </Pressable>
        <Text style={s.carritoHeaderTxt}>Mis pedidos</Text>
        <Text style={s.carritoCuenta}>{pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'}</Text>
      </View>

      {pedidos.length === 0 ? (
        /* vacío */
        <View style={s.carritoVacio}>
          <Text style={s.carritoVacioTitulo}>Aún no tienes pedidos</Text>
          <Text style={s.nota}>Cuando compres, tus pedidos aparecerán aquí</Text>
          <Pressable style={s.btn} onPress={() => setVista('catalogo')}>
            <Text style={s.btnTxt}>Ir al catálogo</Text>
          </Pressable>
        </View>
      ) : (
        /* lista */
        <FlatList
          key="lista-historial"
          data={pedidos}
          keyExtractor={(p) => p.codigo}
          contentContainerStyle={{ padding: 14, paddingBottom: 90 }}
          renderItem={({ item }) => (
            <Pressable style={s.pedidoCard} onPress={() => abrirPedido(item.codigo)}>

              {/* código y estado */}
              <View style={s.pedidoTop}>
                <View style={{ flex: 1 }}>
                  <Text style={s.pedidoCodigo}>{item.codigo}</Text>
                  <Text style={s.nota}>{item.fecha}</Text>
                </View>
                <EstadoBadge estado={item.estado} />
              </View>

              <View style={s.pedidoLinea} />

              {/* productos */}
              {item.items.map((i, idx) => (
                <View key={idx} style={s.pedidoItem}>
                  <Text style={s.pedidoItemNombre} numberOfLines={2}>{i.cant} × {i.nombre}</Text>
                  <Text style={s.pedidoItemPrecio}>{COP(i.precio * i.cant)}</Text>
                </View>
              ))}

              <View style={s.pedidoLinea} />

              {/* entrega y total */}
              <Text style={s.nota}>{item.direccion.municipio} · Envío {NOMBRE_MODALIDAD[item.modalidad]}</Text>
              {item.descuento > 0 && <Text style={s.descuentoTxt}>Descuento: -{COP(item.descuento)}</Text>}
              <Text style={s.nota}>Envío: {item.envio === 0 ? 'Gratis' : COP(item.envio)}</Text>
              <View style={s.pedidoTotalFila}>
                <Text style={s.pedidoTotalLbl}>Total</Text>
                <Text style={s.pedidoTotalVal}>{COP(item.total)}</Text>
              </View>

              <Text style={s.verMas}>Ver seguimiento ›</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );

  // VISTA SEGUIMIENTO DE PEDIDO
  const vistaPedido = () => {
    const ped = pedidos.find((p) => p.codigo === pedidoSel);

    if (!ped) {
      return (
        <View style={{ flex: 1, backgroundColor: C.fondo }}>
          {encabezado(false)}
          <Vacio msg="No encontramos ese pedido" btn="Volver a mis pedidos" onPress={() => setVista('historial')} />
        </View>
      );
    }

    const finalizado = ped.estado === 'Entregado' || ped.estado === 'Cancelado';
    const puedeCancelar = ped.estado === 'Confirmado' || ped.estado === 'Preparando';
    const siguiente = finalizado ? '' : ESTADOS_PEDIDO[ESTADOS_PEDIDO.indexOf(ped.estado) + 1];

    return (
      <View style={{ flex: 1, backgroundColor: C.fondo }}>

        {/* encabezado */}
        <View style={s.carritoHeader}>
          <Pressable onPress={() => setVista('historial')} hitSlop={10}>
            <Text style={s.carritoVolver}>⬅</Text>
          </Pressable>
          <Text style={s.carritoHeaderTxt}>{ped.codigo}</Text>
          <EstadoBadge estado={ped.estado} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>

          {/* historial de estados */}
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Seguimiento del pedido</Text>
            <View style={{ marginTop: 10 }}>
              {ped.historial.map((ev, idx) => (
                <View key={idx} style={s.tiempoFila}>
                  <View style={s.tiempoCol}>
                    <View style={[s.punto, { backgroundColor: ev.estado === 'Cancelado' ? C.rojo : C.morado }]} />
                    {idx < ped.historial.length - 1 && <View style={s.puntoLinea} />}
                  </View>
                  <View style={{ flex: 1, paddingBottom: 12 }}>
                    <Text style={s.tiempoEstado}>{ev.estado}</Text>
                    <Text style={s.nota}>{ev.fecha}</Text>
                  </View>
                </View>
              ))}
            </View>
            {!finalizado && <Text style={s.nota}>Siguiente paso: {siguiente}</Text>}
            {ped.estado === 'Entregado' && <Text style={s.nota}>Pedido entregado. No admite más cambios.</Text>}
            {ped.estado === 'Cancelado' && <Text style={s.nota}>Pedido cancelado. Las unidades volvieron al inventario.</Text>}
          </View>

          {/* entrega */}
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Entrega</Text>
            <Text style={s.resumenFilaTxt}>{ped.direccion.alias} · {ped.direccion.municipio}</Text>
            <Text style={s.resumenFilaTxt}>{ped.direccion.referencia}</Text>
            <Text style={s.resumenFilaTxt}>Envío {NOMBRE_MODALIDAD[ped.modalidad]} · llega en {ped.plazo}</Text>
          </View>

          {/* productos */}
          <View style={s.resumenCaja}>
            <Text style={s.lineaNombre}>Productos</Text>
            {ped.items.map((i, idx) => (
              <View key={idx} style={s.pedidoItem}>
                <Text style={s.pedidoItemNombre} numberOfLines={2}>{i.cant} × {i.nombre}</Text>
                <Text style={s.pedidoItemPrecio}>{COP(i.precio * i.cant)}</Text>
              </View>
            ))}
          </View>

          {/* totales */}
          <Resumen subtotal={ped.subtotal} descuento={ped.descuento} envio={ped.envio} total={ped.total} />

          {/* avanzar entrega (demo) */}
          <Pressable style={[s.btnGrandeInline, finalizado && { opacity: 0.4 }]} onPress={() => avanzarPedido(ped.codigo)}>
            <Text style={s.btnGrandeTxt}>Simular avance de entrega</Text>
          </Pressable>

          {/* cancelar */}
          <Pressable style={[s.btnCancelar, !puedeCancelar && { opacity: 0.4 }]} onPress={() => pedirCancelar(ped.codigo)}>
            <Text style={s.btnCancelarTxt}>Cancelar pedido</Text>
          </Pressable>

          {/* confirmación */}
          {cancelando === ped.codigo && (
            <View style={s.confirmCaja}>
              <Text style={s.confirmTxt}>¿Seguro que quieres cancelar este pedido? Las unidades volverán al inventario.</Text>
              <View style={s.confirmBotones}>
                <Pressable style={s.btnRojo} onPress={() => cancelarPedido(ped.codigo)}>
                  <Text style={s.btnTxt}>Sí, cancelar</Text>
                </Pressable>
                <Pressable style={s.btnGris} onPress={() => setCancelando('')}>
                  <Text style={s.btnGrisTxt}>No, volver</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Text style={s.nota}>Simulación académica: el avance de la entrega no usa transportadoras reales.</Text>
        </ScrollView>
      </View>
    );
  };

  // VISTA DIRECCIONES
  const vistaDirecciones = () => (
    <View style={{ flex: 1, backgroundColor: C.fondo }}>

      {/* encabezado */}
      <View style={s.carritoHeader}>
        <Pressable onPress={() => setVista(origenDir)} hitSlop={10}>
          <Text style={s.carritoVolver}>⬅</Text>
        </Pressable>
        <Text style={s.carritoHeaderTxt}>Mis direcciones</Text>
        <Text style={s.carritoCuenta}>{direcciones.length} {direcciones.length === 1 ? 'dirección' : 'direcciones'}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
        <Text style={s.nota}>
          Usa datos ficticios. La dirección principal es tu favorita; la elegida es la que se usa en tu pedido actual.
          Solo hay envío a: {MUNICIPIOS.join(', ')}.
        </Text>

        {direcciones.length === 0 && <Text style={s.nota}>Aún no tienes direcciones. Agrega la primera abajo.</Text>}

        {/* lista */}
        {direcciones.map((d) => (
          <View key={d.id} style={s.dirCard}>
            <View style={s.dirTop}>
              <Text style={s.lineaNombre}>{d.alias}</Text>
              {d.principal && <View style={s.dirBadge}><Text style={s.dirBadgeTxt}>Principal</Text></View>}
              {direccionSel === d.id && <View style={[s.dirBadge, { backgroundColor: '#E3F6E4' }]}><Text style={[s.dirBadgeTxt, { color: '#2E9E47' }]}>Elegida</Text></View>}
            </View>
            <Text style={s.nota}>{d.municipio}</Text>
            <Text style={s.resumenFilaTxt}>{d.referencia}</Text>
            <View style={s.dirBotones}>
              <Pressable style={s.dirBtn} onPress={() => elegirDireccion(d.id)}><Text style={s.dirBtnTxt}>Elegir</Text></Pressable>
              {!d.principal && <Pressable style={s.dirBtn} onPress={() => hacerPrincipal(d.id)}><Text style={s.dirBtnTxt}>Hacer principal</Text></Pressable>}
              <Pressable style={s.dirBtn} onPress={() => editarDireccion(d)}><Text style={s.dirBtnTxt}>Editar</Text></Pressable>
            </View>
          </View>
        ))}

        {/* formulario */}
        <View style={s.resumenCaja}>
          <Text style={s.lineaNombre}>{editDirId ? 'Editar dirección' : 'Nueva dirección'}</Text>

          <Text style={s.label}>Alias (ej: Casa, Oficina)</Text>
          <TextInput style={s.input} value={formDir.alias} placeholder="Alias"
            onChangeText={(t) => { setFormDir({ ...formDir, alias: t }); setErrorDir(''); }} />

          <Text style={s.label}>Municipio</Text>
          <View style={s.catFila}>
            {MUNICIPIOS.map((m) => (
              <Pressable key={m} onPress={() => { setFormDir({ ...formDir, municipio: m }); setErrorDir(''); }}
                style={[s.chip, formDir.municipio === m && s.chipActivo, { marginBottom: 6 }]}>
                <Text style={[s.chipTxt, formDir.municipio === m && { color: C.blanco }]}>{m}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={s.label}>Referencia de entrega (mínimo 5 caracteres)</Text>
          <TextInput style={[s.input, { height: 70, textAlignVertical: 'top' }]} multiline
            value={formDir.referencia} placeholder="Ej: Barrio Centro, casa 12 (dato ficticio)"
            onChangeText={(t) => { setFormDir({ ...formDir, referencia: t }); setErrorDir(''); }} />

          {errorDir !== '' && <Text style={s.errorTxt}>{errorDir}</Text>}

          <Pressable style={s.btnGrandeInline} onPress={guardarDireccion}>
            <Text style={s.btnGrandeTxt}>{editDirId ? 'Guardar cambios' : 'Guardar dirección'}</Text>
          </Pressable>
          {editDirId && (
            <Pressable onPress={limpiarFormDir}><Text style={s.link}>Cancelar edición</Text></Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );

  // VISTA INVENTARIO (responsable)
  const vistaInventario = () => {
    const unidades = productos.reduce((a, p) => a + p.stock, 0);
    const agotados = productos.filter((p) => p.stock === 0).length;
    return (
      <View style={{ flex: 1 }}>
        {encabezado(false)}
        <FlatList
          key="lista-inventario"
          style={{ flex: 1 }}
          data={productos}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
          ListHeaderComponent={
            <View>
              <Text style={[s.titulo, { paddingBottom: 4 }]}>Inventario</Text>
              <View style={[s.resumenCaja, { marginBottom: 10 }]}>
                <Text style={s.resumenFilaTxt}>Productos: {productos.length}</Text>
                <Text style={s.resumenFilaTxt}>Unidades en stock: {unidades}</Text>
                <Text style={s.resumenFilaTxt}>Agotados: {agotados}</Text>
                <Text style={s.resumenFilaTxt}>Alertas de reposición activas: {alertas.length}</Text>
              </View>
            </View>
          }
          renderItem={({ item: p }) => {
            const reservado = enCarrito(p.id);
            return (
              <View style={s.invFila}>
                <ImgProducto p={p} estilo={s.lineaImg} emoji={30} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={s.lineaNombre} numberOfLines={2}>{p.nombre}</Text>
                  <Text style={s.nota}>{p.id} · {p.marca} · {p.categoria} · {COP(p.precio)}</Text>
                  {p.variantes && <Text style={s.nota}>Opciones: {p.variantes.join(', ')}</Text>}
                  <Text style={[s.stockInv, { color: p.stock === 0 ? C.rojo : C.texto }]}>
                    Stock: {p.stock}{p.stock === 0 ? ' (agotado)' : ''}
                  </Text>
                  {reservado > 0 && <Text style={s.nota}>En carrito: {reservado} u (aún no descontado)</Text>}
                  {alertas.includes(p.id) && <Text style={s.nota}>Un comprador espera la reposición</Text>}
                </View>
                <Pressable style={s.btnEditar} onPress={() => editarProducto(p)}>
                  <Text style={s.btnTxt}>Editar</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    );
  };

  // VISTA VENTAS (responsable, los cancelados no suman)
  const vistaVentas = () => {
    const activos = pedidos.filter((p) => p.estado !== 'Cancelado');
    const cancelados = pedidos.length - activos.length;
    const vendido = activos.reduce((a, p) => a + p.total, 0);
    return (
      <View style={{ flex: 1 }}>
        {encabezado(false)}
        <FlatList
          key="lista-ventas"
          style={{ flex: 1 }}
          data={pedidos}
          keyExtractor={(p) => p.codigo}
          contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
          ListHeaderComponent={
            <View>
              <Text style={[s.titulo, { paddingBottom: 4 }]}>Ventas</Text>
              <View style={s.resumenCaja}>
                <Text style={s.resumenFilaTxt}>Pedidos activos: {activos.length}</Text>
                <Text style={s.resumenFilaTxt}>Pedidos cancelados: {cancelados}</Text>
                <Text style={s.resumenTotal}>Total vendido: {COP(vendido)}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={<Vacio msg="Aún no hay ventas registradas" btn="Ver inventario" onPress={() => setVista('inventario')} />}
          renderItem={({ item }) => (
            <View style={s.pedidoCaja}>
              <View style={s.pedidoTop}>
                <Text style={s.lineaNombre}>{item.codigo}</Text>
                <EstadoBadge estado={item.estado} />
              </View>
              <Text style={s.nota}>{item.fecha}</Text>
              {item.items.map((i, idx) => (
                <Text key={idx} style={s.resumenFilaTxt}>{i.cant} × {i.nombre}</Text>
              ))}
              <Text style={s.lineaPrecio}>Total: {COP(item.total)}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  // VISTA SOPORTE (responsable, atiende las solicitudes de los compradores)
  const vistaSoporte = () => {
    const abiertas = tickets.filter((t) => t.estado === 'Abierta').length;
    const enRevision = tickets.filter((t) => t.estado === 'En revisión').length;
    const resueltas = tickets.filter((t) => t.estado === 'Resuelta').length;
    return (
      <View style={{ flex: 1 }}>
        {encabezado(false)}
        <FlatList
          key="lista-soporte"
          style={{ flex: 1 }}
          data={tickets}
          keyExtractor={(t) => t.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
          ListHeaderComponent={
            <View>
              <Text style={[s.titulo, { paddingBottom: 4 }]}>Soporte</Text>
              <View style={s.resumenCaja}>
                <Text style={s.resumenFilaTxt}>Abiertas: {abiertas}</Text>
                <Text style={s.resumenFilaTxt}>En revisión: {enRevision}</Text>
                <Text style={s.resumenFilaTxt}>Resueltas: {resueltas}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={<Vacio msg="Aún no hay solicitudes de soporte" btn="Ver inventario" onPress={() => setVista('inventario')} />}
          renderItem={({ item: t }) => (
            <View style={s.pedidoCaja}>
              <View style={s.pedidoTop}>
                <Text style={s.lineaNombre}>{t.id} · {t.tema}</Text>
                <EstadoBadge estado={t.estado} />
              </View>
              <Text style={s.nota}>{t.fecha}{t.pedido ? ' · Pedido ' + t.pedido : ''}</Text>
              <Text style={[s.resumenFilaTxt, { fontWeight: 'bold', marginTop: 6 }]}>{t.asunto}</Text>
              <Text style={s.resumenFilaTxt}>{t.mensaje}</Text>
              {t.respuesta !== '' && <Text style={s.respuestaTxt}>{t.respuesta}</Text>}
              <Pressable style={[s.btnGrandeInline, t.estado === 'Resuelta' && { opacity: 0.4 }]} onPress={() => avanzarSoporte(t.id)}>
                <Text style={s.btnGrandeTxt}>{t.estado === 'Abierta' ? 'Pasar a revisión' : t.estado === 'En revisión' ? 'Marcar como resuelta' : 'Resuelta'}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  };

  // VISTA PRODUCTO (responsable, nuevo o editar)
  const vistaProducto = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.titulo}>{editId ? 'Editar producto' : 'Nuevo producto'}</Text>
        {editId && <Text style={s.nota}>Editando {editId}</Text>}

        {campo('Nombre', 'nombre', 'Nombre del producto')}

        <Text style={s.label}>Categoría</Text>
        <View style={s.catFila}>
          {CATEGORIAS.map((c) => (
            <Pressable key={c} onPress={() => setForm({ ...form, categoria: c })}
              style={[s.chip, form.categoria === c && s.chipActivo, { marginBottom: 6 }]}>
              <Text style={[s.chipTxt, form.categoria === c && { color: C.blanco }]}>{c}</Text>
            </Pressable>
          ))}
        </View>

        {campo('Precio (COP)', 'precio', 'Ej: 35000')}
        {campo('Stock', 'stock', 'Ej: 10')}
        {campo('Ícono (emoji, opcional)', 'icono', 'Ej: 💅')}
        {campo('Descripción (mínimo 15 caracteres)', 'descripcion', 'Describe el producto', true)}

        {errorForm !== '' && <Text style={s.errorTxt}>{errorForm}</Text>}

        <Pressable style={s.btnGrandeInline} onPress={guardarProducto}>
          <Text style={s.btnGrandeTxt}>{editId ? 'Guardar cambios' : 'Registrar producto'}</Text>
        </Pressable>
        {editId && (
          <Pressable onPress={abrirNuevo}><Text style={s.link}>Cancelar edición</Text></Pressable>
        )}
      </ScrollView>
    </View>
  );


  // NAVEGACION

  // vistas disponibles
  const vistas = {
    catalogo: vistaCatalogo, detalle: vistaDetalle, comparar: vistaComparar,
    favoritos: vistaFavoritos, carrito: vistaCarrito, checkout: vistaCheckout,
    resumen: vistaResumen, historial: vistaHistorial, pedido: vistaPedido,
    direcciones: vistaDirecciones,
    notificaciones: vistaNotificaciones, ayuda: vistaAyuda,
    inventario: vistaInventario, ventas: vistaVentas, soporte: vistaSoporte, producto: vistaProducto,
  };

  // botón activo de la barra inferior
  const activa = {
    detalle: origen === 'comparar' || origen === 'notificaciones' ? 'catalogo' : origen,
    checkout: 'carrito', resumen: 'carrito', comparar: 'catalogo',
    pedido: 'historial',
    notificaciones: 'catalogo', ayuda: 'catalogo',
    direcciones: origenDir === 'checkout' ? 'carrito' : origenDir,
  }[vista] || vista;

  // botones de la barra inferior
  const navComprador = [['catalogo', '🏠', 'Catálogo'], ['favoritos', '💜', 'Favoritos'], ['carrito', '🛒', 'Carrito'], ['historial', '🧾', 'Historial']];
  const navResp = [['inventario', '📦', 'Inventario'], ['ventas', '🧾', 'Ventas'], ['soporte', '🆘', 'Soporte'], ['producto', '➕', 'Producto']];
  const nav = esResp ? navResp : navComprador;


  // PANTALLAS

  // login (sin sesión)
  if (!usuario) {
    return (
      <SafeAreaView style={[s.raiz, { backgroundColor: C.blanco }]}>
        <StatusBar barStyle="dark-content" backgroundColor={C.blanco} />
        {vistaLogin()}
      </SafeAreaView>
    );
  }

  // pantalla principal
  return (
    <SafeAreaView style={s.raiz}>
      <StatusBar barStyle="dark-content" backgroundColor={C.header} />

      {/* vista actual */}
      <View key={perfil + vista + (vista === 'detalle' ? selId : '')} style={{ flex: 1 }}>{(vistas[vista] || vistaCatalogo)()}</View>

      {/* aviso */}
      {aviso !== '' && <View style={s.toast}><Text style={s.toastTxt}>{aviso}</Text></View>}

      {/* barra inferior */}
      <View style={s.nav}>
        {nav.map(([k, ic, t]) => (
          <Pressable key={k} style={s.navItem} onPress={() => (k === 'producto' ? abrirNuevo() : setVista(k))}>
            <Text style={{ fontSize: 22 }}>{ic}</Text>
            <Text style={[s.navTxt, activa === k && { color: C.morado, fontWeight: 'bold' }]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {/* menú de configuración (notificaciones y ayuda) */}
      {menuConfig && (
        <>
          <Pressable style={s.menuFondo} onPress={() => setMenuConfig(false)} />
          <View style={[s.menuCaja, s.menuCajaConfig]}>
            <Text style={s.menuTitulo}>Configuración</Text>
            {!esResp && (
              <Pressable style={s.menuItem} onPress={() => { setMenuConfig(false); setVista('notificaciones'); }}>
                <Text style={s.menuItemTxt}>Notificaciones{noLeidas > 0 ? ' (' + noLeidas + ')' : ''}</Text>
              </Pressable>
            )}
            {!esResp && (
              <Pressable style={s.menuItem} onPress={() => { setMenuConfig(false); abrirAyuda(); }}>
                <Text style={s.menuItemTxt}>Centro de ayuda</Text>
              </Pressable>
            )}
            <Pressable style={s.menuItem} onPress={() => { setMenuConfig(false); avisar('Configuración próximamente'); }}>
              <Text style={s.menuItemTxt}>Ajustes</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* menú de perfil */}
      {menuPerfil && (
        <>
          <Pressable style={s.menuFondo} onPress={() => setMenuPerfil(false)} />
          <View style={s.menuCaja}>
            <Text style={s.menuTitulo}>Cambiar perfil</Text>
            {[['comprador', '🛍️', 'Comprador'], ['responsable', '🏪', 'Responsable de la tienda']].map(([k, ic, t]) => (
              <Pressable key={k} style={[s.menuItem, perfil === k && s.menuItemActivo]} onPress={() => cambiarPerfil(k)}>
                <Text style={s.menuItemTxt}>{t}</Text>
              </Pressable>
            ))}
            {!esResp && (
              <Pressable style={s.menuItem} onPress={() => { setMenuPerfil(false); abrirDirecciones(vista); }}>
                <Text style={s.menuItemTxt}>Mis direcciones</Text>
              </Pressable>
            )}
            <Pressable style={s.menuItem} onPress={cerrarSesion}>
              <Text style={[s.menuItemTxt, { color: C.rojo }]}>Cerrar sesión</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}


// ESTILOS (CSS)

const s = StyleSheet.create({

  // base
  raiz: { flex: 1, backgroundColor: C.blanco, paddingTop: StatusBar.currentHeight || 0 },

  // login
  loginContenido: { flexGrow: 1, justifyContent: 'center', padding: 22 },
  loginLogo: { width: 240, height: 200, resizeMode: 'contain', alignSelf: 'center', marginBottom: 8 },
  loginCard: {
    backgroundColor: C.blanco, borderRadius: 22, padding: 20,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 14, shadowOffset: { width: 0, height: 6 },
    borderWidth: 1, borderColor: C.claro,
  },
  loginTitulo: { color: C.morado, fontSize: 26, fontFamily: 'Fredoka_700Bold', textAlign: 'center', marginBottom: 6 },
  claveFila: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 12, borderWidth: 1, borderColor: C.claro, paddingHorizontal: 12 },
  claveInput: { flex: 1, paddingVertical: 8 },
  olvidasteTxt: { color: C.morado, fontSize: 12, marginTop: 8, fontWeight: 'bold' },
  infoTxt: { color: C.morado, fontSize: 13, marginTop: 12 },

  // encabezado
  header: { backgroundColor: C.header, paddingHorizontal: 12, paddingTop: 20, paddingBottom: 8 },
  headerFila: { flexDirection: 'row', alignItems: 'center' },
  headerTitulo: { flex: 1, color: C.blanco, fontSize: 20, fontFamily: 'Fredoka_700Bold', marginLeft: 10 },
  logoImg: { width: 100, height: 110, resizeMode: 'contain', marginVertical: -5, marginLeft: 0, marginRight: 0 },
  buscador: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, marginHorizontal: 10, paddingHorizontal: 20, height: 35 },
  buscadorInput: { flex: 1, paddingVertical: 0, paddingHorizontal: 6, fontSize: 13 },
  iconoBtn: { marginRight: 8 },
  usuario: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  bienvenido: { alignSelf: 'center', marginTop: 10, color: C.blanco, fontSize: 30, fontFamily: 'Fredoka_700Bold', paddingHorizontal: 22, paddingVertical: 2,
    backgroundColor: C.header, textShadowColor: '#000', textShadowRadius: 2 },

  // categorías
  tabs: { flexDirection: 'row', backgroundColor: C.claro, paddingHorizontal: 5 },
  tab: { paddingVertical: 10, paddingHorizontal: 20 },
  tabActiva: { borderBottomWidth: 3, borderBottomColor: C.morado },
  tabTxt: { color: C.texto, fontSize: 13, fontFamily: 'Fredoka_700Bold' },

  // títulos y chips
  tituloFila: { paddingHorizontal: 20, paddingTop: 25 },
  titulo: { color: C.morado, fontSize: 30, fontFamily: 'Fredoka_700Bold' },
  subtitulo: { color: C.morado, fontSize: 20, fontFamily: 'Fredoka_700Bold', marginTop: 20, marginBottom: 4 },
  carritoTitulo2: { position: 'absolute', right: 20, top: 12 },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: C.rojo, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeTxt: { color: C.blanco, fontSize: 11 },
  ordenFila: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 15 },
  chip: { borderWidth: 1, borderColor: C.morado, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  chipActivo: { backgroundColor: C.morado },
  chipTxt: { color: C.morado, fontSize: 12, fontFamily: 'Fredoka_700Bold' },
  muestraColor: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: C.ciruela, marginRight: 6 },

  // IMAGENES DE PRODUCTO: el contenedor tiene tamaño fijo y la imagen se ajusta adentro
  imgContenedor: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: C.blanco },
  imgLlena: { width: '100%', height: '100%' },

  // tarjeta de producto
  tarjeta: { width: '48%', backgroundColor: C.blanco, borderRadius: 18, padding: 10, marginBottom: 25, elevation: 6, shadowColor: '#000', shadowOpacity: 0.45, shadowRadius: 6 },
  tarjetaImg: { width: '100%', height: 140, borderRadius: 14, borderWidth: 1, borderColor: C.claro },
  tarjetaNombre: { color: C.ciruela, fontSize: 12, marginTop: 6, minHeight: 32, fontFamily: 'Fredoka_700Bold' },
  tarjetaPrecio: { color: C.ciruela, fontSize: 12, fontFamily: 'Fredoka_700Bold' },
  stockTxt: { fontSize: 11, marginBottom: 4 },
  tarjetaFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  oferta: { position: 'absolute', top: 6, right: -4, zIndex: 2, backgroundColor: C.claro, borderWidth: 1, borderColor: C.ciruela, paddingHorizontal: 6, transform: [{ rotate: '12deg' }] },
  ofertaTxt: { fontSize: 10, color: C.ciruela },

  // botones
  btnComprar: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 6 },
  btn: { backgroundColor: C.morado, borderRadius: 18, paddingHorizontal: 22, paddingVertical: 10, marginTop: 12 },
  btnTxt: { color: C.blanco, fontWeight: 'bold', fontSize: 13 },
  btnGrande: { position: 'absolute', bottom: 8, left: 16, right: 16, backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  btnGrandeInline: { backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  btnGrandeTxt: { color: C.blanco, fontWeight: 'bold', fontSize: 16 },
  btnCupon: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, marginLeft: 8 },
  btnContinuar: { backgroundColor: C.morado, borderRadius: 16, paddingHorizontal: 18, paddingVertical: 8 },
  btnContinuarTxt: { color: C.blanco, fontWeight: 'bold' },

  // mensaje vacío
  vacio: { alignItems: 'center', justifyContent: 'center', padding: 30 },
  vacioTxt: { color: C.texto, fontSize: 16, textAlign: 'center', marginTop: 6 },

  // comparador
  compararTxt: { color: C.morado, fontSize: 11, fontWeight: 'bold', marginTop: 6, textAlign: 'center' },
  compararBarra: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.claro, marginHorizontal: 14, marginBottom: 8, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  compararBarraTxt: { color: C.texto, fontSize: 15, fontWeight: 'bold' },
  compFila: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderBottomWidth: 1, borderBottomColor: C.claro, paddingVertical: 10, paddingHorizontal: 8 },
  compEtiqueta: { width: 90, color: C.gris, fontSize: 12 },
  compImg: { width: 64, height: 64, borderRadius: 12, borderWidth: 1, borderColor: C.claro, marginBottom: 4 },
  compCol: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  compValor: { color: C.ciruela, fontSize: 12, textAlign: 'center' },

  // detalle
  detalleBarra: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  volver: { fontSize: 26, color: C.morado },
  detalleTitulo: { color: C.morado, fontSize: 18, fontWeight: 'bold', marginLeft: 14 },
  detalleImg: { width: '100%', height: 280, borderBottomWidth: 1, borderBottomColor: C.claro },
  detalleInfo: { padding: 16, backgroundColor: '#F6EEFA' },
  detalleFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  masVendido: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 6, paddingVertical: 1 },
  masVendidoTxt: { fontSize: 10, color: '#000' },
  corazon: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  detalleNombre: { color: C.morado, fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  detalleDesc: { color: C.ciruela, fontSize: 13 },
  detalleCat: { color: C.gris, fontSize: 12, marginTop: 4 },
  precioFila: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  detallePrecio: { color: C.morado, fontSize: 36, fontWeight: 'bold' },
  ofertaCaja: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 8, marginLeft: 12 },
  ofertaCajaTxt: { fontSize: 12 },
  tachado: { color: C.gris, textDecorationLine: 'line-through', fontSize: 12 },
  stockDetalle: { fontWeight: 'bold', marginVertical: 6 },
  medios: { color: C.ciruela, fontSize: 13, marginVertical: 6 },
  mediosFila: { flexDirection: 'row', justifyContent: 'space-between' },
  medioCaja: { width: '48%', backgroundColor: C.blanco, borderRadius: 14, padding: 14, elevation: 3 },
  medioTxt: { fontSize: 11, color: C.texto, textAlign: 'center' },

  // reseñas, preguntas y relacionados
  resenaCaja: { backgroundColor: C.blanco, borderRadius: 16, padding: 14, marginTop: 10, elevation: 3 },
  promedioTxt: { color: C.morado, fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  preguntaCaja: { borderTopWidth: 1, borderTopColor: C.claro, paddingTop: 8, marginTop: 8 },
  respuestaTxt: { color: C.morado, fontSize: 13, marginTop: 4 },
  relCard: { width: 130, backgroundColor: C.blanco, borderRadius: 14, padding: 8, marginRight: 10, marginBottom: 6, elevation: 3 },
  relImg: { width: '100%', height: 90, borderRadius: 10, borderWidth: 1, borderColor: C.claro },
  relNombre: { color: C.ciruela, fontSize: 11, marginTop: 4, minHeight: 28, fontFamily: 'Fredoka_700Bold' },
  relPrecio: { color: C.morado, fontSize: 11, fontWeight: 'bold' },

  // alertas de reposición, notificaciones y ayuda
  alertaBtn: { borderWidth: 1.5, borderColor: C.morado, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center', marginVertical: 6 },
  alertaBtnOn: { backgroundColor: C.claro },
  alertaBtnTxt: { color: C.morado, fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  alertaFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: C.claro, paddingTop: 6, marginTop: 6 },
  notiCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 16, padding: 12, marginTop: 10, elevation: 2, borderLeftWidth: 4, borderLeftColor: C.claro },
  notiNoLeida: { borderLeftColor: C.morado, backgroundColor: '#F6EEFA' },
  notiIcono: { fontSize: 26, marginRight: 10 },
  notiTitulo: { color: C.texto, fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  faqCard: { backgroundColor: C.blanco, borderRadius: 14, padding: 12, marginTop: 8, elevation: 2 },
  faqPregunta: { color: C.texto, fontSize: 14, fontWeight: 'bold' },
  faqRespuesta: { color: C.ciruela, fontSize: 13, marginTop: 6 },

  // carrito y encabezados morados
  carritoHeader: { backgroundColor: C.header, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 18, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  carritoVolver: { fontSize: 24, color: C.blanco },
  carritoHeaderTxt: { flex: 1, color: C.blanco, fontSize: 24, fontFamily: 'Fredoka_700Bold', marginLeft: 12 },
  carritoCuenta: { color: C.blanco, fontSize: 13, backgroundColor: C.morado, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, overflow: 'hidden' },
  carritoVacio: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  carritoVacioTitulo: { color: C.morado, fontSize: 22, fontFamily: 'Fredoka_700Bold', marginTop: 10 },
  envioCard: { backgroundColor: C.blanco, borderRadius: 16, padding: 12, marginBottom: 12, elevation: 2 },
  envioMsg: { color: C.texto, fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  envioFondo: { height: 8, borderRadius: 4, backgroundColor: C.claro, overflow: 'hidden' },
  envioRelleno: { height: 8, borderRadius: 4 },
  carritoItem: { flexDirection: 'row', backgroundColor: C.blanco, borderRadius: 18, padding: 12, marginBottom: 12, elevation: 3 },
  carritoImg: { width: 76, height: 76, borderRadius: 14, borderWidth: 1, borderColor: C.claro },
  carritoVar: { color: C.gris, fontSize: 12, marginTop: 2 },
  carritoUnit: { color: C.ciruela, fontSize: 12, marginTop: 2 },
  carritoDerecha: { alignItems: 'flex-end', justifyContent: 'space-between' },
  carritoSub: { color: C.morado, fontSize: 14, fontWeight: 'bold' },
  barraTotal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.blanco, paddingHorizontal: 16, paddingVertical: 12, borderTopLeftRadius: 22, borderTopRightRadius: 22, elevation: 12, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8 },
  barraTotalLbl: { color: C.gris, fontSize: 12 },
  barraTotalVal: { color: C.morado, fontSize: 22, fontWeight: 'bold' },
  lineaNombre: { color: C.ciruela, fontSize: 13, fontWeight: 'bold' },
  lineaPrecio: { color: C.morado, fontSize: 20, fontWeight: 'bold' },
  lineaImg: { width: 64, height: 64, borderRadius: 10, borderWidth: 1, borderColor: C.claro },
  cantFila: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  cantBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  cantBtnTxt: { color: C.morado, fontSize: 18, fontWeight: 'bold' },
  cantCaja: { borderWidth: 1, borderColor: C.ciruela, backgroundColor: C.claro, paddingHorizontal: 12, marginHorizontal: 6 },
  cantTxt: { color: C.ciruela, fontSize: 12 },
  eliminar: { color: C.rojo, fontSize: 12, marginTop: 4 },

  // cupón
  cuponFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  cuponOk: { color: '#2E9E47', fontWeight: 'bold', fontSize: 13, flex: 1 },
  descuentoTxt: { color: '#2E9E47', fontSize: 14, fontWeight: 'bold', marginBottom: 3 },

  // resumen y formularios
  resumenCaja: { backgroundColor: C.blanco, borderRadius: 16, padding: 14, marginTop: 8, elevation: 3 },
  resumenFilaTxt: { color: C.ciruela, fontSize: 14, marginBottom: 3 },
  resumenTotal: { color: C.morado, fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  nota: { color: C.gris, fontSize: 12, marginTop: 4 },
  label: { color: C.ciruela, marginTop: 10, marginBottom: 3, fontSize: 13 },
  input: { backgroundColor: C.blanco, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: C.claro },
  link: { color: C.morado, textAlign: 'center', marginTop: 14, fontWeight: 'bold' },
  errorTxt: { color: C.rojo, fontSize: 14, fontWeight: 'bold', marginTop: 12 },

  // direcciones y envío
  dirOpcion: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, padding: 12, marginTop: 8, borderWidth: 1.5, borderColor: C.claro },
  dirOpcionSel: { borderColor: C.morado, backgroundColor: '#F6EEFA' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.morado, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  radioPunto: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.morado },
  dirCard: { backgroundColor: C.blanco, borderRadius: 16, padding: 14, marginTop: 10, elevation: 3 },
  dirTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  dirBadge: { backgroundColor: C.claro, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
  dirBadgeTxt: { color: C.texto, fontSize: 11, fontWeight: 'bold' },
  dirBotones: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  dirBtn: { borderWidth: 1, borderColor: C.morado, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5, marginRight: 8, marginTop: 4 },
  dirBtnTxt: { color: C.morado, fontSize: 12, fontWeight: 'bold' },

  // historial de pedidos
  pedidoCard: { backgroundColor: C.blanco, borderRadius: 18, padding: 14, marginBottom: 12, elevation: 3 },
  pedidoTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pedidoCodigo: { color: C.morado, fontSize: 18, fontFamily: 'Fredoka_700Bold' },
  pedidoBadge: { backgroundColor: '#E3F6E4', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  pedidoBadgeTxt: { color: '#2E9E47', fontSize: 12, fontWeight: 'bold' },
  pedidoLinea: { height: 1, backgroundColor: C.claro, marginVertical: 10 },
  pedidoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  pedidoItemNombre: { flex: 1, color: C.ciruela, fontSize: 13, paddingRight: 8 },
  pedidoItemPrecio: { color: C.texto, fontSize: 13, fontWeight: 'bold' },
  pedidoTotalFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  pedidoTotalLbl: { color: C.texto, fontSize: 15, fontWeight: 'bold' },
  pedidoTotalVal: { color: C.morado, fontSize: 20, fontWeight: 'bold' },
  verMas: { color: C.morado, fontSize: 13, fontWeight: 'bold', textAlign: 'right', marginTop: 8 },

  // seguimiento y cancelación
  tiempoFila: { flexDirection: 'row' },
  tiempoCol: { width: 24, alignItems: 'center' },
  punto: { width: 14, height: 14, borderRadius: 7, marginTop: 3 },
  puntoLinea: { width: 2, flex: 1, backgroundColor: C.claro, marginTop: 2 },
  tiempoEstado: { color: C.texto, fontSize: 15, fontWeight: 'bold' },
  btnCancelar: { borderWidth: 1.5, borderColor: C.rojo, borderRadius: 24, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  btnCancelarTxt: { color: C.rojo, fontWeight: 'bold', fontSize: 15 },
  confirmCaja: { backgroundColor: '#FBE0DF', borderRadius: 14, padding: 14, marginTop: 10 },
  confirmTxt: { color: '#8E2B25', fontSize: 14, fontWeight: 'bold' },
  confirmBotones: { flexDirection: 'row', marginTop: 10 },
  btnRojo: { backgroundColor: C.rojo, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
  btnGris: { backgroundColor: C.blanco, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10 },
  btnGrisTxt: { color: C.texto, fontWeight: 'bold', fontSize: 13 },

  // responsable
  invFila: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, padding: 12, marginBottom: 10, elevation: 2 },
  stockInv: { fontWeight: 'bold', fontSize: 14, marginTop: 2 },
  btnEditar: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8 },
  pedidoCaja: { backgroundColor: C.blanco, borderRadius: 14, padding: 14, marginTop: 10, elevation: 2 },
  catFila: { flexDirection: 'row', flexWrap: 'wrap' },

  // aviso emergente
  toast: { position: 'absolute', bottom: 78, alignSelf: 'center', backgroundColor: C.ciruela, borderRadius: 18, paddingHorizontal: 18, paddingVertical: 9 },
  toastTxt: { color: C.blanco, fontSize: 13 },

  // barra inferior
  nav: { flexDirection: 'row', backgroundColor: C.blanco, borderTopWidth: 1, borderTopColor: C.claro, paddingVertical: 6 },
  navItem: { flex: 1, alignItems: 'center' },
  navTxt: { fontSize: 11, color: C.gris },

  // menú de perfil
  menuFondo: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 40 },
  menuCaja: { position: 'absolute', top: (StatusBar.currentHeight || 0) + 66, right: 10, zIndex: 50, elevation: 10, backgroundColor: C.blanco, borderRadius: 14, paddingVertical: 6, minWidth: 240, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8 },
  menuCajaConfig: { right: 52, minWidth: 230 },
  menuTitulo: { color: C.gris, fontSize: 12, paddingHorizontal: 14, paddingVertical: 6 },
  menuItem: { paddingHorizontal: 14, paddingVertical: 12 },
  menuItemActivo: { backgroundColor: C.claro },
  menuItemTxt: { color: C.texto, fontSize: 15 },
});