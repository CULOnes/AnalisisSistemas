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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Asignaciones() {
  const listapilotos = [{ label: "Piloto 1" }, { label: "Piloto 2" }, { label: "Piloto 3" }];
  const listavehiculos = [
    { label: "Vehiculo 1" },
    { label: "Vehiculo 2" },
    { label: "Vehiculo 3" },
  ];
  const listaclientes = [{ label: "Cliente 1" }, { label: "Cliente 2" }, { label: "Cliente 3" }];
  const listaestado = [{ label: "Optimo" }, { label: "Daños leves" }, { label: "No conducible" }];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Piloto:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={listapilotos}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Piloto" />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Vehiculo:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listavehiculos}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Vehiculo" />}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Cliente:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listaclientes}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Cliente" />}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Kilometraje:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="number" label="Kilometraje" fullWidth />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Estado del Vehiculo:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={listaestado}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Estado del Vehiculo" />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Observaciones:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput type="text" label="Observaciones" fullWidth />
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
    </DashboardLayout>
  );
}

export default Asignaciones;
