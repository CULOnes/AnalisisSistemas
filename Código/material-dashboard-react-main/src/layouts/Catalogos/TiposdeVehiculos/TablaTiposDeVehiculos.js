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
  const Codigo = ({ id }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Tipo = ({ nombre }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {nombre}
      </MDTypography>
    </MDBox>
  );

  const Capacidad = ({ peso }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {peso}
      </MDTypography>
    </MDBox>
  );

  const Tonelaje = ({ ton }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {ton}
      </MDTypography>
    </MDBox>
  );

  const Marca = ({ marca }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {marca}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "codigo", accessor: "codigo", align: "left" },
      { Header: "tipoVehiculo", accessor: "tipoVehiculo", align: "left" },
      { Header: "capacidad", accessor: "capacidad", align: "left" },
      { Header: "tonelaje", accessor: "tonelaje", align: "center" },
      { Header: "marca", accessor: "marca", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        codigo: <Codigo id="100" />,
        tipoVehiculo: <Tipo nombre="Camion 12t Capacidad 240qq" />,
        capacidad: <Capacidad peso="240qq" />,
        tonelaje: <Tonelaje ton="12t" />,
        marca: <Marca marca="Hino" />,
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
