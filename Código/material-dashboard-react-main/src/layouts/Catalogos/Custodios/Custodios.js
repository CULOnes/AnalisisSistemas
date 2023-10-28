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
import "./Custodios.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

const columns = [
  {
    title: "ID",
    field: "cus_Codigo",
  },
  {
    title: "DPI",
    field: "cus_DPI",
  },
  {
    title: "Nombre",
    field: "cus_Nombre",
  },
  {
    title: "Apellido",
    field: "cus_Apellido",
  },
  {
    title: "Cargo",
    field: "cus_Cargo",
  },
];

const valSchema = Yup.object().shape({
  cus_DPI: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .required("El DPI es requerido")
    .max(13, "El DPI no puede tener más de 13 numeros")
    .min(13, "El DPI no puede tener menos de 13 numeros"),
  cus_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del custodio es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cus_Apellido: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El apellido del custodio es requerido")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  cus_Cargo: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El cargo es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  suc_Codigo: Yup.number().required("Este campo es requerido"),
  dep_Codigo: Yup.number().required("Este campo es requerido"),
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

function Custodios() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [datasuc, setDatasuc] = useState([]);
  const [datadep, setDatadep] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [custodioSeleccionado, setCustodioSeleccionado] = useState({
    cus_DPI: 0,
    cus_Nombre: "",
    cus_Apellido: "",
    cus_Cargo: "",
    suc_Codigo: 0,
    dep_Codigo: 0,
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

  const seleccionarCustodio = (custodio, caso) => {
    setCustodioSeleccionado(custodio);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (
      values.cus_DPI === 0 ||
      values.cus_Nombre === "" ||
      values.cus_Apellido === "" ||
      values.cus_Cargo === "" ||
      values.suc_Codigo === 0 ||
      values.dep_Codigo === 0
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
        .post("https://localhost:7235/api/Custodios/registrocustodios", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Custodio creado exitosamente",
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
    if (
      values.cus_DPI === 0 ||
      values.cus_Nombre === "" ||
      values.cus_Apellido === "" ||
      values.cus_Cargo === "" ||
      values.suc_Codigo === 0 ||
      values.dep_Codigo === 0
    ) {
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
        .put("https://localhost:7235/api/Custodios/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.cus_Codigo === values.cus_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              cus_DPI: values.cus_DPI,
              cus_Nombre: values.cus_Nombre,
              cus_Apellido: values.cus_Apellido,
              cus_Cargo: values.cus_Cargo,
              suc_Codigo: values.suc_Codigo,
              dep_Codigo: values.dep_Codigo,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Custodio actualizado exitosamente",
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
      .put("https://localhost:7235/api/Custodios/eliminar", custodioSeleccionado)
      .then(() => {
        setData(data.filter((custodio) => custodio.cus_Codigo !== custodioSeleccionado.cus_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Custodio eliminado exitosamente",
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
      .get("https://localhost:7235/api/Custodios/custodios")
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

  const peticiongetsuc = async () => {
    await axios
      .get("https://localhost:7235/api/Sucursales/sucursales")
      .then((response) => {
        setDatasuc(response.data);
      })
      .catch();
  };

  const peticiongetde = async () => {
    await axios
      .get("https://localhost:7235/api/Departamentos/departamentos")
      .then((response) => {
        setDatadep(response.data);
      })
      .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongetsuc();
    peticiongetde();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nuevo Custodio </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1} mb={2} mt={2}>
        <Formik
          initialValues={{
            cus_DPI: 0,
            cus_Nombre: "",
            cus_Apellido: "",
            cus_Cargo: "",
            suc_Codigo: 0,
            dep_Codigo: 0,
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={1} pb={4}>
                    <h4> DPI: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="cus_DPI"
                      id="cus_DPI"
                      type="number"
                      className="form-control"
                      placeholder="DPI"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_DPI" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Cargo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Cargo"
                      id="cus_Cargo"
                      type="text"
                      className="form-control"
                      placeholder="Cargo del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Cargo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Nombre: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Nombre"
                      id="cus_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Apellido: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Apellido"
                      id="cus_Apellido"
                      type="text"
                      className="form-control"
                      placeholder="Apellido del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Apellido" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Sucursal: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field as="select" id="suc_Codigo" name="suc_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione una Sucursal:
                      </option>
                      {datasuc.map((element) => (
                        <option key={element.suc_Codigo} value={element.suc_Codigo}>
                          {element.suc_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="suc_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Departamento: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field as="select" id="dep_Codigo" name="dep_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione un Departamento:
                      </option>
                      {datadep.map((element) => (
                        <option key={element.dep_Codigo} value={element.dep_Codigo}>
                          {element.dep_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="dep_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1} mt={2}>
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
      <h2> Editar Custodio </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Formik
          initialValues={{
            cus_DPI: custodioSeleccionado && custodioSeleccionado.cus_DPI,
            cus_Nombre: custodioSeleccionado && custodioSeleccionado.cus_Nombre,
            cus_Apellido: custodioSeleccionado && custodioSeleccionado.cus_Apellido,
            cus_Cargo: custodioSeleccionado && custodioSeleccionado.cus_Cargo,
            suc_Codigo: custodioSeleccionado && custodioSeleccionado.suc_Codigo,
            dep_Codigo: custodioSeleccionado && custodioSeleccionado.dep_Codigo,
            cus_Codigo: custodioSeleccionado && custodioSeleccionado.cus_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mb={1} pb={4}>
                    <h4> DPI: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="cus_DPI"
                      id="cus_DPI"
                      type="number"
                      className="form-control"
                      placeholder="DPI"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_DPI" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Cargo: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Cargo"
                      id="cus_Cargo"
                      type="text"
                      className="form-control"
                      placeholder="Cargo del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Cargo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Nombre: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Nombre"
                      id="cus_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Apellido: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="cus_Apellido"
                      id="cus_Apellido"
                      type="text"
                      className="form-control"
                      placeholder="Apellido del custodio"
                    />
                  </MDBox>
                  <ErrorMessage name="cus_Apellido" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Sucursal: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field as="select" id="suc_Codigo" name="suc_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione una Sucursal:
                      </option>
                      {datasuc.map((element) => (
                        <option key={element.suc_Codigo} value={element.suc_Codigo}>
                          {element.suc_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="suc_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={2} pb={4}>
                    <h4> Departamento: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mt={2}>
                    <Field as="select" id="dep_Codigo" name="dep_Codigo" className="form-control">
                      <option key="0" value="0">
                        Seleccione un Departamento:
                      </option>
                      {datadep.map((element) => (
                        <option key={element.dep_Codigo} value={element.dep_Codigo}>
                          {element.dep_Nombre}
                        </option>
                      ))}
                    </Field>
                  </MDBox>
                  <ErrorMessage name="dep_Codigo" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" mb={1} mt={2}>
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
        Deseas Eliminar el Custodio
        <b> {custodioSeleccionado && custodioSeleccionado.cus_Nombre}</b>?
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
                  Insertar Custodio
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Custodios"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Custodio",
                      onClick: (event, rowData) => seleccionarCustodio(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Custodio",
                      onClick: (event, rowData) => seleccionarCustodio(rowData, "Eliminar"),
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

export default Custodios;

// // import PropTypes from 'prop-types'
// import React from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// // Material Dashboard 2 React example components
// import DataTable from "examples/Tables/DataTable";

// // Data
// import TablaEmpleados from "layouts/Catalogos/Empleados/TablaEmpleados";

// function Empleados() {
//   const { columns, rows } = TablaEmpleados();
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Nombre:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="text" label="Nombre" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Apellido:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="text" label="Apellido" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Direccion:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="text" label="Direccion" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Telefono/Celular:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="number" label="Telefono/Celular" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">DPI:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="number" label="DPI" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Edad:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="number" label="Edad" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Fecha de Nacimiento:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="date" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={1}>
//                 <MDTypography variant="h6">Puesto:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1}>
//                 <MDInput type="text" label="Puesto" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDButton variant="gradient" color="info" fullWidth>
//                 Crear
//               </MDButton>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </Card>
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default Empleados;
