/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
  */

// Material Dashboard 2 React layouts
import Icon from "@mui/material/Icon";
import Login from "layouts/Login/Login";
import Dashboard from "layouts/dashboard/dashboard";
import Menucatalogos from "layouts/Catalogos/menucatalogos/menucatalogos";
import Menureportes from "layouts/Reportes/menureportes/menureportes";
import Usuarios from "layouts/Catalogos/Usuarios/Usuarios";
import Menuactivos from "layouts/Activos/menuactivos/menuactivos";
import Menuconstatacion from "layouts/ConstatacionFisica/menuconstatacion/menuconstatacion";
import Marcas from "layouts/Catalogos/Marcas/Marcas";
import Estados from "layouts/Catalogos/Estados/Estados";
import Cuentas from "layouts/Catalogos/Cuentas/Cuentas";
import Sucursales from "layouts/Catalogos/Sucursales/Sucursales";
import Departamentos from "layouts/Catalogos/Departamentos/Departamentos";
import Custodios from "layouts/Catalogos/Custodios/Custodios";
import CentrosCosto from "layouts/Catalogos/CentrosCosto/CentrosCosto";
import ConsultaActivos from "layouts/Activos/ConsultaActivos/ConsultaActivos";
import CompraActivos from "layouts/Activos/CompraActivos/CompraActivos";
import UbicacionesFisicas from "layouts/Catalogos/UbicacionesFisicas/UbicacionesFisicas";
import TransferenciaActivos from "layouts/Activos/TransferenciaActivos/TransferenciaActivos";
import CambioEstados from "layouts/Activos/CambioEstados/CambioEstados";
import RealizarConstatacion from "layouts/ConstatacionFisica/RealizarConstatacion/RealizarConstatacion";
import Historial from "layouts/ConstatacionFisica/Historial/Historial";
import ReporteActivos from "layouts/Reportes/ReporteActivos/ReporteActivos";
import DepreciacionAnual from "layouts/Reportes/DepreciacionAnual/DepreciacionAnual";
import MantenimientosPendientes from "layouts/Reportes/MantenimientosPendientes/MantenimientosPendientes";
import GarantiasVencer from "layouts/Reportes/GarantiasVencer/GarantiasVencer";
import ActivosEliminados from "layouts/Reportes/ActivosEliminados/ActivosEliminados";

const routes = [
  /* MENUS PRINCIPALES */
  {
    type: "title",
    name: "Login",
    key: "Login",
    icon: <Icon fontSize="small">Login</Icon>,
    route: "/Login/Login",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Catalogos",
    key: "catalogos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/catalogos",
    component: <Menucatalogos />,
  },
  {
    type: "collapse",
    name: "Activos",
    key: "activos",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/activos",
    component: <Menuactivos />,
  },
  {
    type: "collapse",
    name: "Constatacion Fisica",
    key: "constatacion",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/constatacion",
    component: <Menuconstatacion />,
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/reportes",
    component: <Menureportes />,
  },
  /* CATALOGOS */
  {
    type: "title",
    name: "Usuarios",
    key: "usuarios",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/usuarios",
    component: <Usuarios />,
  },
  {
    type: "title",
    name: "Marcas",
    key: "marcas",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/marcas",
    component: <Marcas />,
  },
  {
    type: "title",
    name: "Estados",
    key: "estados",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/estados",
    component: <Estados />,
  },
  {
    type: "title",
    name: "Cuentas",
    key: "cuenttas",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/cuentas",
    component: <Cuentas />,
  },
  {
    type: "title",
    name: "Sucursales",
    key: "sucursales",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/sucursales",
    component: <Sucursales />,
  },
  {
    type: "title",
    name: "Departamentos",
    key: "departamentos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/departamentos",
    component: <Departamentos />,
  },
  {
    type: "title",
    name: "Custodios",
    key: "custodios",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/custodios",
    component: <Custodios />,
  },
  {
    type: "title",
    name: "Ubicaciones Fisicas",
    key: "ubicacionesfisicas",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/ubicacionesfisicas",
    component: <UbicacionesFisicas />,
  },
  {
    type: "title",
    name: "Centros de Costo",
    key: "centroscosto",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/centroscosto",
    component: <CentrosCosto />,
  },
  /* ACTIVOS */
  {
    type: "title",
    name: "Consulta de Activos",
    key: "consultaactivos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/activos/consultaactivos",
    component: <ConsultaActivos />,
  },
  {
    type: "title",
    name: "Compra de Activos",
    key: "compraactivos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/activos/compraactivos",
    component: <CompraActivos />,
  },
  {
    type: "title",
    name: "Transferencia de Activos",
    key: "transferenciaactivos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/activos/transferenciaactivos",
    component: <TransferenciaActivos />,
  },
  {
    type: "title",
    name: "Cambio de Estados",
    key: "cambioestados",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/activos/cambioestados",
    component: <CambioEstados />,
  },
  /* CONSTATACIONES FISICAS */
  {
    type: "title",
    name: "Realizar Constatacion",
    key: "realizarconstatacion",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/constatacion/realizarconstatacion",
    component: <RealizarConstatacion />,
  },
  {
    type: "title",
    name: "Historial",
    key: "historial",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/constatacion/historial",
    component: <Historial />,
  },
  /* REPORTES */
  {
    type: "title",
    name: "Reporte de Activos",
    key: "reporteactivos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/reporteactivos",
    component: <ReporteActivos />,
  },
  {
    type: "title",
    name: "Depreciacion Anual",
    key: "depreciacionanual",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/depreciacionanual",
    component: <DepreciacionAnual />,
  },
  {
    type: "title",
    name: "Mantenimientos",
    key: "mantenimientospendientes",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/mantenimientospendientes",
    component: <MantenimientosPendientes />,
  },
  {
    type: "title",
    name: "Garantias",
    key: "garantiasvencer",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/garantiasvencer",
    component: <GarantiasVencer />,
  },
  {
    type: "title",
    name: "Activos Eliminados",
    key: "activoseliminados",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/activoseliminados",
    component: <ActivosEliminados />,
  },
];

export default routes;
