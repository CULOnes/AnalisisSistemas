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
import Login from "layouts/Login/Login";
import Dashboard from "layouts/dashboard/dashboard";
import Menucatalogos from "layouts/Catalogos/menucatalogos/menucatalogos";
import Menureportes from "layouts/Reportes/menureportes/menureportes";
import Clientes from "layouts/Catalogos/Clientes/Clientes";
import Inspecciones from "layouts/Catalogos/Inspecciones/Inspecciones";
import Seguros from "layouts/Catalogos/Seguros/Seguros";
import Usuarios from "layouts/Catalogos/Usuarios/Usuarios";
import Combustibles from "layouts/Catalogos/Combustibles/Combustibles";
import RInspecciones from "layouts/Reportes/Inspecciones/Inspecciones";
import Empleados from "layouts/Catalogos/Empleados/Empleados";
import TiposSeguros from "layouts/Catalogos/TiposSeguros/TiposSeguros";
import Mantenimiento from "layouts/Catalogos/Mantenimiento/Mantenimiento";
import Vehiculos from "layouts/Catalogos/Vehiculos/Vehiculos";
import REntradas from "layouts/Reportes/Entradas/Entradas";
import TipoReparaciones from "layouts/Catalogos/TiposdeReparaciones/TipoReparaciones";
import TipoVehiculos from "layouts/Catalogos/TiposdeVehiculos/TipoVehiculos";
import RMantenimientos from "layouts/Reportes/mantenimiento/Mantenimientos";
import RSalidas from "layouts/Reportes/salidas/Salidas";
import Asignaciones from "layouts/Asignacion/Asignacion";
import REmpleados from "layouts/Reportes/empleados/Empleados";

// @mui icons
import Icon from "@mui/material/Icon";
import RepVehiculos from "layouts/Reportes/Vehiculos/ReporteVehiculos";

const routes = [
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
    name: "Asignaciones",
    key: "operaciones",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/operaciones",
    component: <Asignaciones />,
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/reportes",
    component: <Menureportes />,
  },
  {
    type: "title",
    name: "Clientes",
    key: "clientes",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/clientes",
    component: <Clientes />,
  },
  {
    type: "title",
    name: "Empleados",
    key: "empleados",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/empleados",
    component: <Empleados />,
  },
  {
    type: "title",
    name: "Combustibles",
    key: "combustibles",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/combustibles",
    component: <Combustibles />,
  },
  {
    type: "title",
    name: "Inspecciones",
    key: "inspecciones",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/inspecciones",
    component: <Inspecciones />,
  },
  {
    type: "title",
    name: "Mantenimiento",
    key: "mantenimiento",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/mantenimiento",
    component: <Mantenimiento />,
  },
  {
    type: "title",
    name: "Seguros",
    key: "seguros",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/seguros",
    component: <Seguros />,
  },
  {
    type: "title",
    name: "TiposSeguros",
    key: "tiposSeguros",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/tiposseguros",
    component: <TiposSeguros />,
  },
  {
    type: "title",
    name: "TipoReparaciones",
    key: "tiporeparaciones",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/tiporeparaciones",
    component: <TipoReparaciones />,
  },
  {
    type: "title",
    name: "TipoVehiculos",
    key: "tipovehiculos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/tipovehiculos",
    component: <TipoVehiculos />,
  },
  {
    type: "title",
    name: "Vehiculos",
    key: "vehiculos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/catalogos/vehiculos",
    component: <Vehiculos />,
  },
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
    name: "REntradas",
    key: "rentradas",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/rentradas",
    component: <REntradas />,
  },
  {
    type: "title",
    name: "RInspecciones",
    key: "rinspecciones",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/rinspecciones",
    component: <RInspecciones />,
  },
  {
    type: "title",
    name: "RMantenimientos",
    key: "rmantenimientos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/rmantenimientos",
    component: <RMantenimientos />,
  },
  {
    type: "title",
    name: "RSalidas",
    key: "rsalidas",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/rsalidas",
    component: <RSalidas />,
  },
  {
    type: "title",
    name: "REmpleados",
    key: "rempleados",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/rempleados",
    component: <REmpleados />,
  },
  {
    type: "title",
    name: "RepVehiculos",
    key: "repvehiculos",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/reportes/repvehiculos",
    component: <RepVehiculos />,
  },
];

export default routes;
