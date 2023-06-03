import React, { useState, useEffect } from "react";
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
    field: "asi_Codigo",
  },
  {
    title: "Usuario",
    field: "usu_Codigo",
  },
  {
    title: "Inspeccion",
    field: "ins_Codigo",
  },
  {
    title: "Vehiculo",
    field: "veh_Codigo",
  },
  {
    title: "Empleado",
    field: "emp_Codigo",
  },
  {
    title: "Cliente",
    field: "cli_Codigo",
  },
  {
    title: "Seguro",
    field: "seg_Codigo",
  },
  {
    title: "Kilometraje Salida",
    field: "asi_Kilometraje",
  },
  {
    title: "Fecha Salida",
    field: "asi_Fechasalida",
  },
  {
    title: "Observaciones",
    field: "asi_Observaciones",
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

function RSalidas() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalbuscar, setModalBuscar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [asignacionseleccionada, setAsignacionSeleccionada] = useState({
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
      const wb = { Sheets: { Salidas: ws }, SheetNames: ["Empleados"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataex = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(dataex, `Salidas${fileExtension}`);
    }
  };

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
        "https://localhost:7235/api/Asignaciones/reporteasignacionessalidas",
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

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

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
                <Button onClick={() => abrircerrarModalBuscar()}>Consultar Salidas</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Salidas"
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

export default RSalidas;
