/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Codigo = ({ cod }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {cod}
      </MDTypography>
    </MDBox>
  );

  const Emp = ({ nombre, dpi }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {nombre}
        </MDTypography>
        <MDTypography variant="caption">{dpi}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Info = ({ telefono, direction }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {telefono}
      </MDTypography>
      <MDTypography variant="caption">{direction}</MDTypography>
    </MDBox>
  );

  const Puesto = ({ puesto }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {puesto}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "codigoEmpleado", accessor: "codigoEmpleado", align: "left" },
      { Header: "empleado", accessor: "empleado", align: "left" },
      { Header: "contacto", accessor: "contacto", align: "left" },
      { Header: "puesto", accessor: "puesto", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Axel Estrada" dpi="3421 34598 2121" />,
        contacto: <Info telefono="2365-8907" direction="Ciudad" />,
        puesto: <Puesto puesto="Analista" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Carlos Morales" dpi="2345 78654 0101" />,
        contacto: <Info telefono="3489-3256" direction="Ciudad" />,
        puesto: <Puesto puesto="Facturador" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Gustavo Herrera" dpi="2134 43567 2323" />,
        contacto: <Info telefono="2145-3456" direction="Ciudad" />,
        puesto: <Puesto puesto="Administrador" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Wesley Morales" dpi="6754 12890 6767" />,
        contacto: <Info telefono="2345-6590" direction="Ciudad" />,
        puesto: <Puesto puesto="Bases de Datos" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Leonel Najarro" dpi="2365 65789 1212" />,
        contacto: <Info telefono="3456-8790" direction="Ciudad" />,
        puesto: <Puesto puesto="Desarrollador" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigoEmpleado: <Codigo cod="001" />,
        empleado: <Emp nombre="Daniela Valle" dpi="4367 32567 1010" />,
        contacto: <Info telefono="3498-0923" direction="Ciudad" />,
        puesto: <Puesto puesto="Contador" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
