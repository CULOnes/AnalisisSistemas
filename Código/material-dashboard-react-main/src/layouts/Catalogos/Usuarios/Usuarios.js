import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal, OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Swal from "sweetalert2";
import MDInput from "components/MDInput";
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
    title: "Clave",
    field: "usu_Clave",
  },
];

const valSchema = Yup.object().shape({
  cc_usuario: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre de usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cc_nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cc_apellido: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre de usuario es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cc_clave: Yup.string()
    .required("La clave es requerida")
    .max(50, "La clave no puede tener más de 50 caracteres"),
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
  const [data /* , setData */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [usuarioseleccionado, setUsuarioSeleccionado] = useState({
    usu_Apellido: "",
    usu_Codigo: 0,
    usu_Contrasena: "123",
    usu_Correo: "",
    usu_Nombre: "",
    usu_NombreUsuario: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (values, { resetForm }) => {
    // eslint-disable-next-line no-console
    console.log("Envío de Formulario:", values);
    resetForm();
  };

  const peticionpost = async () => {
    // Swal.showLoading();
    // if (
    //   usuarioseleccionado.usu_Apellido === "" ||
    //   usuarioseleccionado.usu_Correo === "" ||
    //   usuarioseleccionado.usu_Nombre === "" ||
    //   usuarioseleccionado.usu_NombreUsuario === ""
    // ) {
    //   abrircerrarModalInsertar();
    //   Swal.close();
    //   Swal.fire({
    //     icon: "info",
    //     title: "",
    //     html: "Debe de llenar <b>todos</b> los campos",
    //   });
    // } else {
    //   abrircerrarModalInsertar();
    //   await axios
    //     .post("https://localhost:7235/api/Usuarios/registrousuarios", usuarioseleccionado)
    //     .then((response) => {
    //       setData(data.concat(response.data));
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Usuario creado exitosamente",
    //         timer: 2500,
    //       });
    //     })
    //     .catch((error) => {
    //       Swal.close();
    //       Swal.fire({
    //         icon: "error",
    //         title: "",
    //         text: error.response.data,
    //         timer: 2500,
    //       });
    //     });
    // }
  };

  const peticionput = async () => {
    // if (
    //   usuarioseleccionado.usu_Apellido === "" ||
    //   usuarioseleccionado.usu_Correo === "" ||
    //   usuarioseleccionado.usu_Nombre === "" ||
    //   usuarioseleccionado.usu_NombreUsuario === ""
    // ) {
    //   abrircerrarModalEditar();
    //   Swal.close();
    //   Swal.fire({
    //     icon: "info",
    //     title: "",
    //     html: "Debe de llenar <b>todos</b> los campos",
    //   });
    // } else {
    //   abrircerrarModalEditar();
    //   Swal.showLoading();
    //   await axios
    //     .put("https://localhost:7235/api/Usuarios/actualizar", usuarioseleccionado)
    //     .then(() => {
    //       const copiaArray = [...data];
    //       const indice = copiaArray.findIndex(
    //         (elemento) => elemento.usu_Codigo === usuarioseleccionado.usu_Codigo
    //       );
    //       if (indice !== -1) {
    //         copiaArray[indice] = {
    //           ...copiaArray[indice],
    //           usu_Nombre: usuarioseleccionado.usu_Nombre,
    //           usu_Apellido: usuarioseleccionado.usu_Apellido,
    //           usu_Correo: usuarioseleccionado.usu_Correo,
    //           usu_NombreUsuario: usuarioseleccionado.usu_NombreUsuario,
    //         };
    //       }
    //       setData(copiaArray);
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Usuario actualizado exitosamente",
    //         timer: 2500,
    //       });
    //     })
    //     .catch((error) => {
    //       Swal.close();
    //       Swal.fire({
    //         icon: "error",
    //         title: "",
    //         text: error.response.data,
    //         timer: 2500,
    //       });
    //     });
    // }
  };

  const peticiondelete = async () => {
    // abrircerrarModalEliminar();
    // Swal.showLoading();
    // await axios
    //   .put("https://localhost:7235/api/Usuarios/eliminar", usuarioseleccionado)
    //   .then(() => {
    //     setData(data.filter((usuario) => usuario.usu_Codigo !== usuarioseleccionado.usu_Codigo));
    //     Swal.close();
    //     Swal.fire({
    //       icon: "success",
    //       title: "",
    //       text: "Usuario eliminado exitosamente",
    //       timer: 2500,
    //     });
    //   })
    //   .catch((error) => {
    //     Swal.close();
    //     Swal.fire({
    //       icon: "error",
    //       title: "",
    //       text: error.response.data,
    //       timer: 2500,
    //     });
    //   });
  };

  const peticionget = async () => {
    // Swal.showLoading();
    // await axios
    //   .get("https://localhost:7235/api/Usuarios/usuarios")
    //   .then((response) => {
    //     setData(response.data);
    //     Swal.close();
    //   })
    //   .catch((error) => {
    //     Swal.close();
    //     Swal.fire({
    //       icon: "error",
    //       title: "",
    //       text: error.response.data,
    //       timer: 2500,
    //     });
    //   });
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
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            cc_usuario: "",
            cc_nombre: "",
            cc_apellido: "",
            cc_clave: "",
          }}
          validationSchema={valSchema}
          onSubmit={onSubmit}
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
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_usuario"
                      id="cc_usuario"
                      type="text"
                      placeholder="Nombre de usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_usuario" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Nombre: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_nombre"
                      id="cc_nombre"
                      type="text"
                      placeholder="Nombre del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Apellido: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_apellido"
                      id="cc_apellido"
                      type="text"
                      placeholder="Apellido del usuario"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_apellido" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Clave: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_clave"
                      id="cc_clave"
                      type="password"
                      placeholder="clave"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_clave" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Confirmar Clave: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_clave"
                      id="cc_clave"
                      type="password"
                      placeholder="clave"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_clave" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="aceptar"
                    endIcon={<SaveIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => peticionpost()}
                  >
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
      <MDTypography variant="h3"> Editar Usuario </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Usuario: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                name="usu_Contrasena"
                onChange={handleChange}
                value={usuarioseleccionado && usuarioseleccionado.usu_NombreUsuario}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Nombre: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                name="usu_Nombre"
                onChange={handleChange}
                value={usuarioseleccionado && usuarioseleccionado.usu_Nombre}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Apellido: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Apellido"
                name="usu_Apellido"
                type="email"
                onChange={handleChange}
                value={usuarioseleccionado && usuarioseleccionado.usu_Apellido}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Correo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Correo"
                name="usu_Correo"
                type="email"
                onChange={handleChange}
                value={usuarioseleccionado && usuarioseleccionado.usu_Correo}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={() => peticionput()}>
              Actualizar
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton
              variant="gradient"
              color="light"
              fullWidth
              onClick={() => abrircerrarModalEditar()}
            >
              Cancelar
            </MDButton>
          </Grid>
        </Grid>
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
    </DashboardLayout>
  );
}

export default Usuarios;
