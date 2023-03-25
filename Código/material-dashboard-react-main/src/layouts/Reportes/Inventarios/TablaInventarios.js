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
  const Author = ({ name, Herramienta }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{Herramienta}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ ubi1, ubi2 }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {ubi1}
      </MDTypography>
      <MDTypography variant="caption">{ubi2}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nombre", accessor: "Nombre", align: "left" },
      { Header: "Ubicacion", accessor: "Ubicacion", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        Nombre: <Author name="Gato Hidráulico" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 1 Estanteria 2" ubi2="" />,
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
        Nombre: <Author name="Llave de tuercas" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 2 Estanteria 1" ubi2="" />,
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
        Nombre: <Author name="Juego de alicates" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 2 estanteria 2" ubi2="" />,
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
        Nombre: <Author name="Llave inglesa" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 2 estanteria 3" ubi2="" />,
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
        Nombre: <Author name="Juego de destornilladores" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 1 estanteria 2" ubi2="" />,
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
        Nombre: <Author name="Medidor de presión" Herramienta="10" />,
        Ubicacion: <Job ubi1="Bodega 1 estanteria 3" ubi2="" />,
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
