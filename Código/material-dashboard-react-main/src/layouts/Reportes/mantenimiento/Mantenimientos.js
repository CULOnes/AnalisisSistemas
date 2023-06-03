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
import FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import Swal from "sweetalert2";

const columns = [
  {
    title: "ID",
    field: "man_Codigo",
  },
  {
    title: "Tipo Reparacion",
    field: "tir_Codigo",
  },
  {
    title: "Inspeccion",
    field: "ins_Codigo",
  },
  {
    title: "Fecha",
    field: "man_Fecha",
  },
  {
    title: "Kilometraje",
    field: "man_Kilometraje",
  },
  {
    title: "Estado",
    field: "man_Estado",
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

function RMantenimientos() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalbuscar, setModalBuscar] = useState(false);
  const [mantenimientoseleccionado, setMantenimientoSeleccionado] = useState({
    fechainicio: 0,
    fechafin: 0,
  });

  const exporttoExcel = async () => {
    if (data.length === 0) {
      Swal.fire({
        icon: "info",
        title: "",
        text: "Debe de generar un reporte primero",
      });
    } else {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(data);
      console.log("aqui");
      const wb = { Sheets: { Mantenimientos: ws }, SheetNames: ["Mantenimientos"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataex = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(dataex, `Mantenimientos${fileExtension}`);
    }
  };

  const abrircerrarModalBuscar = () => {
    setModalBuscar(!modalbuscar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMantenimientoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post(
        "https://localhost:7235/api/Mantenimientos/reportemantenimientos",
        mantenimientoseleccionado
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
      <h3>Consultar Mantenimiento</h3>
      <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="fechainicio"
        type="date"
        onChange={handleChange}
        value={mantenimientoseleccionado && mantenimientoseleccionado.fechainicio}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="fechafin"
        type="date"
        onChange={handleChange}
        value={mantenimientoseleccionado && mantenimientoseleccionado.fechafin}
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
                <Button onClick={() => abrircerrarModalBuscar()}>Consultar Mantenimientos</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Mantenimientos"
                  actions={[
                    {
                      icon: "addchart",
                      tooltip: "Exportar a Excel",
                      onClick: (event, rowData) => exporttoExcel(rowData),
                      isFreeAction: true,
                      position: "toolbar",
                    },
                  ]}
                />

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

export default RMantenimientos;
