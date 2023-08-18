import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Swal from "sweetalert2";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";

const columns = [
  {
    title: "ID",
    field: "ins_Codigo",
  },
  {
    title: "Nombre",
    field: "ins_KilometrajeActual",
  },
  // {
  //   title: "Aprobacion",
  //   field: "ins_Aprobacion",
  // },
  // {
  //   title: "Estado",
  //   field: "ins_Estado",
  // },
  // {
  //   title: "Fecha",
  //   field: "ins_Fecha",
  // },
  // {
  //   title: "Descripcion",
  //   field: "ins_Descripcion",
  // },
];

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
  const [data /* , setData */] = useState([]);
  const [dataus /* , setDataus */] = useState([]);
  const [datave /* , setDatave */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [inspeccionseleccionado, setInspeccionSeleccionado] = useState({
    ins_Codigo: 0,
    usu_Codigo: 0,
    veh_Codigo: 0,
    ins_KilometrajeActual: 0,
    ins_Aprobacion: "",
    ins_Estado: "",
    ins_Fecha: 0,
    ins_Descripcion: "",
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

  const seleccionarInspeccion = (inspeccion, caso) => {
    setInspeccionSeleccionado(inspeccion);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInspeccionSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    // console.log(inspeccionseleccionado);
    // Swal.showLoading();
    // if (
    //   inspeccionseleccionado.usu_Codigo === 0 ||
    //   inspeccionseleccionado.veh_Codigo === 0 ||
    //   inspeccionseleccionado.ins_KilometrajeActual === 0 ||
    //   inspeccionseleccionado.ins_Aprobacion === "" ||
    //   inspeccionseleccionado.ins_Estado === "" ||
    //   inspeccionseleccionado.ins_Fecha === 0 ||
    //   inspeccionseleccionado.ins_Descripcion === ""
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
    //       "https://localhost:7235/api/Inspecciones/registroinspecciones",
    //       inspeccionseleccionado
    //     )
    //     .then((response) => {
    //       setData(data.concat(response.data));
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Inspeccion creada exitosamente",
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
    // if (
    //   inspeccionseleccionado.usu_Codigo === 0 ||
    //   inspeccionseleccionado.veh_Codigo === 0 ||
    //   inspeccionseleccionado.ins_KilometrajeActual === 0 ||
    //   inspeccionseleccionado.ins_Aprobacion === "" ||
    //   inspeccionseleccionado.ins_Estado === "" ||
    //   inspeccionseleccionado.ins_Fecha === 0 ||
    //   inspeccionseleccionado.ins_Descripcion === ""
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
    //     .put("https://localhost:7235/api/Inspecciones/actualizar", inspeccionseleccionado)
    //     .then(() => {
    //       const copiaArray = [...data];
    //       const indice = copiaArray.findIndex(
    //         (elemento) => elemento.ins_Codigo === inspeccionseleccionado.ins_Codigo
    //       );
    //       if (indice !== -1) {
    //         copiaArray[indice] = {
    //           ...copiaArray[indice],
    //           usu_Codigo: inspeccionseleccionado.usu_Codigo,
    //           veh_Codigo: inspeccionseleccionado.veh_Codigo,
    //           ins_KilometrajeActual: inspeccionseleccionado.ins_KilometrajeActual,
    //           ins_Aprobacion: inspeccionseleccionado.ins_Aprobacion,
    //           ins_Estado: inspeccionseleccionado.ins_Estado,
    //           ins_Fecha: inspeccionseleccionado.ins_Fecha,
    //           ins_Descripcion: inspeccionseleccionado.ins_Descripcion,
    //         };
    //       }
    //       setData(copiaArray);
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "",
    //         text: "Inspeccion actualizada exitosamente",
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
    //   .put("https://localhost:7235/api/Inspecciones/eliminar", inspeccionseleccionado)
    //   .then(() => {
    //     setData(
    //       data.filter((inspeccion) => inspeccion.ins_Codigo !== inspeccionseleccionado.ins_Codigo)
    //     );
    //     Swal.close();
    //     Swal.fire({
    //       icon: "success",
    //       title: "",
    //       text: "Inspeccion eliminada exitosamente",
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
    //   .get("https://localhost:7235/api/Inspecciones/inspecciones")
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
      <MDTypography variant="h3"> Agregar Nueva sucursal </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        {/* <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Nombre: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="usu_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione el Usuario
                </option>
                {dataus.map((element) => (
                  <option key={element.usu_Codigo} value={element.usu_Codigo}>
                    {element.usu_NombreUsuario}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="veh_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione el Vehiculo
                </option>
                {datave.map((element) => (
                  <option key={element.veh_Codigo} value={element.veh_Codigo}>
                    {element.veh_Marca} {element.veh_Modelo}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Nombre: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Nombre"
                name="ins_KilometrajeActual"
                type="text"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput name="ins_Fecha" type="date" onChange={handleChange} />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Aprobado: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="ins_Aprobacion" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione una opcion
                </option>
                <option key="1" value="Si">
                  Si
                </option>
                <option key="1" value="No">
                  No
                </option>
              </select>
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
              <MDInput label="Estado" name="ins_Estado" type="text" onChange={handleChange} />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Descripcion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Descripcion"
                name="ins_Descripcion"
                type="text"
                onChange={handleChange}
                multiline
                rows={3}
              />
            </MDBox>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={() => peticionpost()}>
              Insertar
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton
              variant="gradient"
              color="light"
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
    <div className={styles.modal}>
      <MDTypography variant="h3"> Editar sucursal </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Usuario: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="usu_Codigo"
                className="form-control"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.usu_Codigo}
              >
                <option key="0" value="0">
                  Seleccione el Usuario
                </option>
                {dataus.map((element) => (
                  <option key={element.usu_Codigo} value={element.usu_Codigo}>
                    {element.usu_NombreUsuario}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="veh_Codigo"
                className="form-control"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.veh_Codigo}
              >
                <option key="0" value="0">
                  Seleccione el Vehiculo
                </option>
                {datave.map((element) => (
                  <option key={element.veh_Codigo} value={element.veh_Codigo}>
                    {element.veh_Marca} {element.veh_Modelo}
                  </option>
                ))}
              </select>
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
                name="ins_KilometrajeActual"
                type="number"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.ins_KilometrajeActual}
              />
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
              <MDInput name="ins_Fecha" type="date" onChange={handleChange} disabled />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Aprobado: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="ins_Aprobacion"
                className="form-control"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.ins_Aprobacion}
              >
                <option key="0" value="0">
                  Seleccione una opcion
                </option>
                <option key="1" value="Si">
                  Si
                </option>
                <option key="1" value="No">
                  No
                </option>
              </select>
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
              <MDInput
                label="Estado"
                name="ins_Estado"
                type="text"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.ins_Estado}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Descripcion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Descripcion"
                name="ins_Descripcion"
                type="text"
                onChange={handleChange}
                value={inspeccionseleccionado && inspeccionseleccionado.ins_Descripcion}
                multiline
                rows={3}
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
        Deseas Eliminar la sucursal
        <b> {inspeccionseleccionado && inspeccionseleccionado.ins_Codigo}</b>?
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
                  variant="gradient"
                  color="success"
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Insertar sucursal
                </MDButton>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Inspecciones"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Inspeccion",
                      onClick: (event, rowData) => seleccionarInspeccion(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Inspeccion",
                      onClick: (event, rowData) => seleccionarInspeccion(rowData, "Eliminar"),
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
