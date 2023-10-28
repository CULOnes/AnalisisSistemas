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
import "./Estados.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "est_Codigo",
  },
  {
    title: "Nombre",
    field: "est_Nombre",
  },
  {
    title: "¿Dado de baja?",
    field: "est_Baja",
  },
];

const valSchema = Yup.object().shape({
  est_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del estado es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  est_Descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres"),
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

function Estados() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({
    est_Descripcion: "",
    est_Nombre: "",
    est_Baja: false,
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
    //     clienteseleccionado && clienteseleccionado.cli_Nombre
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

  const seleccionarEstado = (estado, caso) => {
    setEstadoSeleccionado(estado);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (values.est_Nombre === "" || values.est_Descripcion === "") {
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
        .post("https://localhost:7235/api/Estados/registroestados", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Estado creado exitosamente",
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
    if (values.est_Nombre === "" || values.est_Descripcion === "") {
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
        .put("https://localhost:7235/api/Estados/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.est_Codigo === values.est_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              est_Nombre: values.est_Nombre,
              est_Descripcion: values.est_Descripcion,
              est_Baja: values.est_Baja,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Estado actualizado exitosamente",
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
      .put("https://localhost:7235/api/Estados/eliminar", estadoSeleccionado)
      .then(() => {
        setData(data.filter((estado) => estado.est_Codigo !== estadoSeleccionado.est_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Combustible eliminado exitosamente",
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
      .get("https://localhost:7235/api/Estados/estados")
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
      <h2> Agregar Nuevo Estado </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={1}>
        <Formik
          initialValues={{
            est_Nombre: "",
            est_Descripcion: "",
            est_Baja: false,
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={8}>
                  <MDBox mb={2} pb={3}>
                    <h4>En este estado, ¿El activo se considera como dado de baja?</h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={3} mb={2}>
                    <Field type="checkbox" name="est_Baja" id="est_Baja" className="cuadrito" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <h4> Nombre: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="est_Nombre"
                      id="est_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre del estado"
                    />
                  </MDBox>
                  <ErrorMessage name="est_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2} pb={3}>
                    <h4> Descripción: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="est_Descripcion"
                      id="est_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="est_Descripcion" component="small" className="error" />
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
      <h2> Editar Estado </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            est_Nombre: estadoSeleccionado && estadoSeleccionado.est_Nombre,
            est_Descripcion: estadoSeleccionado && estadoSeleccionado.est_Descripcion,
            est_Baja: estadoSeleccionado && estadoSeleccionado.est_Baja,
            est_Codigo: estadoSeleccionado && estadoSeleccionado.est_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={8}>
                  <MDBox mb={2} pb={3}>
                    <MDTypography variant="h6">
                      En este estado, ¿El activo se considera como dado de baja?
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mt={3} mb={2}>
                    <Field type="checkbox" name="est_Baja" id="est_Baja" className="cuadrito" />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2}>
                    <MDTypography variant="h6"> Nombre: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={OutlinedInput}
                      name="est_Nombre"
                      id="est_Nombre"
                      type="text"
                      placeholder="Nombre del estado"
                    />
                  </MDBox>
                  <ErrorMessage name="est_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mt={2} pb={3}>
                    <MDTypography variant="h6"> Descripción: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mt={2}>
                    <Field
                      as={TextField}
                      name="est_Descripcion"
                      id="est_Descripcion outlined-multiline-static"
                      type="text"
                      multiline
                      fullWidth
                      rows={2}
                      placeholder="Descripcion"
                    />
                  </MDBox>
                  <ErrorMessage name="est_Descripcion" component="small" className="error" />
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
        Deseas Eliminar el Estado
        <b> {estadoSeleccionado && estadoSeleccionado.com_TipoCombustible}</b>?
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
                  Insertar Estado
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Estados"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Combustible",
                      onClick: (event, rowData) => seleccionarEstado(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Combustible",
                      onClick: (event, rowData) => seleccionarEstado(rowData, "Eliminar"),
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

export default Estados;

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import axios from "axios";
// import MDBox from "components/MDBox";
// import "styles/styles.css";
// import MaterialTable from "material-table";
// import { Modal, TextField, Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// const columns = [
//   {
//     title: "ID",
//     field: "com_Codigo",
//   },
//   {
//     title: "Tipo",
//     field: "com_TipoCombustible",
//   },
//   {
//     title: "Marca",
//     field: "com_Marca",
//   },
// ];

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     position: "absolute",
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   },
//   iconos: {
//     cursor: "pointer",
//   },
//   inputMaterial: {
//     width: "100%",
//   },
// }));

// function Combustibles() {
//   const styles = useStyles();
//   const [data, setData] = useState([]);
//   const [modalinsertar, setModalInsertar] = useState(false);
//   const [modaleditar, setModalEditar] = useState(false);
//   const [modaleliminar, setModalEliminar] = useState(false);
//   const [combustibleseleccionado, setCombustibleSeleccionado] = useState({
//     com_Codigo: 0,
//     com_TipoCombustible: "",
//     com_Marca: "",
//   });

//   const abrircerrarModalInsertar = () => {
//     setModalInsertar(!modalinsertar);
//   };

//   const abrircerrarModalEditar = () => {
//     setModalEditar(!modaleditar);
//   };

//   const abrircerrarModalEliminar = () => {
//     setModalEliminar(!modaleliminar);
//   };

//   const seleccionarCombustible = (combustible, caso) => {
//     setCombustibleSeleccionado(combustible);
//     if (caso === "Editar") {
//       abrircerrarModalEditar();
//     } else {
//       abrircerrarModalEliminar();
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCombustibleSeleccionado((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const peticionpost = async () => {
//     await axios
//       .post("https://localhost:7235/api/Combustibles/registrocombustibles", combustibleseleccionado)
//       .then((response) => {
//         setData(data.concat(response.data));
//         abrircerrarModalInsertar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionput = async () => {
//     await axios
//       .put("https://localhost:7235/api/Combustibles/actualizar", combustibleseleccionado)
//       .then(() => {
//         const copiaArray = [...data];
//         const indice = copiaArray.findIndex(
//           (elemento) => elemento.com_Codigo === combustibleseleccionado.com_Codigo
//         );
//         if (indice !== -1) {
//           copiaArray[indice] = {
//             ...copiaArray[indice],
//             com_TipoCombustible: combustibleseleccionado.com_TipoCombustible,
//             com_Marca: combustibleseleccionado.com_Marca,
//           };
//         }
//         setData(copiaArray);
//         abrircerrarModalEditar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticiondelete = async () => {
//     await axios
//       .put("https://localhost:7235/api/Combustibles/eliminar", combustibleseleccionado)
//       .then(() => {
//         setData(
//           data.filter(
//             (combustible) => combustible.com_Codigo !== combustibleseleccionado.com_Codigo
//           )
//         );
//         abrircerrarModalEliminar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionget = async () => {
//     await axios
//       .get("https://localhost:7235/api/Combustibles/combustibles")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     peticionget();
//   }, []);

//   const bodyInsertar = (
//     <div className={styles.modal}>
//       <h3>Agregar Nuevo Combustible</h3>
//       <TextField
//         className={styles.inputMaterial}
//         label="Tipo"
//         name="com_TipoCombustible"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Marca"
//         name="com_Marca"
//         onChange={handleChange}
//       />
//       <br />
//       <br />
//       <div align="right">
//         <Button color="primary" onClick={() => peticionpost()}>
//           Insertar
//         </Button>
//         <Button onClick={() => abrircerrarModalInsertar()}>Cancelar</Button>
//       </div>
//     </div>
//   );

//   const bodyEditar = (
//     <div className={styles.modal}>
//       <h3>Editar Combustible</h3>
//       <TextField
//         className={styles.inputMaterial}
//         label="Tipo"
//         name="com_TipoCombustible"
//         onChange={handleChange}
//         value={combustibleseleccionado && combustibleseleccionado.com_TipoCombustible}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Marca"
//         name="com_Marca"
//         onChange={handleChange}
//         value={combustibleseleccionado && combustibleseleccionado.com_Marca}
//       />
//       <br />
//       <br />
//       <div align="right">
//         <Button color="primary" onClick={() => peticionput()}>
//           Editar
//         </Button>
//         <Button onClick={() => abrircerrarModalEditar()}>Cancelar</Button>
//       </div>
//     </div>
//   );

//   const bodyEliminar = (
//     <div className={styles.modal}>
//       <p>
//         Deseas Eliminar el Combustible
//         <b> {combustibleseleccionado && combustibleseleccionado.com_TipoCombustible}</b>?
//       </p>
//       <div align="right">
//         <Button color="secondary" onClick={() => peticiondelete()}>
//           Si
//         </Button>
//         <Button onClick={() => abrircerrarModalEliminar()}>No</Button>
//       </div>
//     </div>
//   );

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <div className="App">
//                 <br />
//                 <Button onClick={() => abrircerrarModalInsertar()}>Insertar Combustible</Button>
//                 <br />
//                 <br />
//                 <MaterialTable
//                   columns={columns}
//                   data={data}
//                   title="Combustibles"
//                   actions={[
//                     {
//                       icon: "edit",
//                       tooltip: "Editar Combustible",
//                       onClick: (event, rowData) => seleccionarCombustible(rowData, "Editar"),
//                     },
//                     {
//                       icon: "delete",
//                       tooltip: "Eliminar Combustible",
//                       onClick: (event, rowData) => seleccionarCombustible(rowData, "Eliminar"),
//                     },
//                   ]}
//                   options={{
//                     actionsColumnIndex: -1,
//                   }}
//                   localization={{
//                     header: {
//                       actions: "Acciones",
//                     },
//                   }}
//                 />

//                 <Modal open={modalinsertar} onClose={abrircerrarModalInsertar}>
//                   {bodyInsertar}
//                 </Modal>

//                 <Modal open={modaleditar} onClose={abrircerrarModalEditar}>
//                   {bodyEditar}
//                 </Modal>

//                 <Modal open={modaleliminar} onClose={abrircerrarModalEliminar}>
//                   {bodyEliminar}
//                 </Modal>
//               </div>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default Combustibles;
