// VERSION 1.0 WONDER BEAUTY SHOP
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ScrollView, StyleSheet, SafeAreaView, StatusBar, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

const CATEGORIAS = ['Maquillaje', 'Accesorios', 'Perfumes', 'Cuidados Piel'];

const PRODUCTOS_INICIALES = [
  { id: 'PROD-001', nombre: 'Brillo labial rosado matte', categoria: 'Maquillaje', precio: 55000, precioAnterior: 61000, oferta: true, stock: 12, vendidos: 320, icono: '💄', descripcion: 'Brillo color rosado salmón con toque neutral para chicas.' },
  { id: 'PROD-002', nombre: 'Base líquida cobertura media', categoria: 'Maquillaje', precio: 55000, stock: 8, vendidos: 150, icono: '🧴', descripcion: 'Base líquida de acabado natural para todo el día.' },
  { id: 'PROD-003', nombre: 'Set de brochas rosadas', categoria: 'Maquillaje', precio: 25000, stock: 15, vendidos: 90, icono: '🖌️', descripcion: 'Cinco brochas suaves con esponja para aplicar maquillaje.' },
  { id: 'PROD-004', nombre: 'Labial rojo intenso', categoria: 'Maquillaje', precio: 25000, stock: 20, vendidos: 210, icono: '💋', descripcion: 'Labial en barra color rojo de larga duración.' },

  { id: 'PROD-005', nombre: 'Espejo de mano floral', categoria: 'Accesorios', precio: 18000, stock: 0, vendidos: 40, icono: '🎀', descripcion: 'Espejo compacto con marco floral para llevar en el bolso.' },
  { id: 'PROD-006', nombre: 'Cosmetiquera lila', categoria: 'Accesorios', precio: 32000, stock: 10, vendidos: 75, icono: '👜', descripcion: 'Cosmetiquera impermeable con tres compartimentos amplios.' },
  { id: 'PROD-007', nombre: 'Set de scrunchies', categoria: 'Accesorios', precio: 15000, stock: 30, vendidos: 130, icono: '🎀', descripcion: 'Seis coletas de tela suaves en tonos pastel.' },
  { id: 'PROD-008', nombre: 'Diadema de flores', categoria: 'Accesorios', precio: 22000, stock: 14, vendidos: 60, icono: '🌼', descripcion: 'Diadema acolchada con flores para peinados y skincare.' },

  { id: 'PROD-009', nombre: 'Perfume Cielo Rosa 100 ml', categoria: 'Perfumes', precio: 200000, stock: 5, vendidos: 60, icono: '🌸', descripcion: 'Fragancia floral y dulce de larga duración.' },
  { id: 'PROD-010', nombre: 'Body splash vainilla', categoria: 'Perfumes', precio: 38000, precioAnterior: 42000, oferta: true, stock: 25, vendidos: 340, icono: '🍦', descripcion: 'Loción corporal perfumada con aroma suave a vainilla.' },
  { id: 'PROD-011', nombre: 'Perfume Brisa Fresca 50 ml', categoria: 'Perfumes', precio: 120000, stock: 7, vendidos: 30, icono: '🌿', descripcion: 'Aroma cítrico y fresco para usar todos los días.' },
  { id: 'PROD-012', nombre: 'Mini perfume de viaje', categoria: 'Perfumes', precio: 45000, stock: 18, vendidos: 85, icono: '✨', descripcion: 'Perfume de 15 ml en frasco pequeño, ideal para el bolso.' },

  { id: 'PROD-013', nombre: 'Crema hidratante facial', categoria: 'Cuidados Piel', precio: 45000, stock: 14, vendidos: 180, icono: '🧼', descripcion: 'Crema ligera con ácido hialurónico para todo tipo de piel.' },
  { id: 'PROD-014', nombre: 'Mascarilla de arcilla', categoria: 'Cuidados Piel', precio: 28000, stock: 3, vendidos: 95, icono: '🧴', descripcion: 'Mascarilla purificante para limpiar poros en diez minutos.' },
  { id: 'PROD-015', nombre: 'Desmaquillante bifásico', categoria: 'Cuidados Piel', precio: 35000, stock: 9, vendidos: 120, icono: '💧', descripcion: 'Retira maquillaje resistente al agua sin irritar la piel.' },
  { id: 'PROD-016', nombre: 'Protector solar facial', categoria: 'Cuidados Piel', precio: 52000, stock: 11, vendidos: 260, icono: '☀️', descripcion: 'Protector solar facial SPF 50 de textura ligera.' },
];

const ENVIO = 8000;
const ENVIO_GRATIS_DESDE = 150000;


const CLAVE_GUARDADO = 'wonderbeauty_datos';


const CUPON_CODIGO = 'BIENVENIDO10';
const CUPON_PORCENTAJE = 0.1;

const C = {
  fondo: '#F1E8F6', header: '#B79BCB', claro: '#E6DAEE', morado: '#8B64A3',
  ciruela: '#855869', texto: '#6A3F7E', blanco: '#FFFFFF', rojo: '#E0524D',
  verde: '#5CCB5F', gris: '#8A7A92',
};

const COP = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' COP';


const FORM_VACIO = { nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', descripcion: '', icono: '' };
const DATOS_VACIOS = { nombre: '', telefono: '', municipio: '', direccion: '' };
const NOMBRES_CAMPOS = { nombre: 'Nombre completo', telefono: 'Teléfono', municipio: 'Municipio', direccion: 'Dirección' };


const esEntero = (texto, min) => texto.trim() !== '' && Number.isInteger(Number(texto)) && Number(texto) >= min;


const promedioDe = (lista) => (lista.length === 0 ? 0 : lista.reduce((a, n) => a + n, 0) / lista.length);
const estrellas = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

const Vacio = ({ msg, btn, onPress }) => (
  <View style={s.vacio}>
    <Text style={s.vacioTxt}>{msg}</Text>
    <Pressable style={s.btn} onPress={onPress}><Text style={s.btnTxt}>{btn}</Text></Pressable>
  </View>
);

const Resumen = ({ subtotal, descuento = 0, envio, total }) => (
  <View style={s.resumenCaja}>
    <Text style={s.resumenFilaTxt}>Subtotal: {COP(subtotal)}</Text>
    {descuento > 0 && <Text style={s.descuentoTxt}>Descuento ({CUPON_CODIGO}): -{COP(descuento)}</Text>}
    <Text style={s.resumenFilaTxt}>Envío: {envio === 0 ? 'Gratis' : COP(envio)}</Text>
    <Text style={s.resumenTotal}>Total: {COP(total)}</Text>
  </View>
);

export default function App() {
  const [fontsLoaded] = useFonts({ Fredoka_700Bold,  });
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
  const [datos, setDatos] = useState(DATOS_VACIOS);
  const [aviso, setAviso] = useState('');


  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [errorCupon, setErrorCupon] = useState('');


  const [resenas, setResenas] = useState({});
  const [valorResena, setValorResena] = useState('');
  const [errorResena, setErrorResena] = useState('');

  
  const [cargado, setCargado] = useState(false);


  const [perfil, setPerfil] = useState('comprador');
  const [menuPerfil, setMenuPerfil] = useState(false);
  const esResp = perfil === 'responsable';


  const [form, setForm] = useState(FORM_VACIO);
  const [editId, setEditId] = useState(null);
  const [errorForm, setErrorForm] = useState('');


  useEffect(() => {
    const cargar = async () => {
      try {
        const texto = await AsyncStorage.getItem(CLAVE_GUARDADO);
        if (texto) {
          const guardado = JSON.parse(texto);

          
          const carritoOk = [];
          (Array.isArray(guardado.carrito) ? guardado.carrito : []).forEach((l) => {
            const prod = l && PRODUCTOS_INICIALES.find((p) => p.id === l.id);
            if (!prod || carritoOk.some((x) => x.id === prod.id)) return;
            const cant = Math.min(Math.floor(Number(l.cant)), prod.stock);
            if (cant >= 1) carritoOk.push({ id: prod.id, cant });
          });

          
          const favOk = (Array.isArray(guardado.favoritos) ? guardado.favoritos : [])
            .filter((id, i, lista) => PRODUCTOS_INICIALES.some((p) => p.id === id) && lista.indexOf(id) === i);

          setCarrito(carritoOk);
          setFavoritos(favOk);
        }
      } catch (e) {
      
      }
      setCargado(true);
    };
    cargar();
  }, []);


  useEffect(() => {
    if (!cargado) return;
    AsyncStorage.setItem(CLAVE_GUARDADO, JSON.stringify({ carrito, favoritos })).catch(() => {});
  }, [carrito, favoritos, cargado]);

  const avisar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(''), 2200);
  };


  const visibles = productos
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (categoria === 'Todas' || p.categoria === categoria))
    .sort((a, b) => (orden === 'asc' ? a.precio - b.precio : orden === 'desc' ? b.precio - a.precio : 0));


  const lineas = carrito.map((l) => ({ ...l, p: productos.find((x) => x.id === l.id) }));
  const cantTotal = carrito.reduce((a, l) => a + l.cant, 0);
  const subtotal = lineas.reduce((a, l) => a + l.cant * l.p.precio, 0);
  const descuento = cuponAplicado ? Math.round(subtotal * CUPON_PORCENTAJE) : 0;
  const envio = subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE ? 0 : ENVIO;
  const total = Math.max(0, subtotal - descuento + envio);

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
    if (!l) return;
    const nueva = l.cant + delta;
    if (nueva < 1) return quitar(id);

    if (delta > 0 && nueva > productos.find((x) => x.id === id).stock) return avisar('Stock insuficiente');
    setCarrito((prev) => prev.map((x) => (x.id === id ? { ...x, cant: nueva } : x)));
  };

  const toggleFavorito = (id) => {
    const esFav = favoritos.includes(id);
    setFavoritos(esFav ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
    avisar(esFav ? 'Quitado de favoritos' : 'Guardado en favoritos ♥');
  };


  const guardarResena = (id) => {
    const n = Number(valorResena);
    if (!esEntero(valorResena, 1) || n > 5) {
      return setErrorResena('La valoración debe ser un número entero entre 1 y 5.');
    }
    setResenas({ ...resenas, [id]: [...(resenas[id] || []), n] });
    setValorResena('');
    setErrorResena('');
    avisar('Reseña guardada ✓');
  };


  const aplicarCupon = () => {
    const codigo = cupon.trim().toUpperCase();
    if (carrito.length === 0) return setErrorCupon('Agrega productos al carrito antes de aplicar un cupón.');
    if (codigo === '') return setErrorCupon('Escribe un código de cupón.');
    if (codigo !== CUPON_CODIGO) return setErrorCupon('El cupón "' + codigo + '" no es válido. El total no cambió.');
    setCuponAplicado(true);
    setCupon('');
    setErrorCupon('');
    avisar('Cupón aplicado: 10% de descuento ✓');
  };

  const quitarCupon = () => {
    setCuponAplicado(false);
    setErrorCupon('');
    avisar('Cupón quitado');
  };

  const abrirDetalle = (id, desde) => {
    setSelId(id);
    setValorResena('');
    setErrorResena('');
    setOrigen(desde);
    setVista('detalle');
  };


  const continuar = () => {
    if (carrito.length === 0) return avisar('Tu carrito está vacío');
    const faltante = Object.keys(datos).find((k) => datos[k].trim() === '');
    if (faltante) return avisar('Completa el campo: ' + NOMBRES_CAMPOS[faltante]);
    setVista('resumen');
  };

  
  const simularStockBajo = () => {
    if (carrito.length === 0) return;
    const id = carrito[0].id;
    const cant = carrito[0].cant;
    setProductos(productos.map((p) => (p.id === id ? { ...p, stock: cant - 1 } : p)));
    avisar('Prueba: stock reducido');
  };

  const confirmar = () => {
    if (carrito.length === 0) return avisar('Tu carrito está vacío');

    const faltante = Object.keys(datos).find((k) => datos[k].trim() === '');
    if (faltante) return avisar('Completa el campo: ' + NOMBRES_CAMPOS[faltante]);

    const sinStock = lineas.find((l) => l.cant > l.p.stock);
    if (sinStock) return avisar('Sin stock suficiente de: ' + sinStock.p.nombre);

    const pedido = {
      codigo: 'WB-' + String(pedidos.length + 1).padStart(4, '0'),
      fecha: new Date().toLocaleString('es-CO'),
      items: lineas.map((l) => ({ nombre: l.p.nombre, cant: l.cant, precio: l.p.precio })),
      descuento, envio, total,
    };

    setProductos(productos.map((p) => {
      const l = carrito.find((c) => c.id === p.id);
      return l ? { ...p, stock: p.stock - l.cant } : p;
    }));
    setPedidos([pedido, ...pedidos]);
    setCarrito([]);
    setCuponAplicado(false);
    setCupon('');
    setErrorCupon('');
    setDatos(DATOS_VACIOS);
    setVista('historial');
    avisar('Pedido ' + pedido.codigo + ' confirmado (simulación, sin cobro real)');
  };

  //  PERFIL RESPONSABLE DE LA TIENDA
  const enCarrito = (id) => (carrito.find((l) => l.id === id) || { cant: 0 }).cant;

  const cambiarPerfil = (nuevo) => {
    setPerfil(nuevo);
    setMenuPerfil(false);
    setVista(nuevo === 'responsable' ? 'inventario' : 'catalogo');
    avisar(nuevo === 'responsable' ? 'Perfil: Responsable de la tienda' : 'Perfil: Comprador');
  };

  const limpiarForm = () => {
    setEditId(null);
    setForm(FORM_VACIO);
    setErrorForm('');
  };

  const abrirNuevo = () => {
    limpiarForm();
    setVista('producto');
  };

  const editarProducto = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre, categoria: p.categoria, precio: String(p.precio),
      stock: String(p.stock), descripcion: p.descripcion, icono: p.icono,
    });
    setErrorForm('');
    setVista('producto');
  };

  const guardarProducto = () => {
    const nombre = form.nombre.trim();
    const descripcion = form.descripcion.trim();

    if (nombre === '') return setErrorForm('El nombre no puede estar vacío.');
    if (!esEntero(form.precio, 1)) return setErrorForm('El precio debe ser un número entero mayor a 0.');
    if (!esEntero(form.stock, 0)) return setErrorForm('El stock debe ser un número entero igual o mayor a 0.');
    if (descripcion.length < 15) return setErrorForm('La descripción debe tener al menos 15 caracteres.');

    const producto = { nombre, categoria: form.categoria, precio: Number(form.precio), stock: Number(form.stock), descripcion };

    if (editId) {
      setProductos(productos.map((p) => (p.id === editId
        ? { ...p, ...producto, icono: form.icono.trim() || p.icono }
        : p)));
      avisar('Producto ' + editId + ' actualizado ✓');
    } else {
      const maxN = productos.reduce((m, p) => Math.max(m, parseInt(p.id.replace('PROD-', ''), 10) || 0), 0);
      const id = 'PROD-' + String(maxN + 1).padStart(3, '0');
      setProductos([...productos, { id, ...producto, vendidos: 0, icono: form.icono.trim() || '🛍️' }]);
      avisar('Producto ' + id + ' registrado ✓');
    }
    limpiarForm();
    setVista('inventario');
  };

  // ESTRUCTURA PAGINA DISEÑO
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
          <Pressable onPress={() => setVista('carrito')} style={s.iconoBtn}>
            <Text style={{ fontSize: 24 }}>🛒</Text>
            {cantTotal > 0 && <View style={s.badge}><Text style={s.badgeTxt}>{cantTotal}</Text></View>}
          </Pressable>
        )}
        <Pressable style={s.usuario} onPress={() => setMenuPerfil(!menuPerfil)}>
          <Text style={{ fontSize: 16 }}>{esResp ? '🏪' : '👤'}</Text>
        </Pressable>
      </View>
      {conBuscador && <Text style={s.bienvenido}>¡Bienvenido Usuario!</Text>}
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


  const grilla = (data, vacioNode) => (
    <FlatList
      key="grilla"
      data={data}
      numColumns={2}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => tarjeta(item)}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 14 }}
      contentContainerStyle={{ paddingBottom: 90 }}
      ListEmptyComponent={vacioNode}
    />
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
        <View style={s.ordenFila}>
          {[['asc', 'Menor a mayor'], ['desc', 'Mayor a menor']].map(([k, t]) => (
            <Pressable key={k} onPress={() => setOrden(orden === k ? 'ninguno' : k)} style={[s.chip, orden === k && s.chipActivo]}>
              <Text style={[s.chipTxt, orden === k && { color: C.blanco }]}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {grilla(visibles,
        <Vacio msg="No encontramos productos" btn="Ver todos" onPress={() => { setBusqueda(''); setCategoria('Todas'); }} />)}
    </View>
  );

  const vistaDetalle = () => {
    const p = productos.find((x) => x.id === selId);
    const esFav = favoritos.includes(p.id);
    const lista = resenas[p.id] || [];
    const prom = promedioDe(lista);
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
                <Text style={{ fontSize: 20 }}>{esFav ? '💜' : '🤍'}</Text>
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
              {errorResena !== '' && <Text style={s.errorTxt}>⚠ {errorResena}</Text>}
            </View>
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
        {lineas.length === 0 && <Vacio msg="Tu carrito está vacío" btn="Ir al catálogo" onPress={() => setVista('catalogo')} />}
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
            <Text style={s.lineaNombre}>Cupón promocional</Text>
            <View style={s.cuponFila}>
              <TextInput style={[s.input, { flex: 1 }]} value={cupon} placeholder="Código de cupón"
                autoCapitalize="characters"
                onChangeText={(t) => { setCupon(t); setErrorCupon(''); }} />
              <Pressable style={s.btnCupon} onPress={aplicarCupon}>
                <Text style={s.btnTxt}>Aplicar</Text>
              </Pressable>
            </View>
            {errorCupon !== '' && <Text style={s.errorTxt}>⚠ {errorCupon}</Text>}
            {cuponAplicado && (
              <View style={s.cuponFila}>
                <Text style={s.cuponOk}>✓ {CUPON_CODIGO} aplicado (10% de descuento)</Text>
                <Pressable onPress={quitarCupon}><Text style={s.eliminar}>Quitar</Text></Pressable>
              </View>
            )}
          </View>
        )}
        {lineas.length > 0 && <Resumen subtotal={subtotal} descuento={descuento} envio={envio} total={total} />}
      </ScrollView>
    </View>
  );

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
        <Pressable style={s.btnGrandeInline} onPress={continuar}>
          <Text style={s.btnGrandeTxt}>Continuar</Text>
        </Pressable>
        <Pressable onPress={() => setVista('carrito')}><Text style={s.link}>Volver al carrito</Text></Pressable>
      </ScrollView>
    </View>
  );

  // resumen antes de confirmar
  const vistaResumen = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.titulo}>Revisa tu pedido</Text>

        <View style={s.resumenCaja}>
          <Text style={s.lineaNombre}>Datos de entrega</Text>
          {Object.keys(NOMBRES_CAMPOS).map((k) => (
            <Text key={k} style={s.resumenFilaTxt}>{NOMBRES_CAMPOS[k]}: {datos[k]}</Text>
          ))}
        </View>

        <View style={s.resumenCaja}>
          <Text style={s.lineaNombre}>Productos</Text>
          {lineas.map((l) => (
            <Text key={l.id} style={s.resumenFilaTxt}>{l.cant} × {l.p.nombre} — {COP(l.cant * l.p.precio)}</Text>
          ))}
        </View>

        <Resumen subtotal={subtotal} descuento={descuento} envio={envio} total={total} />
        <Text style={s.nota}>Simulación académica: no se realiza ningún cobro real.</Text>

        <Pressable onPress={simularStockBajo}><Text style={s.link}>🧪 PRUEBA: simular stock insuficiente</Text></Pressable>

        <Pressable style={s.btnGrandeInline} onPress={confirmar}>
          <Text style={s.btnGrandeTxt}>Confirmar compra</Text>
        </Pressable>
        <Pressable onPress={() => setVista('checkout')}><Text style={s.link}>Editar mis datos</Text></Pressable>
      </ScrollView>
    </View>
  );

  const vistaFavoritos = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <Text style={[s.titulo, { padding: 16 }]}>Favoritos</Text>
      {grilla(productos.filter((p) => favoritos.includes(p.id)),
        <Vacio msg="Aún no tienes favoritos" btn="Volver al catálogo" onPress={() => setVista('catalogo')} />)}
    </View>
  );

  const vistaHistorial = () => (
    <View style={{ flex: 1 }}>
      {encabezado(false)}
      <Text style={[s.titulo, { padding: 16 }]}>Historial</Text>
      <FlatList
        key="lista-historial"
        data={pedidos}
        keyExtractor={(p) => p.codigo}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        ListEmptyComponent={<Vacio msg="No hay pedidos registrados" btn="Ir al catálogo" onPress={() => setVista('catalogo')} />}
        renderItem={({ item }) => (
          <View style={s.pedidoCaja}>
            <Text style={s.lineaNombre}>{item.codigo}</Text>
            <Text style={s.nota}>{item.fecha}</Text>
            {item.items.map((i, idx) => (
              <Text key={idx} style={s.resumenFilaTxt}>{i.cant} × {i.nombre} — {COP(i.precio)} c/u</Text>
            ))}
            {item.descuento > 0 && <Text style={s.descuentoTxt}>Descuento: -{COP(item.descuento)}</Text>}
            <Text style={s.nota}>Envío: {item.envio === 0 ? 'Gratis' : COP(item.envio)}</Text>
            <Text style={s.lineaPrecio}>Total: {COP(item.total)}</Text>
          </View>
        )}
      />
    </View>
  );


  // VISTAS DEL RESPONSABLE DE LA TIENDA 

 
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
              </View>
            </View>
          }
          renderItem={({ item: p }) => {
            const reservado = enCarrito(p.id);
            return (
              <View style={s.invFila}>
                <View style={s.lineaImg}><Text style={{ fontSize: 30 }}>{p.icono}</Text></View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={s.lineaNombre} numberOfLines={2}>{p.nombre}</Text>
                  <Text style={s.nota}>{p.id} · {p.categoria} · {COP(p.precio)}</Text>
                  <Text style={[s.stockInv, { color: p.stock === 0 ? C.rojo : C.texto }]}>
                    Stock: {p.stock}{p.stock === 0 ? ' (agotado)' : ''}
                  </Text>
                  {reservado > 0 && <Text style={s.nota}>En carrito: {reservado} u (aún no descontado)</Text>}
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


  const vistaVentas = () => {
    const vendido = pedidos.reduce((a, p) => a + p.total, 0);
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
                <Text style={s.resumenFilaTxt}>Pedidos confirmados: {pedidos.length}</Text>
                <Text style={s.resumenTotal}>Total vendido: {COP(vendido)}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={<Vacio msg="Aún no hay ventas registradas" btn="Ver inventario" onPress={() => setVista('inventario')} />}
          renderItem={({ item }) => (
            <View style={s.pedidoCaja}>
              <Text style={s.lineaNombre}>{item.codigo}</Text>
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


  const campo = (label, clave, placeholder, multiline = false) => (
    <>
      <Text style={s.label}>{label}</Text>
      <TextInput style={[s.input, multiline && { height: 80, textAlignVertical: 'top' }]} multiline={multiline}
        value={form[clave]} placeholder={placeholder}
        onChangeText={(t) => setForm({ ...form, [clave]: t })} />
    </>
  );

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

        {errorForm !== '' && <Text style={s.errorTxt}>⚠ {errorForm}</Text>}

        <Pressable style={s.btnGrandeInline} onPress={guardarProducto}>
          <Text style={s.btnGrandeTxt}>{editId ? 'Guardar cambios' : 'Registrar producto'}</Text>
        </Pressable>
        {editId && (
          <Pressable onPress={abrirNuevo}><Text style={s.link}>Cancelar edición</Text></Pressable>
        )}
      </ScrollView>
    </View>
  );

  const vistas = {
    catalogo: vistaCatalogo, detalle: vistaDetalle, carrito: vistaCarrito,
    checkout: vistaCheckout, resumen: vistaResumen, favoritos: vistaFavoritos, historial: vistaHistorial,
    inventario: vistaInventario, ventas: vistaVentas, producto: vistaProducto,
  };
  const activa = { detalle: origen, checkout: 'carrito', resumen: 'carrito' }[vista] || vista;
  const navComprador = [['catalogo', '🏠', 'Catálogo'], ['favoritos', '💜', 'Favoritos'], ['carrito', '🛒', 'Carrito'], ['historial', '🧾', 'Historial']];
  const navResp = [['inventario', '📦', 'Inventario'], ['ventas', '🧾', 'Ventas'], ['producto', '➕', 'Producto']];
  const nav = esResp ? navResp : navComprador;

  // HU20: mientras se leen los datos guardados no se muestra la tienda
  if (!cargado) {
    return (
      <SafeAreaView style={s.raiz}>
        <Text style={[s.vacioTxt, { marginTop: 80 }]}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.raiz}>
      <StatusBar barStyle="dark-content" backgroundColor={C.header} />
      {/* key = perfil + vista: al cambiar de perfil o de vista se crea todo de nuevo y no se mezclan las FlatList */}
      <View key={perfil + vista} style={{ flex: 1 }}>{(vistas[vista] || vistaCatalogo)()}</View>
      {aviso !== '' && <View style={s.toast}><Text style={s.toastTxt}>{aviso}</Text></View>}
      <View style={s.nav}>
        {nav.map(([k, ic, t]) => (
          <Pressable key={k} style={s.navItem} onPress={() => (k === 'producto' ? abrirNuevo() : setVista(k))}>
            <Text style={{ fontSize: 22 }}>{ic}</Text>
            <Text style={[s.navTxt, activa === k && { color: C.morado, fontWeight: 'bold' }]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {menuPerfil && (
        <>
          <Pressable style={s.menuFondo} onPress={() => setMenuPerfil(false)} />
          <View style={s.menuCaja}>
            <Text style={s.menuTitulo}>Cambiar perfil</Text>
            {[['comprador', '🛍️', 'Comprador'], ['responsable', '🏪', 'Responsable de la tienda']].map(([k, ic, t]) => (
              <Pressable key={k} style={[s.menuItem, perfil === k && s.menuItemActivo]} onPress={() => cambiarPerfil(k)}>
                <Text style={s.menuItemTxt}>{ic} {t}{perfil === k ? '  ✓' : ''}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

//estilos pagina
const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: C.fondo, paddingTop: StatusBar.currentHeight || 0 },
  header: { backgroundColor: C.header, paddingHorizontal: 12, paddingTop: 20, paddingBottom: 8 },
  headerFila: { flexDirection: 'row', alignItems: 'center' },
  headerTitulo: { flex: 1, color: C.blanco, fontSize: 20, fontFamily: 'Fredoka_700Bold', marginLeft: 10 },
  logoImg: { width: 100, height: 110, resizeMode: 'contain', marginVertical: -5, marginLeft: 0, marginRight: 0 },
  buscador: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, marginHorizontal: 10, paddingHorizontal: 8, height: 34 },
  buscadorInput: { flex: 1, paddingVertical: 0, paddingHorizontal: 6, fontSize: 13 },
  iconoBtn: { marginRight: 8 },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: C.rojo, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeTxt: { color: C.blanco, fontSize: 11,  },
  usuario: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  bienvenido: { alignSelf: 'center', marginTop: 8, color: C.blanco, fontSize: 23, fontFamily: 'Fredoka_700Bold', paddingHorizontal: 22, paddingVertical: 2,
  backgroundColor: C.header, textShadowColor: '#000', textShadowRadius: 2 },
  tabs: { flexDirection: 'row', backgroundColor: C.claro, paddingHorizontal: 6 },
  tab: { paddingVertical: 8, paddingHorizontal: 8 },
  tabActiva: { borderBottomWidth: 3, borderBottomColor: C.morado },
  tabTxt: { color: C.texto, fontSize: 12, fontFamily: 'Fredoka_700Bold' },
  tituloFila: { paddingHorizontal: 16, paddingTop: 10, },
  titulo: { color: C.morado, fontSize: 30, fontFamily: 'Fredoka_700Bold' },
  ordenFila: { flexDirection: 'row', marginVertical: 8 },
  chip: { borderWidth: 1, borderColor: C.morado, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  chipActivo: { backgroundColor: C.morado },
  chipTxt: { color: C.morado, fontSize: 12, fontFamily: 'Fredoka_700Bold' },
  tarjeta: { width: '48%', backgroundColor: C.blanco, borderRadius: 18, padding: 10, marginBottom: 14, elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6 },
  tarjetaImg: { height: 100, borderRadius: 12, backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  tarjetaNombre: { color: C.ciruela, fontSize: 12, marginTop: 6, minHeight: 32, fontFamily: 'Fredoka_700Bold' },
  tarjetaPrecio: { color: C.ciruela, fontSize: 12, fontFamily: 'Fredoka_700Bold' },
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
  btnGrande: { position: 'absolute', bottom: 8, left: 16, right: 16, backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  btnGrandeInline: { backgroundColor: C.morado, borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  btnGrandeTxt: { color: C.blanco, fontWeight: 'bold', fontSize: 16 },
  headerCarrito: { backgroundColor: C.header, padding: 14 },
  carritoTitulo: { color: C.blanco, fontSize: 22, fontWeight: 'bold', textShadowColor: '#000', textShadowRadius: 2 },
  resumenFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 },
  totalGrande: { color: C.blanco, fontSize: 28, fontWeight: 'bold' },
  btnContinuar: { backgroundColor: C.morado, borderRadius: 16, paddingHorizontal: 18, paddingVertical: 8 },
  btnContinuarTxt: { color: C.blanco, fontWeight: 'bold' },
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

  // Reseñas
  resenaCaja: { backgroundColor: C.blanco, borderRadius: 16, padding: 14, marginTop: 10, elevation: 3 },
  promedioTxt: { color: C.morado, fontSize: 22, fontWeight: 'bold', marginTop: 4 },

  // Cupón promocional
  cuponFila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  btnCupon: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, marginLeft: 8 },
  cuponOk: { color: '#2E9E47', fontWeight: 'bold', fontSize: 13, flex: 1 },
  descuentoTxt: { color: '#2E9E47', fontSize: 14, fontWeight: 'bold', marginBottom: 3 },

  // Menú de perfil
  menuFondo: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 40 },
  menuCaja: { position: 'absolute', top: (StatusBar.currentHeight || 0) + 66, right: 10, zIndex: 50, elevation: 10, backgroundColor: C.blanco, borderRadius: 14, paddingVertical: 6, minWidth: 240, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8 },
  menuTitulo: { color: C.gris, fontSize: 12, paddingHorizontal: 14, paddingVertical: 6 },
  menuItem: { paddingHorizontal: 14, paddingVertical: 12 },
  menuItemActivo: { backgroundColor: C.claro },
  menuItemTxt: { color: C.texto, fontSize: 15 },

  // Responsable de la tienda
  invFila: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.blanco, borderRadius: 14, padding: 12, marginBottom: 10, elevation: 2 },
  stockInv: { fontWeight: 'bold', fontSize: 14, marginTop: 2 },
  btnEditar: { backgroundColor: C.morado, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8 },
  catFila: { flexDirection: 'row', flexWrap: 'wrap' },
  errorTxt: { color: C.rojo, fontSize: 14, fontWeight: 'bold', marginTop: 12 },
});