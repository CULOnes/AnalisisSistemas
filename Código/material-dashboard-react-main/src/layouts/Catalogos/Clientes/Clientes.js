// import PropTypes from 'prop-types'
import React, { useState } from "react";
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
import TablaClientes from "layouts/Catalogos/Clientes/TablaClientes";

function Clientes() {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Telefono2, setTelefono2] = useState("");
  const [Direccion, setDireccion] = useState("");

  const handleGuardar = () => {
    console.log(Nombre);
    console.log(Apellido);
    console.log(Correo);
    console.log(Telefono);
    console.log(Telefono2);
    console.log(Direccion);
  };

  const { columns, rows } = TablaClientes();
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
                <MDInput
                  type="text"
                  label="Nombre"
                  fullWidth
                  onChange={(e) => setNombre(e.target.value)}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Apellido:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Apellido"
                  fullWidth
                  onChange={(e) => setApellido(e.target.value)}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Correo:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Correo"
                  fullWidth
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Telefono/Celular:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Telefono/Celular"
                  fullWidth
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Telefono Secundario:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Telefono Secundario"
                  fullWidth
                  onChange={(e) => setTelefono2(e.target.value)}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Direccion:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Direccion"
                  fullWidth
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleGuardar}>
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

export default Clientes;
