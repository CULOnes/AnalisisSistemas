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

const columns = [
  {
    title: "ID",
    field: "seg_Codigo",
  },
  {
    title: "Tipo Seguro",
    field: "tiS_Codigo",
  },
  {
    title: "Cobertura",
    field: "seg_Cobertura",
  },
  {
    title: "Telefono",
    field: "seg_Telefono",
  },
  {
    title: "Vigencia",
    field: "seg_Vigencia",
  },
  {
    title: "Compañia",
    field: "seg_Compañia",
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

function RSeguros() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalbuscar, setModalBuscar] = useState(false);
  const [seguroseleccionado, setSeguroSeleccionado] = useState({
    tipobusqueda: 0,
    valor: "",
  });

  const exporttoExcel = async () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { Seguros: ws }, SheetNames: ["Seguros"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataex = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataex, `Seguros${fileExtension}`);
  };

  const abrircerrarModalBuscar = () => {
    setModalBuscar(!modalbuscar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeguroSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Seguros/reporteseguros", seguroseleccionado)
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
      <h3>Consultar Seguro</h3>

      <select name="tipobusqueda" className="form-control" onChange={handleChange}>
        <option key="0" value="0">
          Seleccione el Tipo de Busqueda
        </option>
        <option key="1" value="1">
          Tipo Seguro
        </option>
        <option key="2" value="2">
          Compañia
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
                <Button onClick={() => abrircerrarModalBuscar()}>Consultar Seguro</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Seguros"
                  actions={[
                    {
                      icon: "edit",
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

export default RSeguros;
