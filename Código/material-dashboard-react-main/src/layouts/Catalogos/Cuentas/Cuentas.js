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
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./Cuentas.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "cue_Codigo",
  },
  {
    title: "Nombre",
    field: "cue_Nombre",
  },
  {
    title: "Tipo de cuenta",
    field: "cue_Tipo",
  },
];

const valSchema = Yup.object().shape({
  cue_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre de la Cuenta es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cue_Descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres"),
  cue_Tipo: Yup.string().required("El Tipo de Cuenta es requerido"),
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

function Cuentas() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState({
    cue_Nombre: "",
    cue_Descripcion: "",
    cue_Tipo: "",
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

  const seleccionarCuenta = (cuenta, caso) => {
    setCuentaSeleccionada(cuenta);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    abrircerrarModalInsertar();
    Swal.showLoading();
    if (values.cue_Nombre === 0 || values.cue_Descripcion === "" || values.cue_Tipo === "") {
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
        .post("https://localhost:7235/api/Cuentas/registrocuentas", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Cuenta creada exitosamente",
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
    if (values.cue_Nombre === 0 || values.cue_Descripcion === "" || values.cue_Tipo === "") {
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
        .put("https://localhost:7235/api/Cuentas/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.cue_Codigo === values.cue_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              cue_Nombre: values.cue_Nombre,
              cue_Descripcion: values.cue_Descripcion,
              cue_Tipo: values.cue_Tipo,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Cuenta actualizada exitosamente",
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
      .put("https://localhost:7235/api/Cuentas/eliminar", cuentaSeleccionada)
      .then(() => {
        setData(data.filter((cuenta) => cuenta.cue_Codigo !== cuentaSeleccionada.cue_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Cuenta eliminada exitosamente",
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
      .get("https://localhost:7235/api/Cuentas/cuentas")
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

  const peticiongettp = async () => {
    // await axios
    //   .get("https://localhost:7235/api/Puestos/puestos")
    //   .then((response) => {
    //     setDatatp(response.data);
    //   })
    //   .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongettp();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nueva Cuenta </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cue_Nombre: "",
            cue_Descripcion: "",
            cue_Tipo: "",
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={1} pb={4} mt={2}>
                    <h4> Nombre: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cue_Nombre"
                      id="cue_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre Cuenta"
                    />
                  </MDBox>
                  <ErrorMessage name="cue_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <h4> Tipo de cuenta: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="cue_Tipo"
                      name="cue_Tipo"
                      className="form-control"
                      placeholder="Seleccione una Opción"
                    >
                      <option key="0" value="0">
                        Seleccione un Tipo de Cuenta:
                      </option>
                      <option key="1" value="Cuenta para Vehículos">
                        Cuenta para Vehículos
                      </option>
                      <option key="2" value="Cuenta para Maquinaria">
                        Cuenta para Maquinaria
                      </option>
                      <option key="3" value="Cuenta para Mobiliario y Equipo">
                        Cuenta para Mobiliario y Equipo
                      </option>
                      <option key="4" value="Cuenta para Equipo de Cómputo">
                        Cuenta para Equipo de Cómputo
                      </option>
                      <option key="5" value="Cuenta para Herramientas">
                        Cuenta para Herramientas
                      </option>
                      <option key="6" value="Cuenta para Amortizaciones">
                        Cuenta para Amortizaciones
                      </option>
                      <option key="7" value="Cuenta para Edificios">
                        Cuenta para Edificios
                      </option>
                      <option key="8" value="Cuenta para Terrenos">
                        Cuenta para Terrenos
                      </option>
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cue_Tipo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={1} pb={4}>
                    <h4> Descripción: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as={TextField}
                      name="cue_Descripcion"
                      id="cue_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="cue_Descripcion" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mt={2} mb={3}>
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
      <h2> Editar Cuenta </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cue_Nombre: cuentaSeleccionada && cuentaSeleccionada.cue_Nombre,
            cue_Descripcion: cuentaSeleccionada && cuentaSeleccionada.cue_Descripcion,
            cue_Tipo: cuentaSeleccionada && cuentaSeleccionada.cue_Tipo,
            cue_Codigo: cuentaSeleccionada && cuentaSeleccionada.cue_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={1} pb={4} mt={2}>
                    <h4> Nombre: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cue_Nombre"
                      id="cue_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre Cuenta"
                    />
                  </MDBox>
                  <ErrorMessage name="cue_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <h4> Tipo de cuenta: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="cue_Tipo"
                      name="cue_Tipo"
                      className="form-control"
                      placeholder="Seleccione una Opción"
                    >
                      <option key="0" value="0">
                        Seleccione un Tipo de Cuenta:
                      </option>
                      <option key="1" value="Cuenta para Vehículos">
                        Cuenta para Vehículos
                      </option>
                      <option key="2" value="Cuenta para Maquinaria">
                        Cuenta para Maquinaria
                      </option>
                      <option key="3" value="Cuenta para Mobiliario y Equipo">
                        Cuenta para Mobiliario y Equipo
                      </option>
                      <option key="4" value="Cuenta para Equipo de Cómputo">
                        Cuenta para Equipo de Cómputo
                      </option>
                      <option key="5" value="Cuenta para Herramientas">
                        Cuenta para Herramientas
                      </option>
                      <option key="6" value="Cuenta para Amortizaciones">
                        Cuenta para Amortizaciones
                      </option>
                      <option key="7" value="Cuenta para Edificios">
                        Cuenta para Edificios
                      </option>
                      <option key="8" value="Cuenta para Terrenos">
                        Cuenta para Terrenos
                      </option>
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cue_Tipo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={1} pb={4}>
                    <h4> Descripción: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as={TextField}
                      name="cue_Descripcion"
                      id="cue_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="cue_Descripcion" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mt={2} mb={3}>
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
        Deseas Eliminar la cuenta
        <b> {cuentaSeleccionada && cuentaSeleccionada.cue_Nombre}</b>?
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
                  Insertar Cuenta
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Cuentas"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Cuenta",
                      onClick: (event, rowData) => seleccionarCuenta(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Cuenta",
                      onClick: (event, rowData) => seleccionarCuenta(rowData, "Eliminar"),
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

export default Cuentas;
