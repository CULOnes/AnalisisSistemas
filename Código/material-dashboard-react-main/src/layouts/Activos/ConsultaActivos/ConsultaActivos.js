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
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import "./ConsultaActivos.css";

const columns = [
  {
    title: "ID",
    field: "cons_id",
  },
  {
    title: "Nombre",
    field: "cons_nombre",
  },
  {
    title: "Marca",
    field: "cons_marca",
  },
  {
    title: "Estado",
    field: "cons_estado",
  },
  {
    title: "Custodio",
    field: "cons_custodio",
  },
  {
    title: "Clase",
    field: "cons_clase",
  },
  {
    title: "Ubicación",
    field: "cons_ubicacion",
  },
  {
    title: "Fecha de Ingreso",
    field: "cons_fecha",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "5%",
    position: "absolute",
    width: 575,
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

const validationSchema = Yup.object().shape({
  compra_nombreActivo: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres")
    .matches(/^[a-zA-ZñÑ0-9,. -]*$/, "Caracter no permitido"),
  compra_marcaAct: Yup.string().required("La marca es requerida"),
  compra_estadoAct: Yup.string().required("El estado es requerido"),
  compra_custodioAct: Yup.string().required("El custodio es requerido"),
  compra_claseAct: Yup.string().required("La clase es requerida"),
  compra_ubicacionAct: Yup.string().required("La ubicación es requerida"),
  compra_fechaIngreso: Yup.date()
    .max(new Date(), "La fecha no puede ser mayor que la fecha actual")
    .required("La fecha es requerida"),
});

const datosDePrueba = [
  {
    cons_id: 1,
    cons_nombre: "Activo 1",
    cons_marca: "Marca 1",
    cons_estado: "Bueno",
    cons_custodio: "Custodio 1",
    cons_clase: "Clase 1",
    cons_ubicacion: "Ubicación 1",
    cons_fecha: "2023-10-04",
  },
  {
    cons_id: 2,
    cons_nombre: "Activo 2",
    cons_marca: "Marca 2",
    cons_estado: "Robado",
    cons_custodio: "Custodio 2",
    cons_clase: "Clase 2",
    cons_ubicacion: "Ubicación 2",
    cons_fecha: "2023-10-05",
  },
];

function ConsultaActivos() {
  const styles = useStyles();
  const [data, setData] = useState([datosDePrueba]);
  // const [datatp /* , setDatatp */] = useState([]);
  // const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [activoseleccionado, setActivoSeleccionado] = useState({
    cons_id: 0,
    cons_nombre: "",
    cons_marca: "",
    cons_estado: "",
    cons_custodio: "",
    cons_clase: "",
    cons_ubicacion: "",
    cons_fecha: 0,
  });

  // const abrircerrarModalInsertar = () => {
  //   setModalInsertar(!modalinsertar);
  // };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
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

  const handleEdit = (rowData) => {
    setActivoSeleccionado(rowData);
    abrircerrarModalEditar();
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setActivoSeleccionado((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleCloseModalEditar = () => {
  //   setModalEditar(false);
  // };

  const validarConsulta = async (values, { resetForm }) => {
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
  //   // };
  //   // const peticionput = async () => {
  //   //   setModalEditar(!modaleditar);
  //   //   if (
  //   //     empleadoseleccionado.pue_Codigo === 0 ||
  //   //     empleadoseleccionado.emp_Nombre === "" ||
  //   //     empleadoseleccionado.emp_Apellido === "" ||
  //   //     empleadoseleccionado.emp_Direccion === "" ||
  //   //     empleadoseleccionado.emp_Telefono === 0 ||
  //   //     empleadoseleccionado.emp_Dpi === "" ||
  //   //     empleadoseleccionado.emp_Edad === 0 ||
  //   //     empleadoseleccionado.emp_Nacimiento === 0
  //   //   ) {
  //   //     abrircerrarModalEditar();
  //   //     Swal.close();
  //   //     Swal.fire({
  //   //       icon: "info",
  //   //       title: "",
  //   //       html: "Debe de llenar <b>todos</b> los campos",
  //   //     });
  //   //   } else {
  //   //     abrircerrarModalEditar();
  //   //     Swal.showLoading();
  //   //     await axios
  //   //       .put("https://localhost:7235/api/Empleados/actualizar", empleadoseleccionado)
  //   //       .then(() => {
  //   //         const copiaArray = [...data];
  //   //         const indice = copiaArray.findIndex(
  //   //           (elemento) => elemento.emp_Codigo === empleadoseleccionado.emp_Codigo
  //   //         );
  //   //         if (indice !== -1) {
  //   //           copiaArray[indice] = {
  //   //             ...copiaArray[indice],
  //   //             pue_Codigo: empleadoseleccionado.pue_Codigo,
  //   //             emp_Nombre: empleadoseleccionado.emp_Nombre,
  //   //             emp_Apellido: empleadoseleccionado.emp_Apellido,
  //   //             emp_Direccion: empleadoseleccionado.emp_Direccion,
  //   //             emp_Telefono: empleadoseleccionado.emp_Telefono,
  //   //             emp_Dpi: empleadoseleccionado.emp_Dpi,
  //   //             emp_Edad: empleadoseleccionado.emp_Edad,
  //   //             emp_Nacimiento: empleadoseleccionado.emp_Nacimiento,
  //   //             emp_Nolicencia: empleadoseleccionado.emp_Nolicencia,
  //   //             emp_Tipolicencia: empleadoseleccionado.emp_Tipolicencia,
  //   //           };
  //   //         }
  //   //         setData(copiaArray);
  //   //         Swal.close();
  //   //         Swal.fire({
  //   //           icon: "success",
  //   //           title: "",
  //   //           text: "Empleado actualizado exitosamente",
  //   //           timer: 2500,
  //   //         });
  //   //       })
  //   //       .catch((error) => {
  //   //         Swal.close();
  //   //         Swal.fire({
  //   //           icon: "error",
  //   //           title: "",
  //   //           text: error.response.data,
  //   //           timer: 2500,
  //   //         });
  //   //       });
  //   //   }
  // };

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
    setData(datosDePrueba);
  }, []);

  if (!showComponent) {
    return null;
  }

  // const bodyInsertar = (
  //   <div className={styles.modal}>
  //     <MDTypography variant="h3"> Cambio de Estado de Activos </MDTypography>
  //     <Divider sx={{ marginTop: 1 }} light={false} />
  //     <MDBox pb={1}>
  //       <Grid container spacing={3} justifyContent="center">
  //         <Grid item xs={12} md={4} lg={5}>
  //           <MDBox mb={4}>
  //             <MDTypography variant="h6"> Seleccione Activos: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={4}>
  //             <select name="pue_Codigo" className="form-control" onChange={handleChange} multiple>
  //               <option key="0" value="0">
  //                 Seleccione Activos
  //               </option>
  //               <option key="0" value="0">
  //                 Activo 1
  //               </option>
  //               <option key="0" value="0">
  //                 Activo 2
  //               </option>
  //               <option key="0" value="0">
  //                 Activo 3
  //               </option>
  //               <option key="0" value="0">
  //                 Activo 4
  //               </option>
  //               <option key="0" value="0">
  //                 Activo 5
  //               </option>
  //               {/* {datatp.map((element) => (
  //                 <option key={element.pue_Codigo} value={element.pue_Codigo}>
  //                   {element.pue_Nombre}
  //                 </option>
  //               ))} */}
  //             </select>
  //           </MDBox>
  //         </Grid>
  //       </Grid>
  //       <Grid container spacing={3} justifyContent="center">
  //         <Grid item xs={12} md={4} lg={5}>
  //           <MDBox mb={4}>
  //             <MDTypography variant="h6"> Nuevo Estado: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={4}>
  //             <select name="pue_Codigo" className="form-control" onChange={handleChange}>
  //               <option key="0" value="0">
  //                 Seleccione Nuevo Estado
  //               </option>
  //               <option key="0" value="0">
  //                 Bueno
  //               </option>
  //               <option key="0" value="0">
  //                 Robado
  //               </option>
  //               <option key="0" value="0">
  //                 Desaparecido
  //               </option>
  //               <option key="0" value="0">
  //                 Perdido
  //               </option>
  //               {/* {datatp.map((element) => (
  //                 <option key={element.pue_Codigo} value={element.pue_Codigo}>
  //                   {element.pue_Nombre}
  //                 </option>
  //               ))} */}
  //             </select>
  //           </MDBox>
  //         </Grid>
  //       </Grid>
  //       <Grid container spacing={3} justifyContent="center" mb={1}>
  //         <Grid item xs={12} md={4} lg={4}>
  //           <MDButton
  //             variant="gradient"
  //             color="info"
  //             fullWidth
  //             onClick={() => abrircerrarModalEditar()}
  //           >
  //             Cambiar Estado
  //           </MDButton>
  //         </Grid>
  //         <Grid item xs={12} md={4} lg={4}>
  //           <MDButton
  //             variant="gradient"
  //             color="light"
  //             fullWidth
  //             onClick={() => abrircerrarModalInsertar()}
  //           >
  //             Cancelar
  //           </MDButton>
  //         </Grid>
  //       </Grid>
  //     </MDBox>
  //   </div>
  // );

  const bodyEditar = (
    <div className={styles.modal}>
      <h2> Información Activo </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cons_nombre: "",
            cons_marca: "",
            cons_estado: "",
            cons_custodio: "",
            cons_clase: "",
            cons_ubicacion: "",
            cons_fecha: "",
          }}
          validationSchema={validationSchema}
          onSubmit={validarConsulta}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <MDTypography variant="h6"> Nombre Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="compra_nombreActivo"
                      id="compra_nombreActivo"
                      type="text"
                      placeholder="Nombre"
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage name="compra_nombreActivo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={2}>
                    <MDTypography variant="h6"> Marca: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2}>
                    <Field
                      as="select"
                      id="compra_marcaAct"
                      name="compra_marcaAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Marca:
                      </option>
                      <option key="1" value="opcion1">
                        Marca 1
                      </option>
                      <option key="2" value="opcion2">
                        Marca 2
                      </option>
                      <option key="3" value="opcion3">
                        Marca 3
                      </option>
                      <option key="4" value="opcion4">
                        Marca 4
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_marcaAct" component="small" className="error" />
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={2}>
                    <MDTypography variant="h6"> Estado: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2}>
                    <Field
                      as="select"
                      id="compra_estadoAct"
                      name="compra_estadoAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Estado
                      </option>
                      <option key="1" value="opcion1">
                        Estado 1
                      </option>
                      <option key="2" value="opcion2">
                        Estado 2
                      </option>
                      <option key="3" value="opcion3">
                        Estado 3
                      </option>
                      <option key="4" value="opcion4">
                        Estado 4
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_estadoAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={4} mt={2}>
                    <MDTypography variant="h6"> Nombre Custodio: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={2}>
                    <Field
                      as="select"
                      id="compra_custodioAct"
                      name="compra_custodioAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Custodio:
                      </option>
                      <option key="1" value="opcion1">
                        Gustavo
                      </option>
                      <option key="2" value="opcion2">
                        Axel
                      </option>
                      <option key="3" value="opcion3">
                        Wesley
                      </option>
                      <option key="4" value="opcion4">
                        Werner
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_custodioAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Ubicación Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="compra_ubicacionAct"
                      name="compra_ubicacionAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Ubicación
                      </option>
                      <option key="1" value="opcion1">
                        Oficina Administración 1
                      </option>
                      <option key="2" value="opcion2">
                        Cafetería 2
                      </option>
                      <option key="3" value="opcion3">
                        Planta 3
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_ubicacionAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Clase Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="compra_claseAct"
                      name="compra_claseAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione una Clase:
                      </option>
                      <option key="1" value="opcion1">
                        Mobiliario y Equipo
                      </option>
                      <option key="2" value="opcion2">
                        Vehículos
                      </option>
                      <option key="3" value="opcion3">
                        Maquinaria
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_claseAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={7}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Fecha de Ingreso del Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaIngreso"
                      id="compra_fechaIngreso"
                      type="date"
                      className="form-control"
                      // value={
                      //   TransferenciaSeleccionada &&
                      //   TransferenciaSeleccionada.transfAct_observaciones
                      // }
                    />
                  </MDBox>
                  <ErrorMessage name="compra_fechaIngreso" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="aceptar"
                    endIcon={<SaveIcon />}
                    type="submit"
                    fullWidth
                    // onClick={() => peticionpost}
                  >
                    Aceptar
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
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
        Deseas Eliminar el Activo?
        <b> {activoseleccionado && activoseleccionado.emp_Nombre}</b>?
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
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Mantenimiento Activos"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Activo",
                      onClick: (event, rowData) => handleEdit(rowData),
                    },
                    // {
                    //   icon: "delete",
                    //   tooltip: "Eliminar Activo",
                    //   onClick: (event, rowData) => abrircerrarModalEliminar(),
                    // },
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

                {/* <Modal open={modalinsertar} onClose={abrircerrarModalInsertar}>
                  {bodyInsertar}
                </Modal> */}

                <Modal open={modaleditar} onClose={abrircerrarModalEditar}>
                  {bodyEditar}
                </Modal>

                <Modal open={modaleliminar} onClose={abrircerrarModalEliminar}>
                  {bodyEliminar}
                </Modal>
              </div>
            </Card>
            {/* <footer>  </footer> */}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default ConsultaActivos;
