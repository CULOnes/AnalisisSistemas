import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
import TablaInventarios from "layouts/Catalogos/Inventarios/TablaInventarios";

function Inventarios() {
  const { columns, rows } = TablaInventarios();
  const top100Films = [
    { label: "Herramienta" },
    { label: "Repuesto" },
    { label: "Accesorio" },
    { label: "Liquidos" },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Tipo de herramienta</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Tipo de " />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Numero de herramienta</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="Numero de herramienta" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Existencia</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="Existencia" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Fecha de entrada</MDTypography>
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
                <MDTypography variant="h6">Fecha de salida</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="date" fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Ubicacion</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Ubicacion" fullWidth />
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

export default Inventarios;
