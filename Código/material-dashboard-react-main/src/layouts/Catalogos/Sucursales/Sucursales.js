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
import "./Sucursales.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
// import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "suc_Codigo",
  },
  {
    title: "Nombre",
    field: "suc_Nombre",
  },
];

const valSchema = Yup.object().shape({
  suc_Nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre de la sucursal es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
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

function Sucursales() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [sucursalseleccionado, setSucursalSeleccionado] = useState({
    suc_Codigo: 0,
    suc_Nombre: "",
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

  const seleccionarSucursal = (sucursal, caso) => {
    setSucursalSeleccionado(sucursal);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const peticionpost = async (values) => {
    Swal.showLoading();
    if (values.suc_Nombre === "") {
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
        .post("https://localhost:7235/api/Sucursales/registrosucursales", values)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Sucursal creada exitosamente",
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
    if (values.suc_Nombre === "") {
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
        .put("https://localhost:7235/api/Sucursales/actualizar", values)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.suc_Codigo === values.suc_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              suc_Nombre: values.suc_Nombre,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Sucursal actualizada exitosamente",
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
      .put("https://localhost:7235/api/Sucursales/eliminar", sucursalseleccionado)
      .then(() => {
        setData(data.filter((sucursal) => sucursal.suc_Codigo !== sucursalseleccionado.suc_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Sucursal eliminada exitosamente",
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
      .get("https://localhost:7235/api/Sucursales/sucursales")
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

  const peticiongetus = async () => {
    // await axios
    //   .get("https://localhost:7235/api/Usuarios/usuarios")
    //   .then((response) => {
    //     setDataus(response.data);
    //   })
    //   .catch();
  };

  const peticiongetve = async () => {
    // await axios
    //   .get("https://localhost:7235/api/Vehiculos/vehiculos")
    //   .then((response) => {
    //     setDatave(response.data);
    //   })
    //   .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongetus();
    peticiongetve();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nueva sucursal </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={1} mt={2}>
        <Formik
          initialValues={{
            suc_Nombre: "",
          }}
          validationSchema={valSchema}
          onSubmit={peticionpost}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox>
                    <h4> Nombre Sucursal: </h4>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="suc_Nombre"
                      id="suc_Nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre Sucursal"
                    />
                  </MDBox>
                  <ErrorMessage name="suc_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> </MDTypography>
                  </MDBox>
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
      <h2> Editar sucursal </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            suc_Nombre: sucursalseleccionado && sucursalseleccionado.suc_Nombre,
            suc_Codigo: sucursalseleccionado && sucursalseleccionado.suc_Codigo,
          }}
          validationSchema={valSchema}
          onSubmit={peticionput}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={4}>
                  <MDBox>
                    <MDTypography variant="h6"> Nombre Sucursal: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox>
                    <Field
                      as={OutlinedInput}
                      name="suc_Nombre"
                      id="suc_Nombre"
                      type="text"
                      placeholder="Nombre Sucursal"
                    />
                  </MDBox>
                  <ErrorMessage name="suc_Nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> </MDTypography>
                  </MDBox>
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
        Deseas Eliminar la sucursal
        <b> {sucursalseleccionado && sucursalseleccionado.suc_Nombre}</b>?
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
                  Insertar Sucursal
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Sucursales"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Sucursal",
                      onClick: (event, rowData) => seleccionarSucursal(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Sucural",
                      onClick: (event, rowData) => seleccionarSucursal(rowData, "Eliminar"),
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

export default Sucursales;

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
//     field: "ins_Codigo",
//   },
//   {
//     title: "Usuario",
//     field: "usu_Codigo",
//   },
//   {
//     title: "Vehiculo",
//     field: "veh_Codigo",
//   },
//   {
//     title: "Kilometraje",
//     field: "ins_KilometrajeActual",
//   },
//   {
//     title: "Aprobacion",
//     field: "ins_Aprobacion",
//   },
//   {
//     title: "Estado",
//     field: "ins_Estado",
//   },
//   {
//     title: "Fecha",
//     field: "ins_Fecha",
//   },
//   {
//     title: "Descripcion",
//     field: "ins_Descripcion",
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
//   parrafo: {
//     paddingTop: "5px",
//     color: "grey",
//     fontSize: "14px",
//   },
// }));

// function Inspecciones() {
//   const styles = useStyles();
//   const [data, setData] = useState([]);
//   const [modalinsertar, setModalInsertar] = useState(false);
//   const [modaleditar, setModalEditar] = useState(false);
//   const [modaleliminar, setModalEliminar] = useState(false);
//   const [inspeccionseleccionado, setInspeccionSeleccionado] = useState({
//     ins_Codigo: 0,
//     usu_Codigo: 0,
//     veh_Codigo: 0,
//     ins_KilometrajeActual: 0,
//     ins_Aprobacion: "",
//     ins_Estado: "",
//     ins_Fecha: 0,
//     ins_Descripcion: "",
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

//   const seleccionarInspeccion = (inspeccion, caso) => {
//     setInspeccionSeleccionado(inspeccion);
//     if (caso === "Editar") {
//       abrircerrarModalEditar();
//     } else {
//       abrircerrarModalEliminar();
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInspeccionSeleccionado((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const peticionpost = async () => {
//     await axios
//       .post("https://localhost:7235/api/Inspecciones/registroinspecciones", inspeccionseleccionado)
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
//       .put("https://localhost:7235/api/Inspecciones/actualizar", inspeccionseleccionado)
//       .then(() => {
//         const copiaArray = [...data];
//         const indice = copiaArray.findIndex(
//           (elemento) => elemento.ins_Codigo === inspeccionseleccionado.ins_Codigo
//         );
//         if (indice !== -1) {
//           copiaArray[indice] = {
//             ...copiaArray[indice],
//             usu_Codigo: inspeccionseleccionado.usu_Codigo,
//             veh_Codigo: inspeccionseleccionado.veh_Codigo,
//             ins_KilometrajeActual: inspeccionseleccionado.ins_KilometrajeActual,
//             ins_Aprobacion: inspeccionseleccionado.ins_Aprobacion,
//             ins_Estado: inspeccionseleccionado.ins_Estado,
//             ins_Fecha: inspeccionseleccionado.ins_Fecha,
//             ins_Descripcion: inspeccionseleccionado.ins_Descripcion,
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
//       .put("https://localhost:7235/api/Inspecciones/eliminar", inspeccionseleccionado)
//       .then(() => {
//         setData(
//           data.filter((inspeccion) => inspeccion.ins_Codigo !== inspeccionseleccionado.ins_Codigo)
//         );
//         abrircerrarModalEliminar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionget = async () => {
//     await axios
//       .get("https://localhost:7235/api/Inspecciones/inspecciones")
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
//       <h3>Agregar Nueva Inspeccion</h3>
//       <TextField
//         className={styles.inputMaterial}
//         label="Usuario"
//         name="usu_Codigo"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Vehiculo"
//         name="veh_Codigo"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Kilometraje"
//         name="ins_KilometrajeActual"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Aprobacion"
//         name="ins_Aprobacion"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Estado"
//         name="ins_Estado"
//         onChange={handleChange}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Descripcion"
//         name="ins_Descripcion"
//         onChange={handleChange}
//       />
//       <br />
//       <p className={styles.parrafo}>Fecha de Nacimiento</p>
//       <TextField
//         className={styles.inputMaterial}
//         // label="Fecha"
//         name="ins_Fecha"
//         type="date"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.iNS_Fecha}
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
//       <h3>Editar Inspeccion</h3>
//       <TextField
//         className={styles.inputMaterial}
//         label="Usuario"
//         name="usu_Codigo"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.usu_Codigo}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Vehiculo"
//         name="veh_Codigo"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.veh_Codigo}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Kilometraje"
//         name="ins_KilometrajeActual"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.ins_KilometrajeActual}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Aprobacion"
//         name="ins_Aprobacion"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.ins_Aprobacion}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Estado"
//         name="ins_Estado"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.ins_Estado}
//       />
//       <br />
//       <TextField
//         className={styles.inputMaterial}
//         label="Descripcion"
//         name="ins_Descripcion"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.ins_Descripcion}
//       />
//       <br />
//       {/* <TextField
//         className={styles.inputMaterial}
//         // label="Fecha"
//         name="ins_Fecha"
//         type="date"
//         onChange={handleChange}
//         value={inspeccionseleccionado && inspeccionseleccionado.ins_Fecha}
//       /> */}
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
//         Deseas Eliminar la Inspeccion
//         <b> {inspeccionseleccionado && inspeccionseleccionado.ins_Codigo}</b>?
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
//                 <Button onClick={() => abrircerrarModalInsertar()}>Insertar Inspeccion</Button>
//                 <br />
//                 <br />
//                 <MaterialTable
//                   columns={columns}
//                   data={data}
//                   title="Inspecciones"
//                   actions={[
//                     {
//                       icon: "edit",
//                       tooltip: "Editar Inspeccion",
//                       onClick: (event, rowData) => seleccionarInspeccion(rowData, "Editar"),
//                     },
//                     {
//                       icon: "delete",
//                       tooltip: "Eliminar Inspeccion",
//                       onClick: (event, rowData) => seleccionarInspeccion(rowData, "Eliminar"),
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

// export default Inspecciones;
