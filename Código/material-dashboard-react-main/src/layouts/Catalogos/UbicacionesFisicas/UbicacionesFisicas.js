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
import "./UbicacionesFisicas.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "ubF_Codigo",
  },
  {
    title: "Nombre Ubicacion",
    field: "ubF_Ubicacion",
  },
  {
    title: "Descripcion Ubicacion",
    field: "ubF_Descripcion",
  },
];

const valSchema = Yup.object().shape({
  ubF_Ubicacion: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre de la Ubicación es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  ubF_Descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres")
    .matches(/^[a-zA-ZñÑ0-9,. -]*$/, "Caracter no permitido"),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "5%",
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 0),
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

function UbicacionesFisicas() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState({
    ubF_Codigo: 0,
    ubF_Ubicacion: "",
    ubF_Descripcion: "",
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
  };

  const abrircerrarModalEliminar = () => {
    // Swal.fire({
    //   title: "",
    //   html: `Estas seguro que deseas eliminar <b>${
    //     empleadoseleccionado && empleadoseleccionado.cli_Nombre
    //   }</b>`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   cancelButtonText: "Cancelar",
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Eliminar",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     peticiondelete();
    //   }
    // });
    setModalEliminar(!modaleliminar);
  };

  const seleccionarUbicacion = (usuario, caso) => {
    setUbicacionSeleccionada(usuario);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (values.ubF_Ubicacion === "" || values.ubF_Descripcion === "") {
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
        .post("https://localhost:7235/api/UbicacionesFisicas/registroubicacionesfisicas", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Ubicacion Fisica creada exitosamente",
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
    if (values.ubF_Ubicacion === "" || values.ubF_Descripcion === "") {
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
        .put("https://localhost:7235/api/UbicacionesFisicas/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.ubF_Codigo === values.ubF_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              ubF_Ubicacion: values.ubF_Ubicacion,
              ubF_Descripcion: values.ubF_Descripcion,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Ubicacion Fisica actualizada exitosamente",
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
      .put("https://localhost:7235/api/UbicacionesFisicas/eliminar", ubicacionSeleccionada)
      .then(() => {
        setData(data.filter((usuario) => usuario.ubF_Codigo !== ubicacionSeleccionada.ubF_Codigo));
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
      .get("https://localhost:7235/api/UbicacionesFisicas/ubicacionesfisicas")
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

  // const peticiongettp = async () => {
  // await axios
  //   .get("https://localhost:7235/api/Puestos/puestos")
  //   .then((response) => {
  //     setDatatp(response.data);
  //   })
  //   .catch();
  // };

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
      <h2> Agregar Nueva Ubicación </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={3}>
        <Formik
          initialValues={{
            ubF_Ubicacion: "",
            ubF_Descripcion: "",
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Ubicación: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="ubF_Ubicacion"
                      id="ubF_Ubicacion"
                      type="text"
                      placeholder="Ubicacion"
                      className="form-control"
                    />
                  </MDBox>
                  <ErrorMessage name="ubF_Ubicacion" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Descripción: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="ubF_Descripcion"
                      id="ubF_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="ubF_Descripcion" component="small" className="error" />
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
      <h2> Editar Ubicación Física </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            ubF_Ubicacion: ubicacionSeleccionada && ubicacionSeleccionada.ubF_Ubicacion,
            ubF_Descripcion: ubicacionSeleccionada && ubicacionSeleccionada.ubF_Descripcion,
            ubF_Codigo: ubicacionSeleccionada && ubicacionSeleccionada.ubF_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Ubicación: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="ubF_Ubicacion"
                      id="ubF_Ubicacion"
                      type="text"
                      placeholder="Ubicacion"
                    />
                  </MDBox>
                  <ErrorMessage name="ubF_Ubicacion" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Descripción: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="ubF_Descripcion"
                      id="ubF_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="ubF_Descripcion" component="small" className="error" />
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

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        ¿Deseas Eliminar la Ubicación
        <b> {ubicacionSeleccionada && ubicacionSeleccionada.ubF_Ubicacion}</b>?
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
                  Insertar Ubicación
                </Button>
                {/* <MDButton color="success" onClick={() => abrircerrarModalInsertar()}> */}
                {/* Insertar Ubicación */}
                {/* </MDButton> */}
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Ubicaciones Físicas"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Ubicaciones",
                      onClick: (event, rowData) => seleccionarUbicacion(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Ubicaciones",
                      onClick: (event, rowData) => seleccionarUbicacion(rowData, "Eliminar"),
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
      <footer>Vista creada por Axel Estrada(PO)</footer>
    </DashboardLayout>
  );
}

export default UbicacionesFisicas;
