// import PropTypes from 'prop-types'
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import TablaEmpleados from "layouts/Catalogos/Empleados/TablaEmpleados";

function Empleados() {
  const { columns, rows } = TablaEmpleados();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Nombre:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Nombre" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Apellido:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Apellido" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Direccion:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Direccion" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Telefono/Celular:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="Telefono/Celular" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">DPI:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="DPI" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Edad:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="Edad" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Fecha de Nacimiento:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="date" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Puesto:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Puesto" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDButton variant="gradient" color="info" fullWidth>
                Crear
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Empleados;
