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
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CompraActivos.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "compra_id",
  },
  {
    title: "Número Factura",
    field: "compra_factura",
  },
  {
    title: "Fecha de Ingreso",
    field: "compra_fechaI",
  },
  {
    title: "Fecha de Factura",
    field: "compra_fechaF",
  },
  {
    title: "Proveedor",
    field: "compra_proveedor",
  },
  {
    title: "Total",
    field: "compra_total",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "5%",
    position: "absolute",
    width: 850,
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

const FacturavalidationSchema = Yup.object().shape({
  compra_Numfactura: Yup.number()
    .typeError("La factura debe ser un número")
    .required("La factura es requerida")
    .positive("La factura no puede tener números negativos")
    .integer("La factura no puede contener números decimales"),
  compra_fechaIngreso: Yup.date()
    .max(new Date(), "La fecha no puede ser mayor que la fecha actual")
    .required("La fecha es requerida"),
  // .min(new Date(), "La fecha no puede ser menor a la actual"),
  compra_fechaFactura: Yup.date()
    .required("La fecha es requerida")
    .max(new Date(), "La fecha no puede ser mayor que la fecha actual"),
  compra_proveedor: Yup.string().required("El proveedor es requerido"),
});

const ActivoValidationSchema = Yup.object().shape({
  compra_nombreActivo: Yup.string()
    .required("El nombre es requerido")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .matches(/^[a-zA-ZñÑ0-9,. -]*$/, "Caracter no permitido"),
  compra_precioAct: Yup.number()
    .required("El precio es requerido")
    .positive("El precio no puede tener números negativos")
    .test(
      "validar-precio",
      "El precio debe tener el formato correcto, por ejemplo, 100 o 100.50",
      (value) => {
        const regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(value);
      }
    ),
  compra_marcaAct: Yup.string().required("La marca es requerida"),
  compra_estadoAct: Yup.string().required("El estado es requerido"),
});

const ClasificacionValidationSchema = Yup.object().shape({
  compra_custodioAct: Yup.string().required("El custodio es requerido"),
  compra_centroCostoAct: Yup.string().required("El Centro de Costo es requerido"),
  compra_cuentaAct: Yup.string().required("La cuenta es requerida"),
  compra_ubicacionAct: Yup.string().required("La ubicación es requerida"),
  compra_claseAct: Yup.string().required("La clase es requerida"),
});

const DepreciaciónValidationSchema = Yup.object().shape({
  compra_vidaUtilAct: Yup.number()
    .typeError("La Vida Útil debe ser un número entero")
    .required("La Vida Útil es requerida")
    .positive("No se pueden ingresar números negativos")
    .integer("El campo no puede contener número decimales"),
  compra_fechaInicioDeprec: Yup.date()
    .required("La fecha es requerida")
    .min(new Date(), "La fecha no puede ser menor que la fecha actual"),
  // compra_valorDepreciar: Yup.number()
  //   .typeError("El valor a depreciar debe ser un número")
  //   .required("El valor a depreciar es requerido")
  //   .test(
  //     "validar-valor",
  //     "El valor a depreciar debe tener el formato correcto, por ejemplo, 100 o 100.50",
  //     (value) => {
  //       const regex = /^\d+(\.\d{1,2})?$/;
  //       return regex.test(value);
  //     }
  //   )
  //   .positive("El valor a depreciar no puede tener números negativos"),
});

const MantenimientoValidationSchema = Yup.object().shape({
  compra_fechaFinalSeguro: Yup.date()
    .required("La fecha es requerida")
    .min(new Date(), "La fecha no puede ser menor que la fecha actual"),
  compra_montoAsegurado: Yup.number()
    .required("El monto es requerido")
    .test(
      "validar-precio",
      "El precio debe tener el formato correcto, por ejemplo, 100 o 100.50",
      (value) => {
        const regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(value);
      }
    )
    .positive("El precio no puede tener números negativos"),
  compra_fechaFinalGarantia: Yup.date()
    .required("La fecha es requerida")
    .min(new Date(), "La fecha no puede ser menor a la actual"),
});

function TransferenciaActivos() {
  const styles = useStyles();
  const [data /* , setData */] = useState([]);
  // const [datatp /* , setDatatp */] = useState([]);
  const [modalFactura, setModalFactura] = useState(false);
  const [modalActivo, setModalActivo] = useState(false);
  const [modalClasificacion, setModalClasificacion] = useState(false);
  const [modalDepreciacion, setModalDepreciacion] = useState(false);
  const [modalMantenimiento, setModalMantenimiento] = useState(false);
  // const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [compraSeleccionada /* setCompraSeleccionada */] = useState({
    compra_id: 0,
    compra_idActivo: 0,
    compra_Numfactura: 0,
    compra_fechaIngreso: 0,
    compra_fechaFactura: 0,
    compra_proveedor: 0,
    compra_total: 0,
    compra_nombreActivo: 0,
    compra_marcaAct: 0,
    compra_estadoAct: 0,
    compra_precioAct: 0,
    compra_custodioAct: 0,
    compra_centroCostoAct: 0,
    compra_cuentaAct: 0,
    compra_ubicacionAct: 0,
    compra_claseAct: 0,
    compra_vidaUtilAct: 0,
    compra_fechaInicioDeprec: 0,
    compra_valorDepreciar: 0,
    compra_fechaProxMantenimiento: 0,
    compra_fechaInicialSeguro: 0,
    compra_fechaFinalSeguro: 0,
    compra_montoAsegurado: 0,
    compra_fechaInicialGarantia: 0,
    compra_fechaFinalGarantia: 0,
  });

  const abrircerrarModalFactura = () => {
    setModalFactura(!modalFactura);
  };

  const abrircerrarModalActivo = () => {
    setModalActivo(!modalActivo);
  };

  const abrircerrarModalClasificacion = () => {
    setModalClasificacion(!modalClasificacion);
  };

  const abrircerrarModalDepreciacion = () => {
    setModalDepreciacion(!modalDepreciacion);
  };

  const abrircerrarModalMantenimiento = () => {
    setModalMantenimiento(!modalMantenimiento);
  };

  const abrircerrarModalFormulario = () => {
    setModalMantenimiento(!modalMantenimiento);
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
  //   setCompraSeleccionada((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const peticionpost = async () => {
  //   // Swal.showLoading();
  //   // if (compraSeleccionada.compra_proveedor === 0) {
  //   //   Swal.fire({
  //   //     icon: "info",
  //   //     title: "",
  //   //     text: "Debe seleccionar un proveedor",
  //   //   });
  //   // } else {
  //   //   abrircerrarModalActivo();
  //   //   //   await axios
  //   //   //     .post("https://localhost:7235/api/Empleados/registroempleados", empleadoseleccionado)
  //   //   //     .then((response) => {
  //   //   //       setData(data.concat(response.data));
  //   //   //       Swal.close();
  //   //   //       Swal.fire({
  //   //   //         icon: "success",
  //   //   //         title: "",
  //   //   //         text: "Empleado creado exitosamente",
  //   //   //         timer: 2500,
  //   //   //       });
  //   //   //     })
  //   //   //     .catch((error) => {
  //   //   //       Swal.close();
  //   //   //       Swal.fire({
  //   //   //         icon: "error",
  //   //   //         title: "",
  //   //   //         text: error.response.data,
  //   //   //         timer: 2500,
  //   //   //       });
  //   //   //     });
  //   // }
  // };

  // const peticionput = async () => {
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
  //   //   abrircerrarModalEditar();
  //   //   Swal.close();
  //   //   Swal.fire({
  //   //     icon: "info",
  //   //     title: "",
  //   //     html: "Debe de llenar <b>todos</b> los campos",
  //   //   });
  //   // } else {
  //   //   abrircerrarModalEditar();
  //   //   Swal.showLoading();
  //   //   await axios
  //   //     .put("https://localhost:7235/api/Empleados/actualizar", empleadoseleccionado)
  //   //     .then(() => {
  //   //       const copiaArray = [...data];
  //   //       const indice = copiaArray.findIndex(
  //   //         (elemento) => elemento.emp_Codigo === empleadoseleccionado.emp_Codigo
  //   //       );
  //   //       if (indice !== -1) {
  //   //         copiaArray[indice] = {
  //   //           ...copiaArray[indice],
  //   //           pue_Codigo: empleadoseleccionado.pue_Codigo,
  //   //           emp_Nombre: empleadoseleccionado.emp_Nombre,
  //   //           emp_Apellido: empleadoseleccionado.emp_Apellido,
  //   //           emp_Direccion: empleadoseleccionado.emp_Direccion,
  //   //           emp_Telefono: empleadoseleccionado.emp_Telefono,
  //   //           emp_Dpi: empleadoseleccionado.emp_Dpi,
  //   //           emp_Edad: empleadoseleccionado.emp_Edad,
  //   //           emp_Nacimiento: empleadoseleccionado.emp_Nacimiento,
  //   //           emp_Nolicencia: empleadoseleccionado.emp_Nolicencia,
  //   //           emp_Tipolicencia: empleadoseleccionado.emp_Tipolicencia,
  //   //         };
  //   //       }
  //   //       setData(copiaArray);
  //   //       Swal.close();
  //   //       Swal.fire({
  //   //         icon: "success",
  //   //         title: "",
  //   //         text: "Empleado actualizado exitosamente",
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

  // const onSubmit = (values, { resetForm }) => {
  //   // eslint-disable-next-line no-console
  //   console.log("Envío de Formulario:", values);
  //   resetForm();
  // };

  const validarFactura = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalFactura();
    abrircerrarModalActivo();
  };

  const validarActivo = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalActivo();
    abrircerrarModalClasificacion();
  };

  const validarClasificacion = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalClasificacion();
    abrircerrarModalDepreciacion();
  };

  const validarDepreciacion = (values, { resetForm }) => {
    console.log("Envío de Formulario:", values);
    resetForm();

    abrircerrarModalDepreciacion();
    abrircerrarModalMantenimiento();
  };

  const validarMatenimiento = (values, { resetForm }) => {
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

  const bodyFactura = (
    <div className={styles.modal}>
      <h2> Agregar Factura </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            compra_Numfactura: "",
            compra_fechaIngreso: "",
            compra_fechaFactura: "",
            compra_proveedor: "",
          }}
          validationSchema={FacturavalidationSchema}
          onSubmit={validarFactura}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Número Factura: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_Numfactura"
                      id="compra_Numfactura"
                      type="number"
                      placeholder="Factura"
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage name="compra_Numfactura" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={6}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Fecha de Ingreso del Activo: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
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
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Fecha de Factura: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaFactura"
                      id="compra_fechaFactura"
                      type="date"
                      className="form-control"
                      // value={
                      //   TransferenciaSeleccionada &&
                      //   TransferenciaSeleccionada.transfAct_observaciones
                      // }
                    />
                  </MDBox>
                  <ErrorMessage name="compra_fechaFactura" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4} mt={1}>
                    <MDTypography variant="h6"> Proveedor: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="compra_proveedor"
                      name="compra_proveedor"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Proveedor
                      </option>
                      <option key="1" value="opcion1">
                        Proveedor 1
                      </option>
                      <option key="2" value="opcion2">
                        Proveedor 2
                      </option>
                      <option key="3" value="opcion3">
                        Proveedor 3
                      </option>
                      <option key="4" value="opcion4">
                        Proveedor 4
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_proveedor" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4} mt={2}>
                    <MDTypography variant="h6"> Total de la Compra: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="compra_total"
                      id="compra_total"
                      type="number"
                      className="form-control"
                      readOnly
                      // value={
                      //   TransferenciaSeleccionada &&
                      //   TransferenciaSeleccionada.transfAct_observaciones
                      // }
                    />
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
                  >
                    Siguiente
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalFactura()}
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

  const bodyActivo = (
    <div className={styles.modal}>
      <h2> Información Activo </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            compra_nombreActivo: "",
            compra_marcaAct: "",
            compra_estadoAct: "",
            compra_precioAct: "",
          }}
          validationSchema={ActivoValidationSchema}
          onSubmit={validarActivo}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4}>
                    <h4> Nombre Activo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
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
                    <h4> Marca: </h4>
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
                    <h4> Estado: </h4>
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
                        Seleccione Estado:
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
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={2}>
                    <h4> Precio: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={10}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="compra_precioAct"
                      id="compra_precioAct"
                      type="number"
                      placeholder="Precio"
                      className="form-control"
                      // value={
                      //   TransferenciaSeleccionada &&
                      //   TransferenciaSeleccionada.transfAct_observaciones
                      // }
                    />
                  </MDBox>
                  <ErrorMessage name="compra_precioAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="aceptar"
                    endIcon={<ArrowForwardIosIcon />}
                    type="submit"
                    fullWidth
                  >
                    Siguiente
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalActivo()}
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

  const bodyClasificacion = (
    <div className={styles.modal}>
      <h2> Clasificación y Custodio </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            compra_custodioAct: "",
            compra_centroCostoAct: "",
            compra_cuentaAct: "",
            compra_ubicacionAct: "",
            compra_claseAct: "",
          }}
          validationSchema={ClasificacionValidationSchema}
          onSubmit={validarClasificacion}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <h4> Nombre Custodio: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
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
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4} mt={1}>
                    <h4> Centro de Costo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="compra_centroCostoAct"
                      name="compra_centroCostoAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Centro de Costo:
                      </option>
                      <option key="1" value="opcion1">
                        Administración
                      </option>
                      <option key="2" value="opcion2">
                        Ventas
                      </option>
                      <option key="3" value="opcion3">
                        Informática
                      </option>
                      <option key="4" value="opcion4">
                        Logística
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_centroCostoAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Cuenta: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={1}>
                    <Field
                      as="select"
                      id="compra_cuentaAct"
                      name="compra_cuentaAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Cuenta:
                      </option>
                      <option key="1" value="opcion1">
                        Cuenta 1
                      </option>
                      <option key="2" value="opcion2">
                        Cuenta 2
                      </option>
                      <option key="3" value="opcion3">
                        Cuenta 3
                      </option>
                      <option key="4" value="opcion4">
                        Cuenta 4
                      </option>
                      {/* {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))} */}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="compra_cuentaAct" component="small" className="error" />
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Ubicación Activo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2}>
                    <Field
                      as="select"
                      id="compra_ubicacionAct"
                      name="compra_ubicacionAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Ubicación:
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
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4}>
                    <h4> Clase Activo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox>
                    <Field
                      as="select"
                      id="compra_claseAct"
                      name="compra_claseAct"
                      className="form-control"
                      // onChange={handleChange}
                    >
                      <option key="0" value="0">
                        Seleccione Clase:
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
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="aceptar"
                    endIcon={<ArrowForwardIosIcon />}
                    type="submit"
                    fullWidth
                  >
                    Siguiente
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalClasificacion()}
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

  const bodyDepreciacion = (
    <div className={styles.modal}>
      <h2> Depreciación </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            compra_vidaUtilAct: "",
            compra_fechaInicioDeprec: "",
            compra_valorDepreciar: "",
          }}
          validationSchema={DepreciaciónValidationSchema}
          onSubmit={validarDepreciacion}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <h4> Vida Útil (Meses): </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="compra_vidaUtilAct"
                      id="compra_vidaUtilAct"
                      type="number"
                      placeholder="N°"
                      className="form-control"
                      // readOnly
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage name="compra_vidaUtilAct" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={4} mt={2}>
                    <h4> Fecha Inicio Depreciación: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaInicioDeprec"
                      id="compra_fechaInicioDeprec"
                      type="date"
                      className="form-control"
                      // readOnly
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage
                    name="compra_fechaInicioDeprec"
                    component="small"
                    className="error"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={5}>
                  <MDBox mb={4} mt={2}>
                    <h4> Valor a Depreciar Mensual: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <MDBox mb={4} mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="compra_valorDepreciar"
                      id="compra_valorDepreciar"
                      type="number"
                      className="form-control"
                      readOnly
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
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
                  >
                    Siguiente
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalDepreciacion()}
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

  const bodyMantenimiento = (
    <div className={styles.modal}>
      <h2> Mantenimiento y Seguros </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            // compra_fechaProxMantenimiento: "",
            // compra_fechaInicialSeguro: "",
            compra_fechaFinalSeguro: "",
            compra_montoAsegurado: "",
            // compra_fechaInicialGarantia: "",
            compra_fechaFinalGarantia: "",
          }}
          validationSchema={MantenimientoValidationSchema}
          onSubmit={validarMatenimiento}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={4}>
                    <h4> Próximo Mantenimiento: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mb={4}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaProxMantenimiento"
                      id="compra_fechaProxMantenimiento"
                      type="date"
                      className="form-control"
                      readOnly
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Fecha Inicio del Seguro: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaInicialSeguro"
                      id="compra_fechaInicialSeguro"
                      type="date"
                      className="form-control"
                      readOnly
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Fecha Fin del Seguro: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaFinalSeguro"
                      id="compra_fechaFinalSeguro"
                      type="date"
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage
                    name="compra_fechaFinalSeguro"
                    component="small"
                    className="error"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={4} mt={1}>
                    <h4> Monto Asegurado: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_montoAsegurado"
                      id="compra_montoAsegurado"
                      type="number"
                      placeholder="Monto"
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage name="compra_montoAsegurado" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Fecha Inicio de Garantía: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaInicialGarantia"
                      id="compra_fechaInicialGarantia"
                      type="date"
                      readOnly
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                  <MDBox mb={4} mt={1}>
                    <h4> Fecha Fin de Garantía: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={1}>
                    <Field
                      as={OutlinedInput}
                      name="compra_fechaFinalGarantia"
                      id="compra_fechaFinalGarantia"
                      type="date"
                      className="form-control"
                      // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
                    />
                  </MDBox>
                  <ErrorMessage
                    name="compra_fechaFinalGarantia"
                    component="small"
                    className="error"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1}>
                <Grid item xs={12} md={4} lg={3}>
                  <Button className="aceptar" endIcon={<SaveIcon />} type="submit" fullWidth>
                    Confirmar
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Button
                    className="cancelar"
                    endIcon={<ClearIcon />}
                    type="submit"
                    fullWidth
                    onClick={() => abrircerrarModalMantenimiento()}
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

  // const bodyInsertar = (
  //   <div className={styles.modal}>
  //     <MDTypography variant="h3"> Transferencia de Activos </MDTypography>
  //     <Divider sx={{ marginTop: 1 }} light={false} />
  //     <MDBox pb={1}>
  //       <Grid container spacing={3} justifyContent="center">
  //         <Grid item xs={12} md={4} lg={5}>
  //           <MDBox mb={4}>
  //             <MDTypography variant="h6"> Custodio que Entrega: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={1}>
  //             <select
  //               id="transfAct_entrega"
  //               name="transfAct_entrega"
  //               className="form-control"
  //               onBlur={Formik.handleBlur}
  //               onChange={handleChange}
  //             >
  //               <option key="0" value="0">
  //                 Seleccione Custodio:
  //               </option>
  //               <option key="1" value="0">
  //                 Custodio 1
  //               </option>
  //               <option key="2" value="0">
  //                 Custodio 2
  //               </option>
  //               <option key="3" value="0">
  //                 Custodio 3
  //               </option>
  //               <option key="4" value="0">
  //                 Custodio 4
  //               </option>
  //               <option key="5" value="0">
  //                 Custodio 5
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
  //             <MDTypography variant="h6"> Nuevo Custodio: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={1}>
  //             <select name="transfAct_recepcion" className="form-control" onChange={handleChange}>
  //               <option key="0" value="0">
  //                 Seleccione Custodio que Recibe
  //               </option>
  //               <option key="1" value="0">
  //                 Nuevo Custodio 1
  //               </option>
  //               <option key="2" value="0">
  //                 Nuevo Custodio 2
  //               </option>
  //               <option key="3" value="0">
  //                 Nuevo Custodio 3
  //               </option>
  //               <option key="4" value="0">
  //                 Nuevo Custodio 4
  //               </option>
  //               <option key="5" value="0">
  //                 Nuevo Custodio 5
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
  //             <MDTypography variant="h6">Activos a Transferir: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={1}>
  //             <select
  //               name="transfAct_activo"
  //               className="form-control"
  //               onChange={handleChange}
  //               multiple
  //             >
  //               <option key="0" value="0">
  //                 Seleccione Activos
  //               </option>
  //               <option key="1" value="0">
  //                 Activo 1
  //               </option>
  //               <option key="2" value="0">
  //                 Activo 2
  //               </option>
  //               <option key="3" value="0">
  //                 Activo 3
  //               </option>
  //               <option key="4" value="0">
  //                 Activo 4
  //               </option>
  //               <option key="5" value="0">
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
  //             <MDTypography variant="h6"> Ubicación Destino: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={1}>
  //             <select
  //               name="transfAct_ubicacion_dest"
  //               className="form-control"
  //               onChange={handleChange}
  //             >
  //               <option key="0" value="0">
  //                 Seleccione Ubicación Destino
  //               </option>
  //               <option key="1" value="0">
  //                 Ubicación 1
  //               </option>
  //               <option key="2" value="0">
  //                 Ubicación 2
  //               </option>
  //               <option key="3" value="0">
  //                 Ubicación 3
  //               </option>
  //               <option key="4" value="0">
  //                 Ubicación 4
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
  //             <MDTypography variant="h6"> Centro de Costo Destino: </MDTypography>
  //           </MDBox>
  //         </Grid>
  //         <Grid item xs={12} md={6} lg={7}>
  //           <MDBox mb={1}>
  //             <select name="transfAct_cc_dest" className="form-control" onChange={handleChange}>
  //               <option key="0" value="0">
  //                 Seleccione Centro de Costo Destino
  //               </option>
  //               <option key="1" value="0">
  //                 Centro de Costo 1
  //               </option>
  //               <option key="2" value="0">
  //                 Centro de Costo 2
  //               </option>
  //               <option key="3" value="0">
  //                 Centro de Costo 3
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
  //           <Button
  //             className="aceptar"
  //             endIcon={<SaveIcon />}
  //             type="submit"
  //             fullWidth
  //             onClick={() => peticionpost()}
  //           >
  //             Transferir Activos
  //           </Button>
  //         </Grid>
  //         <Grid item xs={12} md={4} lg={4}>
  //           <Button
  //             className="cancelar"
  //             endIcon={<ClearIcon />}
  //             type="submit"
  //             fullWidth
  //             onClick={() => abrircerrarModalFactura()}
  //           >
  //             Cancelar
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </MDBox>
  //   </div>
  // );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        ¿Deseas Eliminar la Transferencia
        <b> {compraSeleccionada && compraSeleccionada.transfAct_codigo}</b>?
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
                  onClick={() => abrircerrarModalFactura()}
                >
                  Mantenimiento de Activos
                </Button>
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

                <Modal open={modalFactura} onClose={abrircerrarModalFactura}>
                  {bodyFactura}
                </Modal>

                <Modal open={modalActivo} onClose={abrircerrarModalActivo}>
                  {bodyActivo}
                </Modal>

                <Modal open={modalClasificacion} onClose={abrircerrarModalClasificacion}>
                  {bodyClasificacion}
                </Modal>

                <Modal open={modalDepreciacion} onClose={abrircerrarModalDepreciacion}>
                  {bodyDepreciacion}
                </Modal>

                <Modal open={modalMantenimiento} onClose={abrircerrarModalMantenimiento}>
                  {bodyMantenimiento}
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

export default TransferenciaActivos;
