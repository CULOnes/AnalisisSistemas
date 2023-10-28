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
import "./CentrosCosto.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "ceC_Codigo",
  },
  {
    title: "Nombre",
    field: "ceC_Nombre",
  },
  {
    title: "Descripción",
    field: "ceC_Descripcion",
  },
];

const valSchema = Yup.object().shape({
  ceC_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del Centro de Costo es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  ceC_Descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres")
    .matches(/^[a-zA-ZñÑ0-9,. -]*$/, "Caracter no permitido"),
  cue_Codigo: Yup.number().required("Este campo es requerido"),
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

function CentrosCosto() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [datacu, setDatacu] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [centroCostoSeleccionado, setCentroCostoSeleccionado] = useState({
    ceC_Codigo: 0,
    ceC_Nombre: "",
    ceC_Descripcion: "",
    cue_Codigo: 0,
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

  const seleccionarCentroCosto = (CentroCosto, caso) => {
    setCentroCostoSeleccionado(CentroCosto);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (values.cue_Codigo === 0 || values.ceC_Nombre === "" || values.ceC_Descripcion === "") {
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
        .post("https://localhost:7235/api/CentrosCosto/registrocentroscosto", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Centro de Costo creado exitosamente",
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
    if (values.cue_Codigo === 0 || values.ceC_Nombre === "" || values.ceC_Descripcion === "") {
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
        .put("https://localhost:7235/api/CentrosCosto/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.ceC_Codigo === values.ceC_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              cue_Codigo: values.cue_Codigo,
              ceC_Nombre: values.ceC_Nombre,
              ceC_Descripcion: values.ceC_Descripcion,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Centro de Costo actualizado exitosamente",
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
      .put("https://localhost:7235/api/CentrosCosto/eliminar", centroCostoSeleccionado)
      .then(() => {
        setData(
          data.filter(
            (centrocosto) => centrocosto.ceC_Codigo !== centroCostoSeleccionado.ceC_Codigo
          )
        );
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Centro de Costo eliminado exitosamente",
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
      .get("https://localhost:7235/api/CentrosCosto/centroscosto")
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

  const peticiongetcu = async () => {
    await axios
      .get("https://localhost:7235/api/Cuentas/cuentas")
      .then((response) => {
        setDatacu(response.data);
      })
      .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongetcu();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nuevo Centro de Costo </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={3}>
        <Formik
          initialValues={{
            ceC_Nombre: "",
            ceC_Descripcion: "",
            cue_Codigo: 0,
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox>
                    <MDTypography variant="h6"> Nombre Centro Costo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="ceC_Nombre"
                      id="ceC_Nombre"
                      type="text"
                      placeholder="Centro Costo"
                      className="form-control"
                    />
                  </MDBox>
                  <ErrorMessage name="ceC_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mt={4} mb={2}>
                    <MDTypography variant="h6"> Cuenta Centro Costo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={4}>
                    <Field as="select" id="cue_Codigo" name="cue_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione una Cuenta:
                      </option>
                      {datacu.map((element) => (
                        <option key={element.cue_Codigo} value={element.cue_Codigo}>
                          {element.cue_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cue_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={4} mb={2}>
                    <MDTypography variant="h6"> Descripción: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="ceC_Descripcion"
                      id="ceC_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="ceC_Descripcion" component="small" className="error" />
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
      <h2> Editar Centro de Costo </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            ceC_Nombre: centroCostoSeleccionado && centroCostoSeleccionado.ceC_Nombre,
            ceC_Descripcion: centroCostoSeleccionado && centroCostoSeleccionado.ceC_Descripcion,
            cue_Codigo: centroCostoSeleccionado && centroCostoSeleccionado.cue_Codigo,
            ceC_Codigo: centroCostoSeleccionado && centroCostoSeleccionado.ceC_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox>
                    <MDTypography variant="h6"> Nombre Centro Costo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="ceC_Nombre"
                      id="ceC_Nombre"
                      type="text"
                      placeholder="Centro Costo"
                      className="form-control"
                    />
                  </MDBox>
                  <ErrorMessage name="ceC_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mt={4} mb={2}>
                    <MDTypography variant="h6"> Cuenta Centro Costo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={4}>
                    <Field as="select" id="cue_Codigo" name="cue_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione una Cuenta:
                      </option>
                      {datacu.map((element) => (
                        <option key={element.cue_Codigo} value={element.cue_Codigo}>
                          {element.cue_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cue_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={4} mb={2}>
                    <MDTypography variant="h6"> Descripción: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="ceC_Descripcion"
                      id="ceC_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="ceC_Descripcion" component="small" className="error" />
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
        ¿Deseas Eliminar el Centro de Costo
        <b> {centroCostoSeleccionado && centroCostoSeleccionado.ceC_Nombre}</b>?
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
                  Insertar Centro de Costo
                </Button>
                {/* <MDButton
                  variant="gradient"
                  color="success"
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Insertar Centro de Costo
                </MDButton> */}
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Centros de Costo"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Centro de Costo",
                      onClick: (event, rowData) => seleccionarCentroCosto(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Centro de Costo",
                      onClick: (event, rowData) => seleccionarCentroCosto(rowData, "Eliminar"),
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

export default CentrosCosto;
