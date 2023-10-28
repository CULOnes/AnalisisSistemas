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
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./CambioEstados.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

const columns = [
  {
    title: "ID",
    field: "cambio_id",
  },
  {
    title: "Activo",
    field: "cambio_activo",
  },
  {
    title: "Estado",
    field: "cambio_estado",
  },
  {
    title: "Fecha",
    field: "cambio_fecha",
  },
  {
    title: "Descripción",
    field: "cambio_descripcion",
  },
];

const validationSchema = Yup.object().shape({
  cambio_activo: Yup.array()
    .required("Debe seleccionar un Activo")
    .min(1, "Seleccione al menos un activo"),
  cambio_estado: Yup.string().required("Debe seleccionar un Estado"),
});

const valSchema = Yup.object().shape({
  cambio_fecha: Yup.date()
    .required("Debe seleccionar una fecha")
    .max(new Date(), "La fecha no puede ser mayor al dia de hoy"),
  cambio_descripcion: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Solo se permiten números y letras")
    .required("La descripcion es requerida")
    .max(250, "La descripcion no puede tener más de 250 caracteres"),
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

function CambioEstados() {
  const styles = useStyles();
  const [data /* , setData */] = useState([]);
  // const [datatp /* , setDatatp */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [empleadoseleccionado /* setEmpleadoSeleccionado */] = useState({
    cambio_id: 0,
    cambio_activo: 0,
    cambio_estado: 0,
    cambio_fecha: 0,
    cambio_descripcion: 0,
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
    abrircerrarModalInsertar();
  };

  const abrircerrarModalFormulario = () => {
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

  // const seleccionarEmpleado = (empleado, caso) => {
  //   setEmpleadoSeleccionado(empleado);
  //   if (caso === "Editar") {
  //     abrircerrarModalEditar();
  //   } else {
  //     abrircerrarModalEliminar();
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEmpleadoSeleccionado((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const validaractivo = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalEditar();
  };

  const validaractivo2 = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalFormulario();

    Swal.fire({
      icon: "success",
      title: "Formulario Enviado",
      text: "El formulario se ha enviado con éxito",
      timer: 2500, // Controla cuánto tiempo se muestra el mensaje (en milisegundos)
      timerProgressBar: true, // Muestra una barra de progreso durante el tiempo de visualización
    });
  };

  // const peticionpost = async () => {
  //   // Swal.showLoading();
  //   // if (empleadoseleccionado.activos === 0) {
  //   //   Swal.fire({
  //   //     icon: "info",
  //   //     title: "",
  //   //     text: "Debe seleccionar al menos un activo",
  //   //   });
  //   // } else if (empleadoseleccionado.estados === 0) {
  //   //   Swal.fire({
  //   //     icon: "info",
  //   //     title: "",
  //   //     text: "Debe seleccionar un estado",
  //   //   });
  //   // } else {
  //   //   abrircerrarModalEditar();
  //   // if (
  //   //   empleadoseleccionado.pue_Codigo === 0 ||
  //   //   empleadoseleccionado.emp_Nombre === "" ||
  //   //   empleadoseleccionado.emp_Apellido === "" ||
  //   //   empleadoseleccionado.emp_Direccion === "" ||
  //   //   empleadoseleccionado.emp_Telefono === 0 ||
  //   //   empleadoseleccionado.emp_Dpi === "" ||
  //   //   empleadoseleccionado.emp_Edad === 0 ||
  //   //   empleadoseleccionado.emp_Nacimiento === 0
  //   // ) {
  //   //   abrircerrarModalInsertar();
  //   //   Swal.close();
  //   //   Swal.fire({
  //   //     icon: "info",
  //   //     title: "",
  //   //     html: "Debe de llenar <b>todos</b> los campos",
  //   //   });
  //   // } else {
  //   //   abrircerrarModalInsertar();
  //   //   await axios
  //   //     .post("https://localhost:7235/api/Empleados/registroempleados", empleadoseleccionado)
  //   //     .then((response) => {
  //   //       setData(data.concat(response.data));
  //   //       Swal.close();
  //   //       Swal.fire({
  //   //         icon: "success",
  //   //         title: "",
  //   //         text: "Empleado creado exitosamente",
  //   //         timer: 2500,
  //   //       });
  //   //     })
  //   //     .catch((error) => {
  //   //       Swal.close();
  //   //       Swal.fire({
  //   //         icon: "error",
  //   //         title: "",
  //   //         text: error.response.data,
  //   //         timer: 2500,
  //   //       });
  //   //     });
  //   // }
  // };

  const peticionput = async () => {
    // setModalEditar(!modaleditar);
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
    // }
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
      <h2> Cambio de Estado de Activos </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cambio_activo: "",
            cambio_estado: "",
          }}
          validationSchema={validationSchema}
          onSubmit={validaractivo}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={2}>
                    <h4> Seleccione Activos: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox>
                    <Field
                      as="select"
                      name="cambio_activo"
                      id="cambio_activo"
                      className="form-control-lista"
                      multiple
                    >
                      <option key="0" value="0">
                        Seleccione Activos:
                      </option>
                      <option key="1" value="opcion1">
                        Activo 1
                      </option>
                      <option key="2" value="opcion2">
                        Activo 2
                      </option>
                      <option key="3" value="opcion3">
                        Activo 3
                      </option>
                      <option key="4" value="opcion4">
                        Activo 4
                      </option>
                      <option key="5" value="opcion5">
                        Activo 5
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cambio_activo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={4} mt={1}>
                    <h4> Nuevo Estado: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      name="cambio_estado"
                      id="cambio_estado"
                      className="form-control"
                    >
                      <option key="0" value="0">
                        Seleccione Nuevo Estado:
                      </option>
                      <option key="1" value="opcion1">
                        Bueno
                      </option>
                      <option key="2" value="opcion2">
                        Robado
                      </option>
                      <option key="3" value="opcion3">
                        Desaparecido
                      </option>
                      <option key="4" value="opcion4">
                        Perdido
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="cambio_estado" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={4}>
                  <MDButton
                    className="aceptar"
                    endIcon={<ArrowForwardIosIcon />}
                    type="submit"
                    fullWidth
                  >
                    Siguiente
                  </MDButton>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <MDButton
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    fullWidth
                    onClick={() => abrircerrarModalInsertar()}
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

  const bodyEditar = (
    <div className={styles.modal}>
      <h2> Agregar Acta </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cambio_fecha: "",
            cambio_descripcion: "",
          }}
          validationSchema={valSchema}
          onSubmit={validaractivo2}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4}>
                    <h4> Fecha: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <Field
                    as={OutlinedInput}
                    name="cambio_fecha"
                    id="cambio_fecha"
                    type="date"
                    className="form-control"
                  />
                  <br />
                  <ErrorMessage name="cambio_fecha" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4}>
                    <h4> Descripcion: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={4}>
                    <Field
                      as={TextField}
                      name="cambio_descripcion"
                      id="cambio_descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                    <ErrorMessage name="cambio_descripcion" component="small" className="error" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={3}>
                  <MDButton
                    className="aceptar"
                    endIcon={<SaveIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => peticionput()}
                  >
                    Confirmar
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
        <b> {empleadoseleccionado && empleadoseleccionado.emp_Nombre}</b>?
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
                  Cambiar Estados
                </MDButton>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Actas"
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
      <footer>Vista creada por Gustavo Herrera(QA)</footer>
    </DashboardLayout>
  );
}

export default CambioEstados;
