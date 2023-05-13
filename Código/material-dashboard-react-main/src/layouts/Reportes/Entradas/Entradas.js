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
    field: "asi_codigo",
  },
  {
    title: "Usuario",
    field: "usu_codigo",
  },
  {
    title: "Inspeccion",
    field: "ins_codigo",
  },
  {
    title: "Vehiculo",
    field: "veh_codigo",
  },
  {
    title: "Empleado",
    field: "emp_codigo",
  },
  {
    title: "Cliente",
    field: "cli_codigo",
  },
  {
    title: "Seguro",
    field: "seg_codigo",
  },
  {
    title: "Kilometraje Salida",
    field: "asi_kilometraje",
  },
  {
    title: "Fecha Salida",
    field: "asi_fechasalida",
  },
  {
    title: "Observaciones",
    field: "asi_observaciones",
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

function REntradas() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalbuscar, setModalBuscar] = useState(false);
  const [asignacionseleccionada, setAsignacionSeleccionada] = useState({
    fechainicio: 0,
    fechafin: 0,
  });

  const abrircerrarModalBuscar = () => {
    setModalBuscar(!modalbuscar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsignacionSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post(
        "https://localhost:7235/api/Asignaciones/reporteasignacionesentradas",
        asignacionseleccionada
      )
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
      <h3>Consultar Inspeccion</h3>
      <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="fechainicio"
        type="date"
        onChange={handleChange}
        value={asignacionseleccionada && asignacionseleccionada.fechainicio}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="fechafin"
        type="date"
        onChange={handleChange}
        value={asignacionseleccionada && asignacionseleccionada.fechafin}
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
                <Button onClick={() => abrircerrarModalBuscar()}>Consultar Entradas</Button>
                <br />
                <br />
                <MaterialTable columns={columns} data={data} title="Entradas" />

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

export default REntradas;
