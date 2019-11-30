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

let idVigente = 6;

local.vendedoras.forEach(vendedora => {
  const nuevaVendedora = `<option value="${vendedora}">${vendedora}</option>`;
  document.getElementById("vendedora").innerHTML += nuevaVendedora;
});

local.precios.forEach(componente => {
  const nuevoComponente = `<option value="${componente.componente}">${componente.componente}</option>`;
  document.getElementById("componentes").innerHTML += nuevoComponente;
});

local.sucursales.forEach(sucursal => {
  const nuevaSucusal = `<option value="${sucursal}">${sucursal}</option>`;
  document.getElementById("sucursal").innerHTML += nuevaSucusal;
});

function crearVentaHTML(venta) {
  const ventaHTML = `
    <tr id="venta${venta.id}">
    <td>${venta.fecha.getDate()}/${venta.fecha.getMonth() +
    1}/${venta.fecha.getFullYear()}</td>
    <td>${venta.nombreVendedora}</td>
    <td>${venta.sucursal}</td>
    <td>${venta.componentes}</td>
    <td>${precioMaquina(venta.componentes)}</td>
    <td><a href="#" onclick="borrarVenta(${venta.id})">Borrar</a></td>
  </tr>
      `;
  return ventaHTML;
}

function obtenerPrecioDelComponente(nombreComponente) {
  const componente = local.precios.find(function(p) {
    return p.componente === nombreComponente;
  });
  return componente.precio;
}

function precioMaquina(componentes) {
  let total = 0;

  componentes.forEach(c => (total += obtenerPrecioDelComponente(c)));

  return total;
}

///SEGUNDO PUNTO

const cantidadVentasComponente = componenteUnitario => {
  return local.ventas
    .map(venta => venta.componentes)
    .flat()
    .filter(componentesVendido => componentesVendido === componenteUnitario)
    .length;
};

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
  let totalVentasMes = 0;
  local.ventas.forEach(venta => {
    // chequear que la venta es del mes y anio que llega por parámetro
    if (
      venta.fecha.getFullYear() === anio &&
      venta.fecha.getMonth() + 1 === mes
    )
      totalVentasMes += precioMaquina(venta.componentes);
  });
  return totalVentasMes;
};

const ventasVendedora = nombre => {
  let total = 0;

  local.ventas.forEach(venta => {
    if (venta.nombreVendedora === nombre) {
      total += precioMaquina(venta.componentes);
    }
  });

  return total;
};

const componenteMasVendido = () => {
  let elMaximo = "";
  let elMontoMaximo = -1;

  local.precios.forEach(c => {
    if (elMontoMaximo < cantidadVentasComponente(c)) {
      elMontoMaximo = cantidadVentasComponente(c);
      elMaximo = c.componente;
    }
  });
  return elMaximo;
};

const huboVentas = (mes, anio) => {
  vendidos = ventasMes(mes, anio);
  if (vendidos === 0) {
    return false;
  } else {
    return true;
  }
};

const ventasSucursal = sucursal => {
  let total = 0;

  local.ventas.forEach(venta => {
    if (venta.sucursal === sucursal) {
      total += precioMaquina(venta.componentes);
    }
  });

  return total;
};

const crearVentaSucusal = sucursal => {
  const ventaSucursal = `
    <tr>
    <td>${sucursal}</td>
    <td>${ventasSucursal(sucursal)}</td>
    
  </tr>
      `;
  return ventaSucursal;
};

const mayorVendedora = () => {
  let laMayor = "";
  let elMontoMaximo = -1;

  local.vendedoras.forEach(vendedora => {
    if (elMontoMaximo < ventasVendedora(vendedora)) {
      elMontoMaximo = ventasVendedora(vendedora);
      laMayor = vendedora;
    }
  });
  return laMayor;
};

const cargarDOM = () => {
  const ventasHTML = local.ventas.map(crearVentaHTML);
  const ventasSucursales = local.sucursales.map(crearVentaSucusal);

  const tablaVentas = document.getElementById("ventas");
  const tablaSucursales = document.getElementById("sucursales");

  tablaVentas.innerHTML = ventasHTML.join(""); //devuelve un string;
  tablaSucursales.innerHTML = ventasSucursales.join("");

  document.getElementById(
    "productoMasVendido"
  ).innerHTML = componenteMasVendido();

  document.getElementById("mayorVendedora").innerHTML = mayorVendedora();
};

cargarDOM();

const ingresarVenta = () => {
  const venta = {};

  venta.id = idVigente;
  venta.fecha = new Date();
  venta.nombreVendedora = document.getElementById("vendedora").value;
  venta.componentes = Array.from(
    document.getElementById("componentes").selectedOptions
  ).map(option => option.value);
  venta.sucursal = document.getElementById("sucursal").value;

  local.ventas.push(venta);

  idVigente++;

  cargarDOM();
  $("#modalNuevaVenta").modal("toggle");
};

const borrarVenta = id => {
  local.ventas.forEach(venta => {
    if (venta.id === id) {
      document.getElementById(`venta${id}`).remove();
      local.ventas.splice(venta, i);
    }
  });
};

const sucursalDelMes = (mes, anio) => {
  let maxImporte = 0;
  let maxNombreSucursal = "";
  local.sucursales.forEach(sucursal => {
    let totalVendido = 0;
    const ventasFiltradas = local.ventas.filter(venta => {
      return (
        venta.sucursal === sucursal &&
        venta.fecha.getFullYear() === anio &&
        venta.fecha.getMonth() + 1 === mes
      );
    });
    ventasFiltradas.forEach(venta => {
      const importe = precioMaquina(venta.componentes);
      totalVendido += importe;
    });
    if (totalVendido > maxImporte) {
      maxImporte = totalVendido;
      maxNombreSucursal = sucursal;
    }
  });

  return maxNombreSucursal;
};
