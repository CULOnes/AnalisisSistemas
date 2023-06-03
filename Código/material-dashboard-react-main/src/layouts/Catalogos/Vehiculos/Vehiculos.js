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
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";

const columns = [
  {
    title: "ID",
    field: "veh_Codigo",
  },
  // {
  //   title: "Tipo de vehiculo",
  //   field: "tiV_Codigo",
  // },
  // {
  //   title: "Combustible",
  //   field: "com_Codigo",
  // },
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
  select: {
    appearance: "none",
    color: "#FF0000",
  },
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

function Vehiculos() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [datatv, setDatatv] = useState([]);
  const [datatc, setDatatc] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
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
    Swal.showLoading();
    if (
      vehiculoseleccionado.tiV_Codigo === 0 ||
      vehiculoseleccionado.com_Codigo === 0 ||
      vehiculoseleccionado.veh_Marca === "" ||
      vehiculoseleccionado.veh_Placa === "" ||
      vehiculoseleccionado.veh_Modelo === "" ||
      vehiculoseleccionado.veh_Año === 0 ||
      vehiculoseleccionado.veh_Color === "" ||
      vehiculoseleccionado.veh_Transmision === ""
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
        .post("https://localhost:7235/api/Vehiculos/registrovehiculos", vehiculoseleccionado)
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Vehiculo creado exitosamente",
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

  const peticionput = async () => {
    if (
      vehiculoseleccionado.tiV_Codigo === 0 ||
      vehiculoseleccionado.com_Codigo === 0 ||
      vehiculoseleccionado.veh_Marca === "" ||
      vehiculoseleccionado.veh_Placa === "" ||
      vehiculoseleccionado.veh_Modelo === "" ||
      vehiculoseleccionado.veh_Año === 0 ||
      vehiculoseleccionado.veh_Color === "" ||
      vehiculoseleccionado.veh_Transmision === ""
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
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Vehiculo actualizado exitosamente",
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
      .put("https://localhost:7235/api/Vehiculos/eliminar", vehiculoseleccionado)
      .then(() => {
        setData(data.filter((vehiculo) => vehiculo.veh_Codigo !== vehiculoseleccionado.veh_Codigo));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Vehiculo eliminado exitosamente",
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
      .get("https://localhost:7235/api/Vehiculos/vehiculos")
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

  const peticiongettv = async () => {
    await axios
      .get("https://localhost:7235/api/TiposVehiculos/tiposvehiculos")
      .then((response) => {
        setDatatv(response.data);
      })
      .catch();
  };

  const peticiongettc = async () => {
    await axios
      .get("https://localhost:7235/api/Combustibles/combustibles")
      .then((response) => {
        setDatatc(response.data);
      })
      .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongettv();
    peticiongettc();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <MDTypography variant="h3"> Agregar Nuevo Vehiculo </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Tipo de Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="tiV_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione el Tipo de Vehiculo
                </option>
                {datatv.map((element) => (
                  <option key={element.tiV_Codigo} value={element.tiV_Codigo}>
                    {element.tiV_Nombre}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Combustible: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="com_Codigo" className="select" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Combustible
                </option>
                {datatc.map((element) => (
                  <option key={element.com_Codigo} value={element.com_Codigo}>
                    {element.com_TipoCombustible}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Marca: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Marca"
                name="veh_Marca"
                type="text"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Placa: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Placa"
                name="veh_Placa"
                type="text"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Modelo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Modelo"
                name="veh_Modelo"
                type="text"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Año: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Año"
                name="veh_Año"
                type="number"
                onChange={handleChange}
                size="small"
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
                name="veh_KilometrajeInicial"
                type="number"
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Color: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={2}>
              <MDInput
                label="Color"
                name="veh_Color"
                type="color"
                fullWidth
                size="small"
                onChange={handleChange}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={5} />
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Transmision: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="veh_Transmision" className="select" onChange={handleChange}>
                <option key="0" value="none">
                  Seleccione Transmision
                </option>
                <option key="1" value="Automatica">
                  Automatica
                </option>
                <option key="2" value="Mecanica/Manual">
                  Mecanica/Manual
                </option>
              </select>
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
      <MDTypography variant="h3"> Editar Vehiculo </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Tipo de Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="tiV_Codigo"
                className="form-control"
                onChange={handleChange}
                value={vehiculoseleccionado && vehiculoseleccionado.tiV_Codigo}
              >
                <option key="0" value="0">
                  Seleccione el Tipo de Vehiculo
                </option>
                {datatv.map((element) => (
                  <option key={element.tiV_Codigo} value={element.tiV_Codigo}>
                    {element.tiV_Nombre}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Combustible: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="com_Codigo"
                className="select"
                onChange={handleChange}
                value={vehiculoseleccionado && vehiculoseleccionado.com_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Combustible
                </option>
                {datatc.map((element) => (
                  <option key={element.com_Codigo} value={element.com_Codigo}>
                    {element.com_TipoCombustible}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Marca: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Marca"
                name="veh_Marca"
                type="text"
                onChange={handleChange}
                size="small"
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Marca}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Placa: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Placa"
                name="veh_Placa"
                type="text"
                onChange={handleChange}
                size="small"
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Placa}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Modelo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Modelo"
                name="veh_Modelo"
                type="text"
                onChange={handleChange}
                size="small"
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Modelo}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Año: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Año"
                name="veh_Año"
                type="number"
                onChange={handleChange}
                size="small"
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Año}
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
                name="veh_KilometrajeInicial"
                type="number"
                size="small"
                onChange={handleChange}
                value={vehiculoseleccionado && vehiculoseleccionado.veh_KilometrajeInicial}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Color: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={2}>
              <MDInput
                label="Color"
                name="veh_Color"
                type="color"
                fullWidth
                size="small"
                onChange={handleChange}
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Color}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={5} />
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Transmision: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="veh_Transmision"
                className="select"
                onChange={handleChange}
                value={vehiculoseleccionado && vehiculoseleccionado.veh_Transmision}
              >
                <option key="0" value="none">
                  Seleccione Transmision
                </option>
                <option key="1" value="Automatica">
                  Automatica
                </option>
                <option key="2" value="Mecanica/Manual">
                  Mecanica/Manual
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
              onClick={() => abrircerrarModalInsertar()}
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
        Deseas Eliminar el Vehiculo
        <b> {vehiculoseleccionado && vehiculoseleccionado.cli_Nombre}</b>?
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
                  Insertar Vehiculo
                </MDButton>
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
