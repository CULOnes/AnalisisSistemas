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
    field: "emp_Codigo",
  },
  {
    title: "Puesto",
    field: "pue_Codigo",
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
    title: "Direccion",
    field: "emp_Direccion",
  },
  {
    title: "Telefono",
    field: "emp_Telefono",
  },
  {
    title: "DPI",
    field: "emp_Dpi",
  },
  {
    title: "Edad",
    field: "emp_Edad",
  },
  {
    title: "Fecha de Nacimiento",
    field: "emp_Nacimiento",
  },
  {
    title: "Numero de Licencia",
    field: "emp_Nolicencia",
  },
  {
    title: "Tipo de Licencia",
    field: "emp_Tipolicencia",
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
      const wb = { Sheets: { Empleados: ws }, SheetNames: ["Empleados"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataex = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(dataex, `Empleados${fileExtension}`);
    }
  };

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
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Empleados"
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

export default REmpleados;
