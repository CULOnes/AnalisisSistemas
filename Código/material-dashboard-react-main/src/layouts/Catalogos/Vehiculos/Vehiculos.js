import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const columns = [
  {
    title: "ID",
    field: "veh_Codigo",
  },
  {
    title: "Tipo de vehiculo",
    field: "tiV_Codigo",
  },
  {
    title: "Combustible",
    field: "com_Codigo",
  },
  {
    title: "Marca",
    field: "veh_Marca",
  },
  {
    title: "Placa",
    field: "veh_Placa",
  },
  {
    title: "Modelo",
    field: "veh_Modelo",
  },
  {
    title: "Año",
    field: "veh_Año",
  },
  {
    title: "Kilometraje",
    field: "veh_KilometrajeInicial",
  },
  {
    title: "Color",
    field: "veh_Color",
  },
  {
    title: "Transmision",
    field: "veh_Transmision",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
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
    width: "100%",
  },
}));

function Vehiculos() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [vehiculoseleccionado, setVehiculoSeleccionado] = useState({
    veh_Codigo: 0,
    tiV_Codigo: 0,
    com_Codigo: 0,
    veh_Marca: "",
    veh_Placa: "",
    veh_Modelo: "",
    veh_Año: 0,
    veh_KilometrajeInicial: 0,
    veh_Color: "",
    veh_Transmision: "",
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
  };

  const abrircerrarModalEliminar = () => {
    setModalEliminar(!modaleliminar);
  };

  const seleccionarVehiculo = (vehiculo, caso) => {
    setVehiculoSeleccionado(vehiculo);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Vehiculos/registrovehiculos", vehiculoseleccionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrircerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionput = async () => {
    await axios
      .put("https://localhost:7235/api/Vehiculos/actualizar", vehiculoseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.veh_Codigo === vehiculoseleccionado.veh_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            veh_Codigo: vehiculoseleccionado.veh_Codigo,
            tiV_Codigo: vehiculoseleccionado.tiV_Codigo,
            com_Codigo: vehiculoseleccionado.com_Codigo,
            veh_Marca: vehiculoseleccionado.veh_Marca,
            veh_Placa: vehiculoseleccionado.veh_Placa,
            veh_Modelo: vehiculoseleccionado.veh_Modelo,
            veh_Año: vehiculoseleccionado.veh_Año,
            veh_KilometrajeInicial: vehiculoseleccionado.veh_KilometrajeInicial,
            veh_Color: vehiculoseleccionado.veh_Color,
            veh_Transmision: vehiculoseleccionado.veh_Transmision,
          };
        }
        setData(copiaArray);
        abrircerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticiondelete = async () => {
    await axios
      .put("https://localhost:7235/api/Vehiculos/eliminar", vehiculoseleccionado)
      .then(() => {
        setData(data.filter((vehiculo) => vehiculo.veh_Codigo !== vehiculoseleccionado.veh_Codigo));
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/Vehiculos/vehiculos")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionget();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Vehiculo</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo Vehiculo"
        name="tiV_Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Combustible"
        name="com_Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Marca"
        name="veh_Marca"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Placa"
        name="veh_Placa"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Modelo"
        name="veh_Modelo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Año"
        name="veh_Año"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Kilometraje"
        name="veh_KilometrajeInicial"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Color"
        name="veh_Color"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Transmision"
        name="veh_Transmision"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionpost()}>
          Insertar
        </Button>
        <Button onClick={() => abrircerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Vehiculo</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo Vehiculo"
        name="tiV_Codigo"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.tiV_Codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Combustible"
        name="com_Codigo"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.com_Codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Marca"
        name="veh_Marca"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Marca}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Placa"
        name="veh_Placa"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Placa}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Modelo"
        name="veh_Modelo"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Modelo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Año"
        name="veh_Año"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Año}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Kilometraje"
        name="veh_KilometrajeInicial"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_KilometrajeInicial}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Color"
        name="veh_Color"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Color}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Transmision"
        name="veh_Transmision"
        onChange={handleChange}
        value={vehiculoseleccionado && vehiculoseleccionado.veh_Transmision}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionput()}>
          Editar
        </Button>
        <Button onClick={() => abrircerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Deseas Eliminar el Vehiculo
        <b> {vehiculoseleccionado && vehiculoseleccionado.veh_Marca}</b>?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticiondelete()}>
          Si
        </Button>
        <Button onClick={() => abrircerrarModalEliminar()}>No</Button>
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Usuario</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Vehiculos"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Vehiculo",
                      onClick: (event, rowData) => seleccionarVehiculo(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Vehiculo",
                      onClick: (event, rowData) => seleccionarVehiculo(rowData, "Eliminar"),
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

export default Vehiculos;

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
// import TablaVehiculos from "layouts/Catalogos/Vehiculos/TablaVehiculos";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// function Vehiculos() {
//   const { columns, rows } = TablaVehiculos();
//   const listatipov = [
//     { label: "Sedan" },
//     { label: "SUV" },
//     { label: "Pick-up" },
//     { label: "Camion" },
//     { label: "Trailer" },
//   ];
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Marca:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Marca del Vehiculo" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Placa:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Placa del Vehiculo" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Modelo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Modelo del Vehiculo" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Año:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Año del vehiculo" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Tipo de Combustible:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Tipo de Combustible" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Kilometraje:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="number" label="Kilometraje" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Color:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Color" fullWidth />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Transmision:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Transmision" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Tipo de Vehiculo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={listatipov}
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label="Tipo de Vehiculo" />}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Tipo de Llantas:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Tipo de Llantas" fullWidth />
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

// export default Vehiculos;
