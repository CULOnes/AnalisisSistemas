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
    field: "transfAct_codigo",
  },
  {
    title: "Fecha",
    field: "transfAct_fecha",
  },
  {
    title: "Entregado Por",
    field: "transfAct_entrega",
  },
  {
    title: "Recibido Por",
    field: "transfAct_recepcion",
  },
  {
    title: "Observaciones",
    field: "transfAct_observaciones",
  },
];

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

function TransferenciaActivos() {
  const styles = useStyles();
  const [data /* , setData */] = useState([]);
  // const [datatp /* , setDatatp */] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [TransferenciaSeleccionada, setTransferenciaSeleccionada] = useState({
    transfAct_codigo: 0,
    transfAct_fecha: 0,
    transfAct_entrega: "",
    transfAct_recepcion: "",
    transfAct_observaciones: "",
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    abrircerrarModalInsertar();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferenciaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const peticionpost = async () => {
  // Swal.showLoading();
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
  // }
  // };

  const peticionput = async () => {
    setModalEditar(!modaleditar);
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
      <MDTypography variant="h3"> Transferencia de Activos </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Custodio que Entrega: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="transfAct_codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Custodio:
                </option>
                <option key="0" value="0">
                  Custodio 1
                </option>
                <option key="0" value="0">
                  Custodio 2
                </option>
                <option key="0" value="0">
                  Custodio 3
                </option>
                <option key="0" value="0">
                  Custodio 4
                </option>
                <option key="0" value="0">
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Nuevo Custodio: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="transfAct_codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Custodio que Recibe
                </option>
                <option key="0" value="0">
                  Nuevo Custodio 1
                </option>
                <option key="0" value="0">
                  Nuevo Custodio 2
                </option>
                <option key="0" value="0">
                  Nuevo Custodio 3
                </option>
                <option key="0" value="0">
                  Nuevo Custodio 4
                </option>
                <option key="0" value="0">
                  Nuevo Custodio 5
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={4}>
              <MDTypography variant="h6">Activos a Transferir: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="pue_Codigo" className="form-control" onChange={handleChange} multiple>
                <option key="0" value="0">
                  Seleccione Activos
                </option>
                <option key="0" value="0">
                  Activo 1
                </option>
                <option key="0" value="0">
                  Activo 2
                </option>
                <option key="0" value="0">
                  Activo 3
                </option>
                <option key="0" value="0">
                  Activo 4
                </option>
                <option key="0" value="0">
                  Activo 5
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Ubicación Destino: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="pue_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Ubicación Destino
                </option>
                <option key="0" value="0">
                  Ubicación 1
                </option>
                <option key="0" value="0">
                  Ubicación 2
                </option>
                <option key="0" value="0">
                  Ubicación 3
                </option>
                <option key="0" value="0">
                  Ubicación 4
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={5}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Centro de Costo Destino: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <MDBox mb={1}>
              <select name="pue_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Centro de Costo Destino
                </option>
                <option key="0" value="0">
                  Centro de Costo 1
                </option>
                <option key="0" value="0">
                  Centro de Costo 2
                </option>
                <option key="0" value="0">
                  Centro de Costo 3
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
          <Grid item xs={12} md={4} lg={4}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={() => abrircerrarModalEditar()}
            >
              Confirmar
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
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
      <MDTypography variant="h3"> Agregar Acta </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Fecha: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDInput
              name="transfAct_fecha"
              type="date"
              size="small"
              onChange={handleChange}
              // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Entregado Por: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={4}>
              <MDInput
                type="area"
                label="Entregado Por"
                name="transfAct_entrega"
                onChange={handleChange}
                size="small"
                value={TransferenciaSeleccionada && TransferenciaSeleccionada.transfAct_entrega}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Recibido Por: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={4}>
              <MDInput
                type="area"
                label="Recibido Por"
                name="transfAct_recepcion"
                onChange={handleChange}
                size="small"
                value={TransferenciaSeleccionada && TransferenciaSeleccionada.transfAct_recepcion}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={4}>
              <MDTypography variant="h6"> Observaciones: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={4}>
              <MDInput
                type="area"
                label="Observaciones"
                name="transfAct_observaciones"
                onChange={handleChange}
                size="small"
                value={
                  TransferenciaSeleccionada && TransferenciaSeleccionada.transfAct_observaciones
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" mb={1}>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={() => peticionput()}>
              Confirmar
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
        ¿Deseas Eliminar la Transferencia
        <b> {TransferenciaSeleccionada && TransferenciaSeleccionada.transfAct_codigo}</b>?
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
                  Transferir Activos
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
    </DashboardLayout>
  );
}

export default TransferenciaActivos;
