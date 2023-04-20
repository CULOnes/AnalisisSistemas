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
import axios from "axios";

/* DESCOMENTAR ACA */

// async function get() {
//   const respuesta = await axios.get("https://localhost:7235/api/Usuarios/usuarios");
//   console.log(respuesta.data);
//   return respuesta.data;
// }

/* DESCOMENTAR ACA */
export default /* async */ function data() {
  /* DESCOMENTAR ACA */
  // const myarray = await get();

  /* COMENTAR ACA */
  const respuesta = /* await */ axios.get("https://localhost:7235/api/Usuarios/usuarios");
  /* COMENTAR ACA */
  console.log(respuesta.data);
  const Author = ({ name, email }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ user }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {user}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nombre", accessor: "nombre", align: "left" },
      { Header: "usuario", accessor: "usuario", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        nombre: <Author name="John Michael" email="john@creative-tim.com" />,
        usuario: <Job user="JohnM1" />,
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
        nombre: <Author name="Alexa Liras" email="alexa@creative-tim.com" />,
        usuario: <Job user="AlexaL2" />,
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
        nombre: <Author name="Laurent Perrier" email="laurent@creative-tim.com" />,
        usuario: <Job user="LaurentP3" />,
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
        nombre: <Author name="Michael Levi" email="michael@creative-tim.com" />,
        usuario: <Job user="MichaelL4" />,
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
        nombre: <Author name="Richard Gran" email="richard@creative-tim.com" />,
        usuario: <Job user="RichardG5" />,
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
        nombre: <Author name="Miriam Eric" email="miriam@creative-tim.com" />,
        usuario: <Job user="MiriamE6" />,
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
