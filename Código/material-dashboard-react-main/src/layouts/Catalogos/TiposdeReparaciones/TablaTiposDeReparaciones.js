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

export default function data() {
  const Numero = ({ id }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Nombre = ({ nombreRep }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {nombreRep}
      </MDTypography>
    </MDBox>
  );

  const Costo = ({ costo }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {costo}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "idReparacion", accessor: "idReparacion", align: "left" },
      { Header: "NombreReparacion", accessor: "NombreReparacion", align: "left" },
      { Header: "Costo", accessor: "Costo", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        idReparacion: <Numero id="001" />,
        NombreReparacion: <Nombre nombreRep="Cambio de Llantas" />,
        Costo: <Costo costo="1,000.00" />,
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
