import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal, OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./Usuarios.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

const columns = [
  {
    title: "ID",
    field: "usu_Codigo",
  },
  {
    title: "Usuario",
    field: "usu_NombreUsuario",
  },
  {
    title: "Nombre",
    field: "usu_Nombre",
  },
  {
    title: "Apellido",
    field: "usu_Apellido",
  },
];

const valSchema = Yup.object().shape({
  usu_NombreUsuario: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  usu_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  usu_Apellido: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El apellido del usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  usu_Clave: Yup.string()
    .required("La contraseña es requerida")
    .max(50, "La contraseña no puede tener más de 50 caracteres"),
  usu_Clave2: Yup.string()
    .required("Por favor, confirma tu contraseña")
    .oneOf([Yup.ref("usu_Clave")], "Las contraseñas no coinciden"),
});

const valSchema2 = Yup.object().shape({
  usu_NombreUsuario: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  usu_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  usu_Apellido: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El apellido del usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "5%",
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    marginTop: "15px",
  },
}));

function Usuarios() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [usuarioseleccionado, setUsuarioSeleccionado] = useState({
    usu_Codigo: 0,
    usu_NombreUsuario: "",
    usu_Nombre: "",
    usu_Apellido: "",
    usu_Clave: "",
    usu_Clave2: "",
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
  };

  const abrircerrarModalEliminar = () => {
    setModalEliminar(!modaleliminar);
  };

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUsuarioSeleccionado((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (
      values.usu_NombreUsuario === "" ||
      values.usu_Nombre === "" ||
      values.usu_Apellido === "" ||
      values.usu_Clave === "" ||
      values.usu_Clave2 === ""
    ) {
      abrircerrarModalInsertar();
      Swal.close();
      Swal.fire({
        icon: "info",
        title: "",
        html: "Debe de llenar <b>todos</b> los campos",
      });
    } else {
      abrircerrarModalInsertar();
      await axios
        .post("https://localhost:7235/api/Usuarios/registrousuarios", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Usuario creado exitosamente",
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "",
            text: error.response.data,
            timer: 2500,
          });
        });
    }
  };

  const peticionput = async (values) => {
    if (values.usu_NombreUsuario === "" || values.usu_Nombre === "" || values.usu_Apellido === "") {
      abrircerrarModalEditar();
      Swal.close();
      Swal.fire({
        icon: "info",
        title: "",
        html: "Debe de llenar <b>todos</b> los campos",
      });
    } else {
      abrircerrarModalEditar();
      Swal.showLoading();
      await axios
        .put("https://localhost:7235/api/Usuarios/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.usu_Codigo === values.usu_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              usu_Nombre: values.usu_Nombre,
              usu_Apellido: values.usu_Apellido,
              usu_Correo: values.usu_Correo,
              usu_NombreUsuario: values.usu_NombreUsuario,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Usuario actualizado exitosamente",
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "",
            text: error.response.data,
            timer: 2500,
          });
        });
    }
  };

  const peticiondelete = async () => {
    abrircerrarModalEliminar();
    Swal.showLoading();
    await axios
      .put("https://localhost:7235/api/Usuarios/eliminar", usuarioseleccionado)
      .then(() => {
        setData(data.filter((usuario) => usuario.usu_Codigo !== usuarioseleccionado.usu_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Usuario eliminado exitosamente",
          timer: 2500,
        });
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data,
          timer: 2500,
        });
      });
  };

  const peticionget = async () => {
    Swal.showLoading();
    await axios
      .get("https://localhost:7235/api/Usuarios/usuarios")
      .then((response) => {
        setData(response.data);
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data,
          timer: 2500,
        });
      });
  };

  useEffect(() => {
    peticionget();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nuevo Usuario </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={2}>
        <Formik
          initialValues={{
            usu_NombreUsuario: "",
            usu_Nombre: "",
            usu_Apellido: "",
            usu_Clave: "",
            usu_Clave2: "",
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Usuario: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="usu_NombreUsuario"
                      id="usu_NombreUsuario"
                      type="text"
                      placeholder="Nombre usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_NombreUsuario" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Nombre: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Nombre"
                      id="usu_Nombre"
                      type="text"
                      placeholder="Nombre del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Apellido: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Apellido"
                      id="usu_Apellido"
                      type="text"
                      placeholder="Apellido del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Apellido" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Contraseña: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Clave"
                      id="usu_Clave"
                      type="password"
                      placeholder="Contraseña"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Clave" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Confirmar Contraseña: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Clave2"
                      id="usu_Clave2"
                      type="password"
                      placeholder="Confirmar contraseña"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Clave2" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mt={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button className="aceptar" endIcon={<SaveIcon />} type="submit" fullWidth>
                    Insertar
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalInsertar()}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MDBox>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h2> Editar Usuario </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            usu_NombreUsuario: usuarioseleccionado && usuarioseleccionado.usu_NombreUsuario,
            usu_Nombre: usuarioseleccionado && usuarioseleccionado.usu_Nombre,
            usu_Apellido: usuarioseleccionado && usuarioseleccionado.usu_Apellido,
            usu_Codigo: usuarioseleccionado && usuarioseleccionado.usu_Codigo,
          }}
          validationSchema={valSchema2}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Usuario: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="usu_NombreUsuario"
                      id="usu_NombreUsuario"
                      type="text"
                      placeholder="Nombre usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_NombreUsuario" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Nombre: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Nombre"
                      id="usu_Nombre"
                      type="text"
                      placeholder="Nombre del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Apellido: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="usu_Apellido"
                      id="usu_Apellido"
                      type="text"
                      placeholder="Apellido del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="usu_Apellido" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mt={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button className="aceptar" endIcon={<SaveIcon />} type="submit" fullWidth>
                    Actualizar
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalEditar()}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MDBox>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Deseas Eliminar el Usuario
        <b> {usuarioseleccionado && usuarioseleccionado.usu_NombreUsuario}</b>?
      </p>
      <div align="right">
        <MDButton color="secondary" onClick={() => peticiondelete()}>
          Si
        </MDButton>
        <MDButton onClick={() => abrircerrarModalEliminar()}>No</MDButton>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div className="App">
                <br />
                <Button
                  className="insertar"
                  endIcon={<AddCircleIcon />}
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Insertar Usuario
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Usuarios"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Usuario",
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Usuario",
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Eliminar"),
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />
                <Modal open={modalinsertar} onClose={abrircerrarModalInsertar}>
                  {bodyInsertar}
                </Modal>

                <Modal open={modaleditar} onClose={abrircerrarModalEditar}>
                  {bodyEditar}
                </Modal>

                <Modal open={modaleliminar} onClose={abrircerrarModalEliminar}>
                  {bodyEliminar}
                </Modal>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <footer>Vista creada por Wesley Morales(DBA)</footer>
    </DashboardLayout>
  );
}

export default Usuarios;
