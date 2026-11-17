import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, Pressable, ScrollView, Image,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';


const CATEGORIAS = ['Maquillaje', 'Accesorios', 'Perfumes', 'Cuidados Piel'];

const PRODUCTOS_INICIALES = [
  
  { id: 'PROD-001', nombre: 'Brillo labial rosado matte', categoria: 'Maquillaje', precio: 55000, precioAnterior: 61000, oferta: true, stock: 12, vendidos: 320, icono: '💄', descripcion: 'Brillo color rosado salmón con toque neutral para chicas.', valoraciones: [5, 4, 5] },
  { id: 'PROD-002', nombre: 'Base líquida cobertura media', categoria: 'Maquillaje', precio: 55000, stock: 8, vendidos: 150, icono: '🧴', descripcion: 'Base líquida de acabado natural para todo el día.', valoraciones: [4, 4] },
  { id: 'PROD-003', nombre: 'Set de brochas rosadas', categoria: 'Maquillaje', precio: 25000, stock: 15, vendidos: 90, icono: '🖌️', descripcion: 'Cinco brochas suaves con esponja para aplicar maquillaje.', valoraciones: [5] },
  { id: 'PROD-004', nombre: 'Labial rojo intenso', categoria: 'Maquillaje', precio: 25000, stock: 20, vendidos: 210, icono: '💋', descripcion: 'Labial en barra color rojo de larga duración.', valoraciones: [] },

  
  { id: 'PROD-005', nombre: 'Espejo de mano floral', categoria: 'Accesorios', precio: 18000, stock: 0, vendidos: 40, icono: '🪞', descripcion: 'Espejo compacto con marco floral para llevar en el bolso.', valoraciones: [] },
  { id: 'PROD-006', nombre: 'Cosmetiquera lila', categoria: 'Accesorios', precio: 32000, stock: 10, vendidos: 75, icono: '👜', descripcion: 'Cosmetiquera impermeable con tres compartimentos amplios.', valoraciones: [4, 5, 5] },
  { id: 'PROD-007', nombre: 'Set de scrunchies', categoria: 'Accesorios', precio: 15000, stock: 30, vendidos: 130, icono: '🎀', descripcion: 'Seis coletas de tela suaves en tonos pastel.', valoraciones: [5, 4] },
  { id: 'PROD-008', nombre: 'Diadema de flores', categoria: 'Accesorios', precio: 22000, stock: 14, vendidos: 60, icono: '🌼', descripcion: 'Diadema acolchada con flores para peinados y skincare.', valoraciones: [] },

  
  { id: 'PROD-009', nombre: 'Perfume Cielo Rosa 100 ml', categoria: 'Perfumes', precio: 200000, stock: 5, vendidos: 60, icono: '🌸', descripcion: 'Fragancia floral y dulce de larga duración.', valoraciones: [5, 5] },
  { id: 'PROD-010', nombre: 'Body splash vainilla', categoria: 'Perfumes', precio: 38000, precioAnterior: 42000, oferta: true, stock: 25, vendidos: 340, icono: '🍦', descripcion: 'Loción corporal perfumada con aroma suave a vainilla.', valoraciones: [4] },
  { id: 'PROD-011', nombre: 'Perfume Brisa Fresca 50 ml', categoria: 'Perfumes', precio: 120000, stock: 7, vendidos: 30, icono: '🌿', descripcion: 'Aroma cítrico y fresco para usar todos los días.', valoraciones: [] },
  { id: 'PROD-012', nombre: 'Mini perfume de viaje', categoria: 'Perfumes', precio: 45000, stock: 18, vendidos: 85, icono: '✨', descripcion: 'Perfume de 15 ml en frasco pequeño, ideal para el bolso.', valoraciones: [4, 5] },

  
  { id: 'PROD-013', nombre: 'Crema hidratante facial', categoria: 'Cuidados Piel', precio: 45000, stock: 14, vendidos: 180, icono: '🧼', descripcion: 'Crema ligera con ácido hialurónico para todo tipo de piel.', valoraciones: [5, 4] },
  { id: 'PROD-014', nombre: 'Mascarilla de arcilla', categoria: 'Cuidados Piel', precio: 28000, stock: 3, vendidos: 95, icono: '🫧', descripcion: 'Mascarilla purificante para limpiar poros en diez minutos.', valoraciones: [4] },
  { id: 'PROD-015', nombre: 'Desmaquillante bifásico', categoria: 'Cuidados Piel', precio: 35000, stock: 9, vendidos: 120, icono: '💧', descripcion: 'Retira maquillaje resistente al agua sin irritar la piel.', valoraciones: [] },
  { id: 'PROD-016', nombre: 'Protector solar facial', categoria: 'Cuidados Piel', precio: 52000, stock: 11, vendidos: 260, icono: '☀️', descripcion: 'Protector solar facial SPF 50 de textura ligera.', valoraciones: [5, 5, 4] },
];

const CUPON_VALIDO = 'BIENVENIDO10';
const ENVIO = 8000;
const ENVIO_GRATIS_DESDE = 150000;


const C = {
  fondo: '#F1E8F6', header: '#B79BCB', claro: '#E6DAEE', morado: '#8B64A3',
  ciruela: '#855869', texto: '#6A3F7E', blanco: '#FFFFFF', rojo: '#E0524D',
  verde: '#5CCB5F', gris: '#8A7A92',
};

const COP = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const promedio = (v) => (v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : null);


export default function App() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [vista, setVista] = useState('catalogo');
  const [origen, setOrigen] = useState('catalogo');
  const [selId, setSelId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Maquillaje');
  const [orden, setOrden] = useState('ninguno');
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [datos, setDatos] = useState({ nombre: '', telefono: '', municipio: '', direccion: '' });
  const [aviso, setAviso] = useState('');

  const avisar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(''), 2200);
  };

  
  const visibles = useMemo(() => {
    let lista = productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (categoria === 'Todas' || p.categoria === categoria));
    if (orden === 'asc') lista = [...lista].sort((a, b) => a.precio - b.precio);
    if (orden === 'desc') lista = [...lista].sort((a, b) => b.precio - a.precio);
    return lista;
  }, [productos, busqueda, categoria, orden]);

  
  const lineas = carrito.map((l) => ({ ...l, p: productos.find((x) => x.id === l.id) }));
  const cantTotal = carrito.reduce((a, l) => a + l.cant, 0);
  const subtotal = lineas.reduce((a, l) => a + l.cant * l.p.precio, 0);
  const envio = subtotal === 0 ? 0 : subtotal >= ENVIO_GRATIS_DESDE ? 0 : ENVIO;
  const total = subtotal + envio;

  const agregar = (id) => {
    const p = productos.find((x) => x.id === id);
    if (p.stock === 0) return avisar('Producto agotado');
    const linea = carrito.find((l) => l.id === id);
    if ((linea ? linea.cant : 0) >= p.stock) return avisar('No hay más unidades disponibles');
    setCarrito(linea
      ? carrito.map((l) => (l.id === id ? { ...l, cant: l.cant + 1 } : l))
      : [...carrito, { id, cant: 1 }]);
    avisar('Agregado al carrito ✓');
  };

  const quitar = (id) => {
    setCarrito(carrito.filter((l) => l.id !== id));
    avisar('Producto eliminado');
  };

  const cambiarCant = (id, delta) => {
    const l = carrito.find((x) => x.id === id);
    const p = productos.find((x) => x.id === id);
    const nueva = l.cant + delta;
    if (nueva < 1) return quitar(id);
    if (nueva > p.stock) return avisar('Stock insuficiente');
    setCarrito(carrito.map((x) => (x.id === id ? { ...x, cant: nueva } : x)));
  };

  const toggleFavorito = (id) => {
    const esFav = favoritos.includes(id);
    setFavoritos(esFav ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
    avisar(esFav ? 'Quitado de favoritos' : 'Guardado en favoritos ♥');
  };

  const abrirDetalle = (id, desde) => {
    setSelId(id);
    setOrigen(desde);
    setVista('detalle');
  };

  const confirmar = () => {
    const vacio = Object.keys(datos).find((k) => datos[k].trim() === '');
    if (vacio) return avisar('Completa el campo: ' + vacio);
    const pedido = {
      codigo: 'WB-' + String(pedidos.length + 1).padStart(4, '0'),
      fecha: new Date().toLocaleString('es-CO'),
      items: lineas.map((l) => ({ nombre: l.p.nombre, cant: l.cant, precio: l.p.precio })),
      envio, total,
    };
    
    setProductos(productos.map((p) => {
      const l = carrito.find((c) => c.id === p.id);
      return l ? { ...p, stock: p.stock - l.cant } : p;
    }));
    setPedidos([pedido, ...pedidos]);
    setCarrito([]);
    setVista('historial');
    avisar('Pedido ' + pedido.codigo + 'realizado');
  };

  // ESTRUCTURA PAGINA DISEÑO
  const encabezado = (conBuscador) => (
    <View style={s.header}>
      <View style={s.headerFila}>
        <Image source={require('./assets/logo.png')} style={s.logo} />
        {conBuscador ? (
          <View style={s.buscador}>
            <Text>🔍</Text>
            <TextInput style={s.buscadorInput} placeholder="Buscar productos"
              value={busqueda} onChangeText={setBusqueda} />
            {busqueda !== '' && <Pressable onPress={() => setBusqueda('')}><Text>✕</Text></Pressable>}
          </View>
        ) : (
          <Text style={s.headerTitulo}>WonderBeautyShop</Text>
        )}
        <Pressable onPress={() => setVista('carrito')} style={s.iconoBtn}>
          <Text style={{ fontSize: 24 }}>🛒</Text>
          {cantTotal > 0 && <View style={s.badge}><Text style={s.badgeTxt}>{cantTotal}</Text></View>}
        </Pressable>
        <View style={s.usuario}><Text style={{ fontSize: 16 }}>👤</Text></View>
      </View>
      {conBuscador && <Text style={s.bienvenido}>¡Bienvenido Usuario!</Text>}
    </View>
  );

  const vacio = (msg, btnTxt, accion) => (
    <View style={s.vacio}>
      <Text style={s.vacioTxt}>{msg}</Text>
      <Pressable style={s.btn} onPress={accion}><Text style={s.btnTxt}>{btnTxt}</Text></Pressable>
    </View>
  );

  const tarjeta = (p) => (
    <Pressable key={p.id} style={s.tarjeta} onPress={() => abrirDetalle(p.id, vista)}>
      {p.oferta && <View style={s.oferta}><Text style={s.ofertaTxt}>10% OFF</Text></View>}
      <View style={s.tarjetaImg}><Text style={{ fontSize: 54 }}>{p.icono}</Text></View>
      <Text style={s.tarjetaNombre} numberOfLines={2}>{p.nombre}</Text>
      <Text style={s.tarjetaPrecio}>Precio: {COP(p.precio)}</Text>
      <Text style={[s.stockTxt, { color: p.stock === 0 ? C.rojo : C.gris }]}>
        {p.categoria} · {p.stock === 0 ? 'Agotado' : 'Disponible'}
      </Text>
      <View style={s.tarjetaFila}>
        <Pressable style={[s.btnComprar, p.stock === 0 && { opacity: 0.4 }]} onPress={() => agregar(p.id)}>
          <Text style={s.btnTxt}>Comprar</Text>
        </Pressable>
        <Pressable onPress={() => agregar(p.id)}><Text style={{ fontSize: 24 }}>🛒</Text></Pressable>
      </View>
    </Pressable>
  );

  
  const vistaCatalogo = () => (
    <View style={{ flex: 1 }}>
      {encabezado(true)}
      <View style={s.tabs}>
        {['Todas', ...CATEGORIAS].map((c) => (
          <Pressable key={c} onPress={() => setCategoria(c)} style={[s.tab, categoria === c && s.tabActiva]}>
            <Text style={[s.tabTxt, categoria === c && { fontWeight: 'bold' }]}>{c}</Text>
          </Pressable>
        ))}
      </View>
      <View style={s.tituloFila}>
        <Text style={s.titulo}>{categoria}</Text>
      <br></br><br></br>
      </View>
      <FlatList
        data={visibles}
        numColumns={2}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => tarjeta(item)}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 14 }}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={vacio('No encontramos productos', 'Ver todos', () => { setBusqueda(''); setCategoria('Todas'); })}
      />
    </View>
  );

  const vistaDetalle = () => {
    const p = productos.find((x) => x.id === selId);
    const prom = promedio(p.valoraciones);
    return (
      <View style={{ flex: 1, backgroundColor: C.blanco }}>
        <View style={s.detalleBarra}>
          <Pressable onPress={() => setVista(origen)}><Text style={s.volver}>⬅</Text></Pressable>
          <Text style={s.detalleTitulo}>Detalle</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={s.detalleImg}><Text style={{ fontSize: 120 }}>{p.icono}</Text></View>
          <View style={s.detalleInfo}>
            <View style={s.detalleFila}>
              {p.vendidos > 300 ? <View style={s.masVendido}><Text style={s.masVendidoTxt}>MÁS VENDIDO</Text></View> : <View />}
              <Pressable style={s.corazon} onPress={() => toggleFavorito(p.id)}>
              </Pressable>
            </View>
            <Text style={s.detalleNombre}>{p.nombre}</Text>
            <Text style={s.detalleDesc}>{p.descripcion}</Text>
            <Text style={s.detalleCat}>Categoría: {p.categoria}</Text>
            <View style={s.precioFila}>
              <Text style={s.detallePrecio}>{COP(p.precio)}</Text>
              {p.oferta && <View style={s.ofertaCaja}><Text style={s.ofertaCajaTxt}>10% OFF</Text></View>}
            </View>
            {p.oferta && <Text style={s.tachado}>{COP(p.precioAnterior)}</Text>}
            <Text style={[s.stockDetalle, { color: p.stock === 0 ? C.rojo : C.verde }]}>
              {p.stock === 0 ? 'AGOTADO' : 'Stock disponible: ' + p.stock}
            </Text>
            <Text style={s.medios}>Medios de pago (simulados)</Text>
            <View style={s.mediosFila}>
              <View style={s.medioCaja}><Text style={s.medioTxt}>VISA · Mastercard · PayPal</Text></View>
              <View style={s.medioCaja}><Text style={s.medioTxt}>Nequi · Bancolombia</Text></View>
            </View>
          </View>
        </ScrollView>
        <Pressable style={[s.btnGrande, p.stock === 0 && { opacity: 0.4 }]} onPress={() => agregar(p.id)}>
          <Text style={s.btnGrandeTxt}>{p.stock === 0 ? 'Agotado' : 'Agregar al carrito'}</Text>
        </Pressable>
      </View>
    );
  };

  const vistaCarrito = () => (
    <View style={{ flex: 1 }}>
      <View style={s.headerCarrito}>
        <Text style={s.carritoTitulo}>Carrito de Compras ({cantTotal})</Text>
        <View style={s.resumenFila}>
          <Text style={s.totalGrande}>{COP(total)}</Text>
          <Pressable style={[s.btnContinuar, carrito.length === 0 && { opacity: 0.4 }]}
            onPress={() => (carrito.length ? setVista('checkout') : avisar('Tu carrito está vacío'))}>
            <Text style={s.btnContinuarTxt}>Continuar ({cantTotal})</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {lineas.length === 0 && vacio('Tu carrito está vacío', 'Ir al catálogo', () => setVista('catalogo'))}
        {lineas.map((l) => (
          <View key={l.id} style={s.lineaCarrito}>
            <View style={s.lineaFila}>
              <View style={s.lineaImg}><Text style={{ fontSize: 34 }}>{l.p.icono}</Text></View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={s.lineaNombre} numberOfLines={2}>{l.p.nombre}</Text>
                <View style={s.cantFila}>
                  <Pressable style={s.cantBtn} onPress={() => cambiarCant(l.id, -1)}><Text style={s.cantBtnTxt}>−</Text></Pressable>
                  <View style={s.cantCaja}><Text style={s.cantTxt}>{l.cant} u</Text></View>
                  <Pressable style={s.cantBtn} onPress={() => cambiarCant(l.id, 1)}><Text style={s.cantBtnTxt}>+</Text></Pressable>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.lineaPrecio}>{COP(l.p.precio * l.cant)}</Text>
                <Pressable onPress={() => quitar(l.id)}><Text style={s.eliminar}>Eliminar</Text></Pressable>
              </View>
            </View>
            <View style={s.envioFila}>
              <Text style={s.envioTxt}>Envío</Text>
              <View style={[s.envioBarra, { backgroundColor: envio === 0 ? C.verde : C.rojo }]} />
              <Text style={s.envioTxt}>{envio === 0 ? 'Gratis' : COP(ENVIO_GRATIS_DESDE - subtotal)}</Text>
            </View>
          </View>
        ))}
        {lineas.length > 0 && (
          <View style={s.resumenCaja}>
            <Text style={s.resumenFilaTxt}>Subtotal: {COP(subtotal)}</Text>
            <Text style={s.resumenFilaTxt}>Envío: {envio === 0 ? 'Gratis' : COP(envio)}</Text>
            <Text style={s.resumenTotal}>Total: {COP(total)}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  const vistaCheckout = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.titulo}>Tus datos</Text>
        {[['nombre', 'Nombre completo'], ['telefono', 'Teléfono'], ['municipio', 'Municipio'], ['direccion', 'Dirección']].map(([k, label]) => (
          <View key={k}>
            <Text style={s.label}>{label}</Text>
            <TextInput style={s.input} value={datos[k]} placeholder={label}
              onChangeText={(t) => setDatos({ ...datos, [k]: t })} />
          </View>
        ))}
        <View style={s.resumenCaja}>
          <Text style={s.resumenFilaTxt}>Subtotal: {COP(subtotal)}</Text>
          <Text style={s.resumenFilaTxt}>Envío: {envio === 0 ? 'Gratis' : COP(envio)}</Text>
          <Text style={s.resumenTotal}>Total: {COP(total)}</Text>
        </View>
        <Pressable style={s.btnGrandeInline} onPress={confirmar}>
          <Text style={s.btnGrandeTxt}>Confirmar compra</Text>
        </Pressable>
        <Pressable onPress={() => setVista('carrito')}><Text style={s.link}>Volver al carrito</Text></Pressable>
      </ScrollView>
    </View>
  );

  const vistaFavoritos = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <Text style={[s.titulo, { padding: 16 }]}>Favoritos</Text>
      <FlatList
        data={productos.filter((p) => favoritos.includes(p.id))}
        numColumns={2}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => tarjeta(item)}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 14 }}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={vacio('Aún no tienes favoritos', 'Volver al catálogo', () => setVista('catalogo'))}
      />
    </View>
  );

  const vistaHistorial = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <Text style={[s.titulo, { padding: 16 }]}>Historial</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(p) => p.codigo}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        ListEmptyComponent={vacio('No hay pedidos registrados', 'Ir al catálogo', () => setVista('catalogo'))}
        renderItem={({ item }) => (
          <View style={s.pedidoCaja}>
            <Text style={s.lineaNombre}>{item.codigo}</Text>
            <Text style={s.nota}>{item.fecha}</Text>
            {item.items.map((i, idx) => (
              <Text key={idx} style={s.resumenFilaTxt}>{i.cant} × {i.nombre} — {COP(i.cant * i.precio)}</Text>
            ))}
            <Text style={s.nota}>Envío: {item.envio === 0 ? 'Gratis' : COP(item.envio)}</Text>
            <Text style={s.lineaPrecio}>Total: {COP(item.total)}</Text>
          </View>
        )}
      />
    </View>
  );


  const activa = { catalogo: 'catalogo', detalle: origen, carrito: 'carrito', checkout: 'carrito', favoritos: 'favoritos', historial: 'historial' }[vista];
  const nav = [['catalogo', '🏠', 'Catálogo'], ['favoritos', '💜', 'Favoritos'], ['carrito', '🛒', 'Carrito'], ['historial', '🧾', 'Historial']];

  return (
    <SafeAreaView style={s.raiz}>
      <StatusBar barStyle="dark-content" backgroundColor={C.header} />
      <View style={{ flex: 1 }}>
        {vista === 'catalogo' && vistaCatalogo()}
        {vista === 'detalle' && vistaDetalle()}
        {vista === 'carrito' && vistaCarrito()}
        {vista === 'checkout' && vistaCheckout()}
        {vista === 'favoritos' && vistaFavoritos()}
        {vista === 'historial' && vistaHistorial()}
      </View>
      {aviso !== '' && <View style={s.toast}><Text style={s.toastTxt}>{aviso}</Text></View>}
      <View style={s.nav}>
        {nav.map(([k, ic, t]) => (
          <Pressable key={k} style={s.navItem} onPress={() => setVista(k)}>
            <Text style={{ fontSize: 22 }}>{ic}</Text>
            <Text style={[s.navTxt, activa === k && { color: C.morado, fontWeight: 'bold' }]}>{t}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}


//estilos pagina
const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: 
  C.fondo, paddingTop: StatusBar.currentHeight || 0 },
  header: { backgroundColor: C.header, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8 },
  headerFila: { flexDirection: 'row', alignItems: 'center' },
  headerTitulo: { flex: 1, color: C.blanco, fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  logo: { width: 70, height: 70, resizeMode: 'contain' },
  buscador: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, marginHorizontal: 10, paddingHorizontal: 8, height: 34 },
  buscadorInput: { flex: 1, paddingVertical: 0, paddingHorizontal: 6, fontSize: 13 },
  iconoBtn: { marginRight: 8 },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: C.rojo, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeTxt: { color: C.blanco, fontSize: 11, fontWeight: 'bold' },
  usuario: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  bienvenido: { alignSelf: 'center', marginTop: 8, color: C.blanco, fontSize: 20, fontWeight: 'bold', borderWidth: 2, borderColor: '#7C4DFF', paddingHorizontal: 22, paddingVertical: 2, backgroundColor: C.header, textShadowColor: '#000', textShadowRadius: 2 },
  tabs: { flexDirection: 'row', backgroundColor: C.claro, paddingHorizontal: 6 },
  tab: { paddingVertical: 8, paddingHorizontal: 8 },
  tabActiva: { borderBottomWidth: 3, borderBottomColor: C.morado },
  tabTxt: { color: C.texto, fontSize: 12 },
  tituloFila: { paddingHorizontal: 16, paddingTop: 10 },
  titulo: { color: C.morado, fontSize: 30, fontWeight: 'bold' },
  ordenFila: { flexDirection: 'row', marginVertical: 8 },
  chip: { borderWidth: 1, borderColor: C.morado, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  chipActivo: { backgroundColor: C.morado },
  chipTxt: { color: C.morado, fontSize: 12 },
  tarjeta: { width: '48%', backgroundColor: C.blanco, borderRadius: 18, padding: 10, marginBottom: 14, elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6 },
  tarjetaImg: { height: 100, borderRadius: 12, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  tarjetaNombre: { color: C.ciruela, fontSize: 12, marginTop: 6, minHeight: 32 },
  tarjetaPrecio: { color: C.ciruela, fontSize: 12, fontWeight: 'bold' },
  stockTxt: { fontSize: 11, marginBottom: 4 },
  tarjetaFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  oferta: { position: 'absolute', top: 6, right: -4, zIndex: 2, backgroundColor: C.claro, borderWidth: 1, borderColor: C.ciruela, paddingHorizontal: 6, transform: [{ rotate: '12deg' }] },
  ofertaTxt: { fontSize: 10, color: C.ciruela },
  btnComprar: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 6 },
  btn: { backgroundColor: C.morado, borderRadius: 18, paddingHorizontal: 22, paddingVertical: 10, marginTop: 12 },
  btnTxt: { color: C.blanco, fontWeight: 'bold', fontSize: 13 },
  vacio: { alignItems: 'center', justifyContent: 'center', padding: 30 },
  vacioTxt: { color: C.texto, fontSize: 16, textAlign: 'center', marginTop: 6 },
  detalleBarra: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  volver: { fontSize: 26, color: C.morado },
  detalleTitulo: { color: C.morado, fontSize: 18, fontWeight: 'bold', marginLeft: 14 },
  detalleImg: { height: 260, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  detalleInfo: { padding: 16, backgroundColor: '#F6EEFA' },
  detalleFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  masVendido: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 6, paddingVertical: 1 },
  masVendidoTxt: { fontSize: 10, color: '#000' },
  corazon: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  detalleNombre: { color: C.morado, fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  detalleSub: { color: C.gris, fontSize: 13, marginVertical: 3 },
  detalleDesc: { color: C.ciruela, fontSize: 13 },
  detalleCat: { color: C.gris, fontSize: 12, marginTop: 4 },
  precioFila: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  detallePrecio: { color: C.morado, fontSize: 36, fontWeight: 'bold' },
  ofertaCaja: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 8, marginLeft: 12 },
  ofertaCajaTxt: { fontSize: 12 },
  tachado: { color: C.gris, textDecorationLine: 'line-through', fontSize: 12 },
  tachadoClaro: { color: C.claro, textDecorationLine: 'line-through', fontSize: 12 },
  stockDetalle: { fontWeight: 'bold', marginVertical: 6 },
  medios: { color: C.ciruela, fontSize: 13, marginVertical: 6 },
  mediosFila: { flexDirection: 'row', justifyContent: 'space-between' },
  medioCaja: { width: '48%', backgroundColor: C.blanco, borderRadius: 14, padding: 14, elevation: 3 },
  medioTxt: { fontSize: 11, color: C.texto, textAlign: 'center' },
  btnGrande: { position: 'absolute', bottom: 8, left: 16, right: 16, backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  btnGrandeInline: { backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  btnGrandeTxt: { color: C.blanco, fontWeight: 'bold', fontSize: 16 },
  headerCarrito: { backgroundColor: C.header, padding: 14 },
  carritoTitulo: { color: C.blanco, fontSize: 22, fontWeight: 'bold', textShadowColor: '#000', textShadowRadius: 2 },
  resumenFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 },
  totalGrande: { color: C.blanco, fontSize: 28, fontWeight: 'bold' },
  btnContinuar: { backgroundColor: C.morado, borderRadius: 16, paddingHorizontal: 18, paddingVertical: 8 },
  btnContinuarTxt: { color: C.blanco, fontWeight: 'bold' },
  cuponFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 6 },
  cuponInput: { color: C.blanco, fontSize: 12, borderBottomWidth: 1, borderBottomColor: C.claro, minWidth: 140, paddingVertical: 0 },
  cuponBtn: { color: C.blanco, fontWeight: 'bold', marginLeft: 10, fontSize: 12 },
  lineaCarrito: { backgroundColor: C.blanco, borderRadius: 18, padding: 12, marginBottom: 12, elevation: 4 },
  lineaFila: { flexDirection: 'row', alignItems: 'center' },
  lineaImg: { width: 64, height: 64, borderRadius: 10, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  lineaNombre: { color: C.ciruela, fontSize: 13, fontWeight: 'bold' },
  lineaPrecio: { color: C.morado, fontSize: 20, fontWeight: 'bold' },
  cantFila: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  cantBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  cantBtnTxt: { color: C.morado, fontSize: 18, fontWeight: 'bold' },
  cantCaja: { borderWidth: 1, borderColor: C.ciruela, backgroundColor: C.claro, paddingHorizontal: 12, marginHorizontal: 6 },
  cantTxt: { color: C.ciruela, fontSize: 12 },
  eliminar: { color: C.rojo, fontSize: 12, marginTop: 4 },
  envioFila: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  envioTxt: { fontSize: 11, color: C.ciruela },
  envioBarra: { flex: 1, height: 3, borderRadius: 2, marginHorizontal: 8 },
  resumenCaja: { backgroundColor: C.blanco, borderRadius: 16, padding: 14, marginTop: 8, elevation: 3 },
  resumenFilaTxt: { color: C.ciruela, fontSize: 14, marginBottom: 3 },
  resumenTotal: { color: C.morado, fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  nota: { color: C.gris, fontSize: 12, marginTop: 4 },
  label: { color: C.ciruela, marginTop: 10, marginBottom: 3, fontSize: 13 },
  input: { backgroundColor: C.blanco, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: C.claro },
  link: { color: C.morado, textAlign: 'center', marginTop: 14, fontWeight: 'bold' },
  pedidoCaja: { backgroundColor: C.blanco, borderRadius: 14, padding: 14, marginTop: 10, elevation: 2 },
  toast: { position: 'absolute', bottom: 78, alignSelf: 'center', backgroundColor: C.ciruela, borderRadius: 18, paddingHorizontal: 18, paddingVertical: 9 },
  toastTxt: { color: C.blanco, fontSize: 13 },
  nav: { flexDirection: 'row', backgroundColor: C.blanco, borderTopWidth: 1, borderTopColor: C.claro, paddingVertical: 6 },
  navItem: { flex: 1, alignItems: 'center' },
  navTxt: { fontSize: 11, color: C.gris },
});