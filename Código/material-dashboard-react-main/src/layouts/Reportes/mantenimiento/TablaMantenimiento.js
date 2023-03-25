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
  const Fecha = ({ fecha1, fecha2 }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {fecha1}
        </MDTypography>
        <MDTypography variant="caption">{fecha2}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Vehiculo = ({ marca, placa }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDBox>
        <MDTypography variant="caption">{marca}</MDTypography>
      </MDBox>
      <MDTypography variant="caption">{placa}</MDTypography>
    </MDBox>
  );

  const Mant = ({ mant }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDBox>
        <MDTypography variant="caption">{mant}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "fechas", accessor: "fechas", align: "left" },
      { Header: "vehiculo", accessor: "vehiculo", align: "left" },
      { Header: "mantenimiento", accessor: "mantenimiento", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Fecha fecha1="24/04/2021" fecha2="30/06/2021" />,
        vehiculo: <Vehiculo marca="Sedan" placa="C-094JKL" />,
        mantenimiento: <Mant mant="Servicio Menor" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
