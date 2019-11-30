var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    {
      id: 1,
      fecha: new Date(2019, 1, 4),
      nombreVendedora: "Grace",
      sucursal: "Centro",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]
    },
    {
      id: 2,
      fecha: new Date(2019, 0, 1),
      nombreVendedora: "Ada",
      sucursal: "Centro",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]
    },
    {
      id: 3,
      fecha: new Date(2019, 0, 2),
      nombreVendedora: "Grace",
      sucursal: "Caballito",
      componentes: ["Monitor ASC 543", "Motherboard MZI"]
    },
    {
      id: 4,
      fecha: new Date(2019, 0, 10),
      nombreVendedora: "Ada",
      sucursal: "Centro",
      componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"]
    },
    {
      id: 5,
      fecha: new Date(2019, 0, 12),
      nombreVendedora: "Grace",
      sucursal: "Caballito",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"]
    }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ],

  sucursales: ["Centro", "Caballito"]
};

//**********************************************/
// FORMA 1 DE HACERLO  - FORMA IMPERATIVA, le digo a JS todo paso a pasito, diciendole todos los pasos
// for (let i = 0; i < local.ventas.length; i++) {
//     const venta = local.ventas[i]; //por prolijidad y sirve para usar los metodos despues.

//     const ventaHTML = `
// <li class="venta">
//     <div class="fecha">${venta.fecha.getDate()}/${venta.fecha.getMonth() + 1}/${venta.fecha.getFullYear()}</div>
//     <div>${venta.sucursal}</div>
//     <div>${venta.nombreVendedora}</div>
//     <div>${venta.componentes}</div>
//     </li>
// `;

//     const ul = document.getElementById('ventas');

//     ul.innerHTML += ventaHTML;
// }

//FORMA 2 DE HACERLO - FORMA DECLARATIVA, le digo el qué, no el como.
// función que recibe un objeto que representa una venta, y retorna un string con el HTML
function crearVentaHTML(venta) {
  const ventaHTML = `
  <tr>
  <td>${venta.fecha.getDate()}/${venta.fecha.getMonth() +
    1}/${venta.fecha.getFullYear()}</td>
  <td>${venta.nombreVendedora}</td>
  <td>${venta.sucursal}</td>
  <td>${venta.componentes}</td>
  <td>${precioMaquina(venta.componentes)}</td>
  <td>boton</td>
</tr>
    `;
  return ventaHTML;
}

function obtenerPrecioDelComponente(nombreComponente) {
  function obtenerPrecioDelComponente(nombreComponente) {
    // busco el componente X
    // for (let i = 0; i < local.precios.length; i++) {
    //   if (local.precios[i].componente === nombreComponente) {
    //     return local.precios[i].precio;
    //   }
    // }
    const componente = local.precios.find(function(p) {
      return p.componente === nombreComponente;
    });
    return componente.precio;
  }
  //predicado = funcion qe devuelve true or false
}

function precioMaquina(componentes) {
  let total = 0;

  // solución imperativa
  // for (let j = 0; j < componentes.length; j++) {
  //   total += obtenerPrecioDelComponente( componentes[j] );
  // }

  // solución declarativa
  componentes.forEach(c => (total += obtenerPrecioDelComponente(c)));

  return total;
}

///SEGUNDO PUNTO

const cantidadVentasComponente = componenteUnitario => {
  // let total = 0;
  // const componentesVendidos = local.ventas
  return (
    local.ventas
      .map(venta => venta.componentes)
      .flat() //agarra el array de arrays y lo convierte en arrays
      // .forEach(componentesVendido => {
      //     if (componentesVendido === componenteUnitario) {
      //         total++;
      //     }
      // })
      .filter(componentesVendido => componentesVendido === componenteUnitario)
      .length //siempre usar === para asegurarme que devuelva correcto.
  );
  //return total;
};

// separar ventas por mes
// separar ventas por vendedora
// sumar las ventas de cada vendedora

// 1) relevo de todas las vendedoras (suma del importe de ventas)
//   - leer la lista de las vendedoras y ver cual es la que tiene mas ventas
// 2) primero buscar las ventas del mes, y despues sumar/separar por vendedoras
//   - me quedo con las ventas del mes y anio
//   - leer la lista de vendedoras
//   - usar una funcion que me diga total de venta por mes/anio y vendedora

const vendedoraDelMes = (mes, anio) => {
  let maxImporte = 0;
  let maxNombreVendedora = "";
  // recorrer listado de vendedoras
  for (let i = 0; i < local.vendedoras.length; i++) {
    const vendedora = local.vendedoras[i];
    let totalVendido = 0;
    // ver cuanto vendió cada una
    // filtro las ventas por vendedora
    const ventasFiltradas = local.ventas.filter(venta => {
      return (
        venta.nombreVendedora === vendedora &&
        venta.fecha.getFullYear() === anio &&
        venta.fecha.getMonth() + 1 === mes
      );
    });
    for (let j = 0; j < ventasFiltradas.length; j++) {
      const venta = ventasFiltradas[j];
      const importe = precioMaquina(venta.componentes);
      totalVendido += importe;
    }
    // totalVendido va tener todo lo que vendió X vendedora
    if (totalVendido > maxImporte) {
      maxImporte = totalVendido;
      maxNombreVendedora = vendedora;
    }
  } // aca termina el for de las vendedoras

  return maxNombreVendedora;
};

const ventasMes = (mes, anio) => {
  // forEach local.ventas
  let total = 0;

  local.ventas.forEach(venta => {
    // checkear si la venta es del mes y anio que llegan por param
    if (
      venta.fecha.getFullYear() === anio &&
      venta.fecha.getMonth() + 1 === mes
    ) {
      total += precioMaquina(venta.componentes);
    }
  });

  // local.ventas
  //   .filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes)
  //   .forEach(venta => total += precioMaquina(venta.componentes));

  return total;
};

console.log(vendedoraDelMes(1, 2019));
console.log(ventasMes(1, 2019)); // 1250

const ventasVendedora = nombre => {
  let total = 0;

  local.ventas.forEach(venta => {
    if (venta.nombreVendedora === nombre) {
      total += precioMaquina(venta.componentes);
    }
  });

  // local.ventas
  //   .filter(venta => venta.nombreVendedora === nombre)
  //   .forEach(venta => total += precioMaquina(venta.componentes))

  // return local.ventas
  //   .filter(venta => venta.nombreVendedora === nombre)
  //   .reduce((total, venta) => total + precioMaquina(venta.componentes), 0)

  return total;
};

const ventasHTML = local.ventas.map(crearVentaHTML);

const ul = document.getElementById("ventas");

ul.innerHTML = ventasHTML.join(""); //devuelve un string;
