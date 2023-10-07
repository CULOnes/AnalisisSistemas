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
import MDInput from "components/MDInput";
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
    field: "cc_Codigo",
  },
  {
    title: "Nombre Centro de Costo",
    field: "cc_nombre",
  },
  {
    title: "Descripción Centro de Costo",
    field: "cc_descripcion",
  },
  {
    title: "Cuenta Centro de Costo",
    field: "cc_cuenta",
  },
];

const valSchema = Yup.object().shape({
  cc_nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del Centro de Costo es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cc_descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres")
    .matches(/^[a-zA-ZñÑ0-9,. -]*$/, "Caracter no permitido"),
  cc_cuenta: Yup.number()
    .typeError("La cuenta debe ser un número")
    .required("La cuenta es requerida")
    .positive("La cuenta debe ser un número positivo")
    .integer("La cuenta debe ser un número entero"),
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
  const [data /* , setData */] = useState([]);
  /* const [datatp, setDatatp] = useState([]); */
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [CentroCostoSeleccionado, setCentroCostoSeleccionado] = useState({
    cc_codigo: 0,
    cc_nombre: "",
    cc_descripcion: "",
    cc_cuenta: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentroCostoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (values, { resetForm }) => {
    // eslint-disable-next-line no-console
    console.log("Envío de Formulario:", values);
    resetForm();

    Swal.fire({
      icon: "success",
      title: "Formulario Enviado",
      text: "El formulario se ha enviado con éxito",
      timer: 2500, // Controla cuánto tiempo se muestra el mensaje (en milisegundos)
      timerProgressBar: true, // Muestra una barra de progreso durante el tiempo de visualización
    });
  };

  const peticionpost = async () => {
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
  };

  const peticionput = async () => {
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

  // const peticiongettp = async () => {
  //   await axios
  //     .get("https://localhost:7235/api/Puestos/puestos")
  //     .then((response) => {
  //       setDatatp(response.data);
  //     })
  //     .catch();
  // };

  useEffect(() => {
    peticionget();
    // peticiongettp();
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
        {/* <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Nombre Centro Costo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <select name="pue_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione el Puesto
                </option>
                {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid> */}
        <Formik
          initialValues={{
            cc_nombre: "",
            cc_descripcion: "",
            cc_cuenta: "",
          }}
          validationSchema={valSchema}
          onSubmit={onSubmit}
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
                      name="cc_nombre"
                      id="cc_nombre"
                      type="text"
                      placeholder="Centro Costo"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_nombre" component="small" className="error" />
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
                    <Field
                      as={OutlinedInput}
                      name="cc_cuenta"
                      id="cc_cuenta"
                      type="number"
                      placeholder="Cuenta"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_cuenta" component="small" className="error" />
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
                      name="cc_descripcion"
                      id="cc_descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_descripcion" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mt={2}>
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
                  {/* <MDButton variant="gradient" color="info" fullWidth type="submit">
                    Insertar
                  </MDButton> */}
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
                  {/* <MDButton
                    variant="gradient"
                    color="light"
                    fullWidth
                    onClick={() => abrircerrarModalInsertar()}
                  >
                    Cancelar
                  </MDButton> */}
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
      <MDTypography variant="h3"> Editar Centro de Costo </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        {/* <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Puesto: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <select
                name="pue_Codigo"
                className="form-control"
                onChange={handleChange}
                value={CentroCostoSeleccionado && CentroCostoSeleccionado.pue_Codigo}
              >
                <option key="0" value="0">
                  Seleccione el Puesto
                </option>
                {datatp.map((element) => (
                  <option key={element.pue_Codigo} value={element.pue_Codigo}>
                    {element.pue_Nombre}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Nombre Centro Costo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre Centro de Costo"
                name="cc_nombre"
                onChange={handleChange}
                size="small"
                value={CentroCostoSeleccionado && CentroCostoSeleccionado.cc_nombre}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Descripción Centro Costo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Descripción Centro de Costo"
                name="cc_descripcion"
                type="text"
                onChange={handleChange}
                size="small"
                value={CentroCostoSeleccionado && CentroCostoSeleccionado.cc_descripcion}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Cuenta Centro Costo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Cuenta Centro de Costo"
                name="cc_cuenta"
                type="number"
                size="small"
                onChange={handleChange}
                value={CentroCostoSeleccionado && CentroCostoSeleccionado.cc_cuenta}
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
        ¿Deseas Eliminar el Centro de Costo
        <b> {CentroCostoSeleccionado && CentroCostoSeleccionado.cc_nombre}</b>?
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
