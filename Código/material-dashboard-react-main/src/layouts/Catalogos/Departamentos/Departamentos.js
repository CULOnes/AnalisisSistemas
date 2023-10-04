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
// import Swal from "sweetalert2";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./Departamentos.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const columns = [
  {
    title: "ID",
    field: "man_Codigo",
  },
  {
    title: "Nombre",
    field: "man_Fecha",
  },
  {
    title: "Descripcion",
    field: "man_Kilometraje",
  },
  {
    title: "Jefe",
    field: "man_Estado",
  },
];

const valSchema = Yup.object().shape({
  cc_nombre: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del departamento es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  cc_descripcion: Yup.string()
    .required("La descripción es requerida")
    .max(250, "La descripción no puede tener más de 250 caracteres"),
  cc_jefe: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten números y letras")
    .required("El nombre del jefe es requerido")
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

function Departamentos() {
  const styles = useStyles();
  const [data /* , setData */] = useState([]);
  const [datatr /* , setDatatr */] = useState([]);
  const [datain /* , setDatain */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [mantenimientoseleccionado, setMantenimientoSeleccionado] = useState({
    man_Codigo: 0,
    tiR_Codigo: 0,
    ins_Codigo: 0,
    man_Fecha: 0,
    man_Kilometraje: 0,
    man_Estado: "",
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

  const seleccionarMantenimiento = (mantenimiento, caso) => {
    setMantenimientoSeleccionado(mantenimiento);
    console.log(mantenimientoseleccionado);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMantenimientoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (values, { resetForm }) => {
    // eslint-disable-next-line no-console
    console.log("Envío de Formulario:", values);
    resetForm();
  };

  const peticionpost = async () => {
    // Swal.showLoading();
    // if (
    //   mantenimientoseleccionado.tiR_Codigo === 0 ||
    //   mantenimientoseleccionado.ins_Codigo === 0 ||
    //   mantenimientoseleccionado.man_Fecha === 0 ||
    //   mantenimientoseleccionado.man_Estado === ""
    // ) {
    //   abrircerrarModalInsertar();
    //   Swal.close();
    //   Swal.fire({
    //     icon: "info",
    //     title: "",
    //     html: "Debe de llenar <b>todos</b> los campos",
    //   });
    // } else {
    //   abrircerrarModalInsertar();
    //   await axios
    //     .post(
    //       "https://localhost:7235/api/Mantenimientos/registromantenimientos",
    //       mantenimientoseleccionado
    //     )
    //     .then((response) => {
    //       setData(data.concat(response.data));
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Mantenimiento creado exitosamente",
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

  const peticionput = async () => {
    // console.log(mantenimientoseleccionado);
    // if (
    //   mantenimientoseleccionado.tiR_Codigo === 0 ||
    //   mantenimientoseleccionado.ins_Codigo === 0 ||
    //   mantenimientoseleccionado.man_Fecha === 0 ||
    //   mantenimientoseleccionado.man_Estado === ""
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
    //     .put("https://localhost:7235/api/Mantenimientos/actualizar", mantenimientoseleccionado)
    //     .then(() => {
    //       const copiaArray = [...data];
    //       const indice = copiaArray.findIndex(
    //         (elemento) => elemento.man_Codigo === mantenimientoseleccionado.man_Codigo
    //       );
    //       if (indice !== -1) {
    //         copiaArray[indice] = {
    //           ...copiaArray[indice],
    //           tiR_Codigo: mantenimientoseleccionado.tiR_Codigo,
    //           ins_Codigo: mantenimientoseleccionado.ins_Codigo,
    //           man_Fecha: mantenimientoseleccionado.man_Fecha,
    //           man_Kilometraje: mantenimientoseleccionado.man_Kilometraje,
    //           man_Estado: mantenimientoseleccionado.man_Estado,
    //         };
    //       }
    //       setData(copiaArray);
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Mantenimiento actualizado exitosamente",
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
    //   .put("https://localhost:7235/api/Mantenimientos/eliminar", mantenimientoseleccionado)
    //   .then(() => {
    //     setData(
    //       data.filter(
    //         (mantenimiento) => mantenimiento.man_Codigo !== mantenimientoseleccionado.man_Codigo
    //       )
    //     );
    //     Swal.close();
    //     Swal.fire({
    //       icon: "success",
    //       title: "",
    //       text: "Mantenimiento eliminado exitosamente",
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
    //   .get("https://localhost:7235/api/Mantenimientos/mantenimientos")
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

  const peticiongettr = async () => {
    // await axios
    //   .get("https://localhost:7235/api/TiposReparaciones/tiposreparaciones")
    //   .then((response) => {
    //     setDatatr(response.data);
    //   })
    //   .catch();
  };

  const peticiongetin = async () => {
    // await axios
    //   .get("https://localhost:7235/api/Inspecciones/inspecciones")
    //   .then((response) => {
    //     setDatain(response.data);
    //   })
    //   .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongettr();
    peticiongetin();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h2> Agregar Nuevo Departamento </h2>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Formik
          initialValues={{
            cc_nombre: "",
            cc_descripcion: "",
            cc_jefe: "",
          }}
          validationSchema={valSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Nombre: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_nombre"
                      id="cc_nombre"
                      type="text"
                      placeholder="Nombre departamento"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_nombre" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Descripcion </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
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
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6"> Nombre del jefe: </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={9}>
                  <MDBox mb={2}>
                    <Field
                      as={OutlinedInput}
                      name="cc_jefe"
                      id="cc_jefe"
                      type="text"
                      placeholder="Nombre del jefe"
                    />
                  </MDBox>
                  <ErrorMessage name="cc_jefe" component="small" className="error" />
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center">
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
      <MDTypography variant="h3"> Editar Mantenimiento </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Tipo de Reparacion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="tiR_Codigo"
                className="form-control"
                onChange={handleChange}
                value={mantenimientoseleccionado && mantenimientoseleccionado.tiR_Codigo}
              >
                <option key="0" value="0">
                  Seleccione el Tipo de Reparacion
                </option>
                {datatr.map((element) => (
                  <option key={element.tiR_Codigo} value={element.tiR_Codigo}>
                    {element.tiR_Nombre}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Inspeccion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="ins_Codigo"
                className="form-control"
                onChange={handleChange}
                value={mantenimientoseleccionado && mantenimientoseleccionado.ins_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Inspeccion
                </option>
                {datain.map((element) => (
                  <option key={element.ins_Codigo} value={element.ins_Codigo}>
                    {element.ins_Descripcion}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                name="man_Fecha"
                type="Date"
                onChange={handleChange}
                disabled
                // value={mantenimientoseleccionado && mantenimientoseleccionado.man_Fecha}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Kilometraje: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Kilometraje"
                name="man_Kilometraje"
                type="number"
                onChange={handleChange}
                value={mantenimientoseleccionado && mantenimientoseleccionado.man_Kilometraje}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Estado: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="man_Estado"
                className="form-control"
                onChange={handleChange}
                value={mantenimientoseleccionado && mantenimientoseleccionado.man_Estado}
              >
                <option key="0" value="0">
                  Seleccione Estado
                </option>
                <option key="1" value="Registrado">
                  Registrado
                </option>
                <option key="2" value="En Curso">
                  En Curso
                </option>
                <option key="3" value="Completado">
                  Completado
                </option>
              </select>
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
        Deseas Eliminar el Mantenimiento
        <b> {mantenimientoseleccionado && mantenimientoseleccionado.man_Codigo}</b>?
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
                  Insertar Departamento
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Mantenimientos"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Mantenimientos",
                      onClick: (event, rowData) => seleccionarMantenimiento(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Mantenimientos",
                      onClick: (event, rowData) => seleccionarMantenimiento(rowData, "Eliminar"),
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
    </DashboardLayout>
  );
}

export default Departamentos;

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

// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// function Mantenimiento() {
//   // const { columns, rows } = TablaMantenimiento();
//   const listadovehiculos = [
//     { label: "Vehiculo 1" },
//     { label: "Vehiculo 2" },
//     { label: "Vehiculo 3" },
//     { label: "Vehiculo 4" },
//     { label: "Vehiculo 5" },
//   ];
//   const listatipom = [
//     { label: "Tipo 1" },
//     { label: "Tipo 2" },
//     { label: "Tipo 3" },
//     { label: "Tipo 4" },
//     { label: "Tipo 5" },
//   ];

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Vehiculo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={listadovehiculos}
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label="Vehiculo" />}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Fecha de mantenimiento:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="date" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Tipo de mantenimiento:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={listatipom}
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label="Tipo de Mantenimiento" />}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Kilometraje del vehiculo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="number" label="Kilometraje del Vehiculo" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Fecha Estimada Salida:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="date" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Descripcion:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Descripcion del Mantenimiento" fullWidth />
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
//                 {/* <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 /> */}
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default Mantenimiento;
