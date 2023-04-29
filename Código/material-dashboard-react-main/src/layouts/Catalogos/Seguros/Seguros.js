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
    field: "seg_Codigo",
  },
  {
    title: "Tipo Seguro",
    field: "tiS_Codigo",
  },
  {
    title: "Compañia",
    field: "seg_Compañia",
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

function Seguros() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [seguroseleccionado, setSeguroSeleccionado] = useState({
    seg_Codigo: 0,
    tiS_Codigo: 0,
    seg_Compañia: "123",
    seg_Cobertura: "",
    seg_Telefono: 0,
    seg_Vigencia: "",
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

  const seleccionarSeguro = (seguro, caso) => {
    setSeguroSeleccionado(seguro);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
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
      .post("https://localhost:7235/api/Seguros/registroseguros", seguroseleccionado)
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
      .put("https://localhost:7235/api/Seguros/actualizar", seguroseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.seg_Codigo === seguroseleccionado.seg_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            tiS_Codigo: seguroseleccionado.tiS_Codigo,
            seg_Compañia: seguroseleccionado.seg_Compañia,
            seg_Cobertura: seguroseleccionado.seg_Cobertura,
            seg_Telefono: seguroseleccionado.seg_Telefono,
            seg_Vigencia: seguroseleccionado.seg_Vigencia,
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
      .put("https://localhost:7235/api/Seguros/eliminar", seguroseleccionado)
      .then(() => {
        setData(data.filter((seguro) => seguro.seg_Codigo !== seguroseleccionado.seg_Codigo));
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/Seguros/seguros")
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
      <h3>Agregar Nuevo Seguro</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo Seguro"
        name="tiS_Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Compañia"
        name="seg_Compañia"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cobertura"
        name="seg_Cobertura"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telefono"
        name="seg_Telefono"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Vigencia"
        name="seg_Vigencia"
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
      <h3>Editar Seguro</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo Seguro"
        name="tiS_Codigo"
        onChange={handleChange}
        value={seguroseleccionado && seguroseleccionado.tiS_Codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Compañia"
        name="seg_Compañia"
        onChange={handleChange}
        value={seguroseleccionado && seguroseleccionado.seg_Compañia}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="cobertura"
        name="seg_Cobertura"
        onChange={handleChange}
        value={seguroseleccionado && seguroseleccionado.seg_Cobertura}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telefono"
        name="seg_Telefono"
        onChange={handleChange}
        value={seguroseleccionado && seguroseleccionado.seg_Telefono}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Vigencia"
        name="seg_Vigencia"
        onChange={handleChange}
        value={seguroseleccionado && seguroseleccionado.seg_Vigencia}
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
        Deseas Eliminar el Seguro
        <b> {seguroseleccionado && seguroseleccionado.seg_Codigo}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Seguro</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Seguros"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Seguro",
                      onClick: (event, rowData) => seleccionarSeguro(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Seguro",
                      onClick: (event, rowData) => seleccionarSeguro(rowData, "Eliminar"),
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

export default Seguros;
