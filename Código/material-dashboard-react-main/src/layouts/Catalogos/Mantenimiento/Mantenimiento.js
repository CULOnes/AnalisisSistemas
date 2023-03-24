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
import TablaMantenimiento from "layouts/Catalogos/Mantenimiento/TablaMantenimiento";

function Mantenimiento() {
  const { columns, rows } = TablaMantenimiento();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Nombre del vehiculo:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Ingresar vehiculo" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Fecha de mantenimiento:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="date" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Tipo de mantenimiento:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Ingresar tipo" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Kilometraje del vehiculo:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="ingresar kilometraje" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Estado del Mantenimiento</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="ingresar estado" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Descripcion:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="textarea" label="ingresar descripcion" fullWidth />
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

export default Mantenimiento;
