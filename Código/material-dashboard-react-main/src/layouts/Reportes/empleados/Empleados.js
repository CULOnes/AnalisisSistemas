import React, { useState } from "react";
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
    field: "emp_codigo",
  },
  {
    title: "Puesto",
    field: "pue_codigo",
  },
  {
    title: "Nombre",
    field: "emp_nombre",
  },
  {
    title: "Apellido",
    field: "emp_apellido",
  },
  {
    title: "Direccion",
    field: "emp_direccion",
  },
  {
    title: "Telefono",
    field: "emp_telefono",
  },
  {
    title: "DPI",
    field: "emp_dpi",
  },
  {
    title: "Edad",
    field: "emp_edad",
  },
  {
    title: "Fecha de Nacimiento",
    field: "emp_nacimiento",
  },
  {
    title: "Numero de Licencia",
    field: "emp_nolicencia",
  },
  {
    title: "Tipo de Licencia",
    field: "emp_tipolicencia",
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

function REmpleados() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalbuscar, setModalBuscar] = useState(false);
  const [empleadoseleccionado, setEmpleadoSeleccionado] = useState({
    tipobusqueda: 0,
    valor: "",
  });

  const abrircerrarModalBuscar = () => {
    setModalBuscar(!modalbuscar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Empleados/reporteempleados", empleadoseleccionado)
      .then((response) => {
        setData(response.data);
        abrircerrarModalBuscar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bodyConsultar = (
    <div className={styles.modal}>
      <h3>Consultar Empleado</h3>

      <select name="tipobusqueda" className="form-control" onChange={handleChange}>
        <option key="0" value="0">
          Seleccione el Tipo de Busqueda
        </option>
        <option key="1" value="1">
          DPI
        </option>
        <option key="2" value="2">
          Numero Licencia
        </option>
        <option key="3" value="3">
          Tipo Licencia
        </option>
      </select>
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Valor"
        name="valor"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionpost()}>
          Consultar
        </Button>
        <Button onClick={() => abrircerrarModalBuscar()}>Cancelar</Button>
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
                <Button onClick={() => abrircerrarModalBuscar()}>Consultar Empleado</Button>
                <br />
                <br />
                <MaterialTable columns={columns} data={data} title="Empleados" />

                <Modal open={modalbuscar} onClose={abrircerrarModalBuscar}>
                  {bodyConsultar}
                </Modal>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default REmpleados;
