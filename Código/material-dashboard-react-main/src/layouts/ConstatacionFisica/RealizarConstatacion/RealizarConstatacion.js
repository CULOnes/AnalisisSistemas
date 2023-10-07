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
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./RealizarConstatacion.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const columns = [
  {
    title: "ID",
    field: "emp_Codigo",
  },
  {
    title: "Nombre",
    field: "emp_Nombre",
  },
  {
    title: "Apellido",
    field: "emp_Apellido",
  },
  {
    title: "Telefono",
    field: "emp_Telefono",
  },
  {
    title: "Edad",
    field: "emp_Edad",
  },
];

const valSchema = Yup.object().shape({
  codigo_activo: Yup.string()
    .matches(/^[0-9]*$/, "Solo se permiten números")
    .required("El codigo de Activo es requerido")
    .max(10, "El codigo no puede tener más de 10 caracteres"),
});

const valSchema2 = Yup.object().shape({
  marca: Yup.string()
    .matches(/^[0-9]*$/, "Solo se permiten números")
    .required("La marca es requerida")
    .max(10, "La marca no puede tener más de 10 caracteres"),
  modelo: Yup.string()
    .matches(/^[0-9]*$/, "Solo se permiten números")
    .required("El modelo es requerido")
    .max(10, "El modelo no puede tener más de 10 caracteres"),
  serie: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Solo se permiten números y letras")
    .required("La serie es requerida")
    .max(10, "La serie no puede tener más de 10 caracteres"),
  especificaciones: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Solo se permiten números y letras")
    .required("La especificacion es requerida")
    .max(25, "La especificacion no puede tener más de 25 caracteres"),
  descripcion: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Solo se permiten números y letras")
    .required("La descripcion es requerida")
    .max(250, "La descripcion no puede tener más de 250 caracteres"),
  observaciones: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Solo se permiten números y letras")
    .max(250, "Las observaciones no puede tener más de 250 caracteres"),
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
    overflow: "auto",
  },
  modal2: {
    borderRadius: "5%",
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 0),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  },
}));

function RealizarConstatacion() {
  const styles = useStyles();
  const [data /* , setData */] = useState([]);
  // const [datatp /* , setDatatp */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [constatacionseleccionada, setConstatacionSeleccionada] = useState({
    ubicacionfisica: 0,
    custodio: 0,
    ubicacion_fisica: 0,
    custodio2: 0,
    estado: 0,
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
    abrircerrarModalInsertar();
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

  // const seleccionarEmpleado = (empleado, caso) => {
  //   setEmpleadoSeleccionado(empleado);
  //   if (caso === "Editar") {
  //     abrircerrarModalEditar();
  //   } else {
  //     abrircerrarModalEliminar();
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConstatacionSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    // Swal.showLoading();
    if (constatacionseleccionada.ubicacionfisica === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe seleccionar una ubicacion física",
      });
    } else if (constatacionseleccionada.custodio === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe seleccionar un custodio",
      });
    } else {
      abrircerrarModalEditar();
      //   await axios
      //     .post("https://localhost:7235/api/Empleados/registroempleados", empleadoseleccionado)
      //     .then((response) => {
      //       setData(data.concat(response.data));
      //       Swal.close();
      //       Swal.fire({
      //         icon: "success",
      //         title: "",
      //         text: "Empleado creado exitosamente",
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
    }
  };

  const validaractivo = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();
  };

  const validarinfo = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();
  };

  const peticionput = async () => {
    if (constatacionseleccionada.estado === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe seleccionar un estado",
      });
    } else if (constatacionseleccionada.ubicacion_fisica === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe seleccionar una ubicacion fisica",
      });
    } else if (constatacionseleccionada.custodio2 === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe seleccionar un custodio",
      });

      // if (
      //   empleadoseleccionado.pue_Codigo === 0 ||
      //   empleadoseleccionado.emp_Nombre === "" ||
      //   empleadoseleccionado.emp_Apellido === "" ||
      //   empleadoseleccionado.emp_Direccion === "" ||
      //   empleadoseleccionado.emp_Telefono === 0 ||
      //   empleadoseleccionado.emp_Dpi === "" ||
      //   empleadoseleccionado.emp_Edad === 0 ||
      //   empleadoseleccionado.emp_Nacimiento === 0
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
      //     .put("https://localhost:7235/api/Empleados/actualizar", empleadoseleccionado)
      //     .then(() => {
      //       const copiaArray = [...data];
      //       const indice = copiaArray.findIndex(
      //         (elemento) => elemento.emp_Codigo === empleadoseleccionado.emp_Codigo
      //       );
      //       if (indice !== -1) {
      //         copiaArray[indice] = {
      //           ...copiaArray[indice],
      //           pue_Codigo: empleadoseleccionado.pue_Codigo,
      //           emp_Nombre: empleadoseleccionado.emp_Nombre,
      //           emp_Apellido: empleadoseleccionado.emp_Apellido,
      //           emp_Direccion: empleadoseleccionado.emp_Direccion,
      //           emp_Telefono: empleadoseleccionado.emp_Telefono,
      //           emp_Dpi: empleadoseleccionado.emp_Dpi,
      //           emp_Edad: empleadoseleccionado.emp_Edad,
      //           emp_Nacimiento: empleadoseleccionado.emp_Nacimiento,
      //           emp_Nolicencia: empleadoseleccionado.emp_Nolicencia,
      //           emp_Tipolicencia: empleadoseleccionado.emp_Tipolicencia,
      //         };
      //       }
      //       setData(copiaArray);
      //       Swal.close();
      //       Swal.fire({
      //         icon: "success",
      //         title: "",
      //         text: "Empleado actualizado exitosamente",
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
    }
  };

  const peticiondelete = async () => {
    // abrircerrarModalEliminar();
    // Swal.showLoading();
    // await axios
    //   .put("https://localhost:7235/api/Empleados/eliminar", empleadoseleccionado)
    //   .then(() => {
    //     setData(data.filter((empleado) => empleado.emp_Codigo !== empleadoseleccionado.emp_Codigo));
    //     Swal.close();
    //     Swal.fire({
    //       icon: "success",
    //       title: "",
    //       text: "Empleado eliminado exitosamente",
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
    //   .get("https://localhost:7235/api/Empleados/empleados")
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
      <h2> Realizar Constatacion Fisica </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Grid container spacing={3} justifyContent="center" mb={4}>
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={1}>
              <h4> Seleccione Ubicacion Fisica: </h4>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="ubicacionfisica" className="combo" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Ubicacion Fisica
                </option>
                <option key="1" value="0">
                  Ubicacion 1
                </option>
                <option key="2" value="0">
                  Ubicacion 2
                </option>
                <option key="3" value="0">
                  Ubicacion 3
                </option>
                <option key="4" value="0">
                  Ubicacion 4
                </option>
                <option key="5" value="0">
                  Ubicacion 5
                </option>
                {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" mb={4}>
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={1}>
              <h4> Seleccione Custodio: </h4>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="custodio" className="combo" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Custodio
                </option>
                <option key="1" value="0">
                  Custodio 1
                </option>
                <option key="2" value="0">
                  Custodio 2
                </option>
                <option key="3" value="0">
                  Custodio 3
                </option>
                <option key="4" value="0">
                  Custodio 4
                </option>
                <option key="5" value="0">
                  Custodio 5
                </option>
                {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" mb={1}>
          <Grid item xs={12} md={4} lg={3}>
            <Button
              className="aceptar"
              endIcon={<ArrowForwardIosIcon />}
              type="submit"
              fullWidth
              onClick={() => peticionpost()}
            >
              Siguiente
            </Button>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton
              className="cancelar"
              endIcon={<ClearIcon />}
              type="submit"
              fullWidth
              onClick={() => abrircerrarModalInsertar()}
            >
              Cancelar
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal2}>
      <h2> Constatacion Fisica </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            codigo_activo: "",
          }}
          validationSchema={valSchema}
          onSubmit={validaractivo}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="codigo_activo"
                      id="codigo_activo"
                      type="text"
                      className="campos"
                      placeholder="Activo"
                    />
                    <br />
                    <ErrorMessage name="codigo_activo" component="small" className="error" />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <MDButton
                    color="success"
                    className="consultar"
                    fullWidth
                    type="submit"
                    endIcon={<SearchIcon />}
                    onClick={() => peticiondelete()}
                  >
                    Consultar
                  </MDButton>
                </Grid>
                <Grid item xs={12} md={6} lg={3} />
              </Grid>
            </form>
          )}
        </Formik>
        <Formik
          initialValues={{
            marca: "",
            modelo: "",
            serie: "",
            especificaciones: "",
            descripcion: "",
            observaciones: "",
          }}
          validationSchema={valSchema2}
          onSubmit={validarinfo}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={6} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Marca: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="marca"
                      id="marca"
                      type="text"
                      className="campos"
                      placeholder="Marca"
                    />
                    <br />
                    <ErrorMessage name="marca" component="small" className="error" />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Modelo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="modelo"
                      id="modelo"
                      type="text"
                      className="campos"
                      placeholder="Modelo"
                    />
                    <br />
                    <ErrorMessage name="modelo" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={1}>
                  <MDBox>
                    <MDTypography variant="h6"> Serie: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={11}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="serie"
                      id="serie"
                      type="text"
                      className="campos"
                      placeholder="Serie"
                    />
                    <br />
                    <ErrorMessage name="serie" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Estado: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>
                    <select name="estado" className="combosegundocompleto" onChange={handleChange}>
                      <option key="0" value="0">
                        Seleccione Estado
                      </option>
                      <option key="1" value="1">
                        Estado 1
                      </option>
                      <option key="2" value="2">
                        Estado 2
                      </option>
                      <option key="3" value="3">
                        Estado 3
                      </option>
                      <option key="4" value="4">
                        Estado 4
                      </option>
                      <option key="5" value="5">
                        Estado 5
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </select>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Custodio: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>
                    <select
                      name="custodio2"
                      className="combosegundocompleto"
                      onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Custodio
                      </option>
                      <option key="1" value="1">
                        Custodio 1
                      </option>
                      <option key="2" value="2">
                        Custodio 2
                      </option>
                      <option key="3" value="3">
                        Custodio 3
                      </option>
                      <option key="4" value="4">
                        Custodio 4
                      </option>
                      <option key="5" value="5">
                        Custodio 5
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </select>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox>
                    <MDTypography variant="h6"> Ubicacion Fisica: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <select
                      name="ubicacion_fisica"
                      className="combosegundo"
                      onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Ubicacion Fisica
                      </option>
                      <option key="1" value="1">
                        Ubicacion 1
                      </option>
                      <option key="2" value="2">
                        Ubicacion 2
                      </option>
                      <option key="3" value="3">
                        Ubicacion 3
                      </option>
                      <option key="4" value="4">
                        Ubicacion 4
                      </option>
                      <option key="5" value="5">
                        Ubicacion 5
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </select>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox>
                    <MDTypography variant="h6"> Especificaciones: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="especificaciones"
                      id="especificaciones"
                      type="text"
                      className="especificaciones"
                      placeholder="Especificaciones del activo"
                    />
                    <br />
                    <ErrorMessage name="especificaciones" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox>
                    <MDTypography variant="h6"> Descripcion: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={10}>
                  <MDBox>
                    <Field
                      as={TextField}
                      name="descripcion"
                      id="descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      placeholder="Descripcion"
                    />
                    <ErrorMessage name="descripcion" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox>
                    <MDTypography variant="h6"> Observaciones: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <Field
                      as={TextField}
                      name="observaciones"
                      id="observaciones outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      placeholder="Observaciones de la constatacion fisica"
                    />
                    <br />
                    <ErrorMessage name="observaciones" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDButton
                    className="aceptar"
                    endIcon={<ContentPasteSearchIcon />}
                    fullWidth
                    onClick={() => peticionput()}
                  >
                    Activos Faltantes
                  </MDButton>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MDButton
                    className="aceptar"
                    endIcon={<SaveIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => peticionput()}
                  >
                    Actualizar
                  </MDButton>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MDButton
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    fullWidth
                    onClick={() => abrircerrarModalEditar()}
                  >
                    Cancelar
                  </MDButton>
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
        Deseas Eliminar el Empleado
        <b> {constatacionseleccionada && constatacionseleccionada.emp_Nombre}</b>?
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
                <MDButton
                  className="insertar"
                  endIcon={<AddCircleIcon />}
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Realizar Constatacion
                </MDButton>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Empleados"
                  // actions={[
                  //   {
                  //     icon: "edit",
                  //     tooltip: "Editar Empleado",
                  //     onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar"),
                  //   },
                  //   {
                  //     icon: "delete",
                  //     tooltip: "Eliminar Empleado",
                  //     onClick: (event, rowData) => seleccionarEmpleado(rowData, "Eliminar"),
                  //   },
                  // ]}
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />

                <Modal
                  open={modalinsertar}
                  onClose={abrircerrarModalInsertar}
                  style={{
                    content: {
                      overflow: "auto",
                    },
                  }}
                >
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
      <footer>Vista creada por Gustavo Herrera(QA)</footer>
    </DashboardLayout>
  );
}

export default RealizarConstatacion;
