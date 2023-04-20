// import PropTypes from 'prop-types'
import React, { useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import TablaUsuarios from "layouts/Catalogos/Usuarios/TablaUsuarios";
import "styles/styles.css";

function Usuarios() {
  const Nombre = useRef(null);
  const Apellido = useRef(null);
  const Correo = useRef(null);
  const Usuario = useRef(null);

  const save = async (nombre, apellido, correo, usuario) => {
    const request = {
      Usu_Nombre: nombre,
      Usu_Apellido: apellido,
      Usu_Correo: correo,
      Usu_NombreUsuario: usuario,
      Usu_Contrasena: "123",
    };
    const respuesta = await axios.post(
      "https://localhost:7235/api/Usuarios/registrousuarios",
      request
    );
    console.log(respuesta.data);
  };

  const handleSubmit = () => {
    const nombre = Nombre.current.value;
    const apellido = Apellido.current.value;
    const correo = Correo.current.value;
    const usuario = Usuario.current.value;

    save(nombre, apellido, correo, usuario);
  };

  const { columns, rows } = TablaUsuarios();
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
                <input type="text" className="my-input" placeholder="Nombre" ref={Nombre} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Apellido:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <input type="text" className="my-input" placeholder="Apellido" ref={Apellido} />
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
                <input type="text" className="my-input" placeholder="Correo" ref={Correo} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <MDBox mb={2}>
                <MDTypography variant="h6">Nombre de Usuario:</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={2}>
                <input type="text" className="my-input" placeholder="Usuario" ref={Usuario} />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={2}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
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

export default Usuarios;
