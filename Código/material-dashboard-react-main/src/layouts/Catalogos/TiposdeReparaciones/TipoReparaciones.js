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
    field: "tiR_Codigo",
  },
  {
    title: "Nombre",
    field: "tiR_Nombre",
  },
  {
    title: "Costo",
    field: "tiR_Costo",
  },
  {
    title: "Tiempo",
    field: "tiR_Tiempo",
  },
  {
    title: "Piezas",
    field: "tiR_Piezas",
  },
  {
    title: "Descripcion",
    field: "tiR_Descripcion",
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

function TipoReparaciones() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [tiporeparacioneleccionado, setTipoReparacionSeleccionado] = useState({
    tiR_Codigo: 0,
    tiR_Nombre: "",
    tiR_Costo: "123",
    tiR_Tiempo: 0,
    tiR_Piezas: "",
    tiR_Descripcion: "",
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

  const seleccionarTipoReparacion = (tiporeparacion, caso) => {
    setTipoReparacionSeleccionado(tiporeparacion);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipoReparacionSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post(
        "https://localhost:7235/api/TiposReparaciones/registrotiporeparaciones",
        tiporeparacioneleccionado
      )
      .then((response) => {
        setData(data.concat(response.data));
        abrircerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionput = async () => {
    console.log(tiporeparacioneleccionado);
    await axios
      .put("https://localhost:7235/api/TiposReparaciones/actualizar", tiporeparacioneleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.tiR_Codigo === tiporeparacioneleccionado.tiR_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            tiR_Nombre: tiporeparacioneleccionado.tiR_Nombre,
            tiR_Costo: tiporeparacioneleccionado.tiR_Costo,
            tiR_Tiempo: tiporeparacioneleccionado.tiR_Tiempo,
            tiR_Piezas: tiporeparacioneleccionado.tiR_Piezas,
            tiR_Descripcion: tiporeparacioneleccionado.tiR_Descripcion,
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
      .put("https://localhost:7235/api/TiposReparaciones/eliminar", tiporeparacioneleccionado)
      .then(() => {
        setData(
          data.filter(
            (tiporeparacion) => tiporeparacion.tiR_Codigo !== tiporeparacioneleccionado.tiR_Codigo
          )
        );
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/TiposReparaciones/tiposreparaciones")
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
      <h3>Agregar Nuevo Tipo de Reparacion</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="tiR_Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Costo"
        name="tiR_Costo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Tiempo"
        name="tiR_Tiempo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Piezas"
        name="tiR_Piezas"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="tiR_Descripcion"
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
      <h3>Editar Tipo de Reparacion</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="tiR_Nombre"
        onChange={handleChange}
        value={tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Costo"
        name="tiR_Costo"
        onChange={handleChange}
        value={tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Costo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Tiempo"
        name="tiR_Tiempo"
        onChange={handleChange}
        value={tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Tiempo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Piezas"
        name="tiR_Piezas"
        onChange={handleChange}
        value={tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Piezas}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="tiR_Descripcion"
        onChange={handleChange}
        value={tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Descripcion}
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
        Deseas Eliminar el Tipo de Reparacion|
        <b> {tiporeparacioneleccionado && tiporeparacioneleccionado.tiR_Nombre}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>
                  Insertar Tipo de Reparacion
                </Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Tipos de Reparaciones"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Tipo de Reparacion",
                      onClick: (event, rowData) => seleccionarTipoReparacion(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Tipo de Reparacion",
                      onClick: (event, rowData) => seleccionarTipoReparacion(rowData, "Eliminar"),
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

export default TipoReparaciones;
