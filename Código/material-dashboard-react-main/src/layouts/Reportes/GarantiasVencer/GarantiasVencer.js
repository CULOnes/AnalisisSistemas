import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";

const columns = [
  {
    title: "ID",
    field: "emp_Codigo",
  },
  {
    title: "Nombre",
    field: "emp_Nombre",
  },
  {
    title: "Apellido",
    field: "emp_Apellido",
  },
  {
    title: "Telefono",
    field: "emp_Telefono",
  },
  {
    title: "Edad",
    field: "emp_Edad",
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

function GarantiasVencer() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [datatp, setDatatp] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [empleadoseleccionado, setEmpleadoSeleccionado] = useState({
    emp_Codigo: 0,
    pue_Codigo: 0,
    emp_Nombre: "",
    emp_Apellido: "",
    emp_Direccion: "",
    emp_Telefono: 0,
    emp_Dpi: "",
    emp_Edad: 0,
    emp_Nacimiento: 0,
    emp_Nolicencia: "",
    emp_Tipolicencia: "",
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

  const seleccionarEmpleado = (empleado, caso) => {
    setEmpleadoSeleccionado(empleado);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
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
    await axios
      .get("https://localhost:7235/api/Puestos/puestos")
      .then((response) => {
        setDatatp(response.data);
      })
      .catch();
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
      <MDTypography variant="h3"> Agregar Nuevo Empleado </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Puesto: </MDTypography>
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
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Nombre: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre"
                name="emp_Nombre"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Apellido: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Apellido"
                name="emp_Apellido"
                type="text"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Telefono: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Telefono"
                name="emp_Telefono"
                type="number"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> DPI: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="DPI"
                name="emp_Dpi"
                type="text"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Edad: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Edad"
                name="emp_Edad"
                type="number"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Fecha Nacimiento: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput name="emp_Nacimiento" type="date" size="small" onChange={handleChange} />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Numero Licencia: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Numero Licencia"
                name="emp_Nolicencia"
                type="text"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Tipo Licencia: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Tipo Licencia"
                name="emp_Tipolicencia"
                type="text"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Direccion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Direccion"
                name="emp_Direccion"
                type="text"
                size="small"
                multiline
                rows={2}
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
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
      <MDTypography variant="h3"> Editar Empleado </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={1}>
        <Grid container spacing={3} justifyContent="center">
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
                value={empleadoseleccionado && empleadoseleccionado.pue_Codigo}
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
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Nombre: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre"
                name="emp_Nombre"
                onChange={handleChange}
                size="small"
                value={empleadoseleccionado && empleadoseleccionado.emp_Nombre}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Apellido: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Apellido"
                name="emp_Apellido"
                type="text"
                onChange={handleChange}
                size="small"
                value={empleadoseleccionado && empleadoseleccionado.emp_Apellido}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Telefono: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Telefono"
                name="emp_Telefono"
                type="number"
                size="small"
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Telefono}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> DPI: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="DPI"
                name="emp_Dpi"
                type="text"
                size="small"
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Dpi}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Edad: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Edad"
                name="emp_Edad"
                type="number"
                size="small"
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Edad}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Fecha Nacimiento: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                name="emp_Nacimiento"
                type="date"
                size="small"
                onChange={handleChange}
                disabled
                // value={empleadoseleccionado && empleadoseleccionado.emp_Nacimiento}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Numero Licencia: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Numero Licencia"
                name="emp_Nolicencia"
                type="text"
                size="small"
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Nolicencia}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Tipo Licencia: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Tipo Licencia"
                name="emp_Tipolicencia"
                type="text"
                size="small"
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Tipolicencia}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1}>
              <MDTypography variant="h6"> Direccion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={1}>
              <MDInput
                label="Direccion"
                name="emp_Direccion"
                type="text"
                size="small"
                multiline
                rows={2}
                onChange={handleChange}
                value={empleadoseleccionado && empleadoseleccionado.emp_Direccion}
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
                  variant="gradient"
                  color="success"
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Insertar Empleado
                </MDButton>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Empleados"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Empleado",
                      onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Empleado",
                      onClick: (event, rowData) => seleccionarEmpleado(rowData, "Eliminar"),
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

export default GarantiasVencer;

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
