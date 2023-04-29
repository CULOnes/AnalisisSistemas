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
    field: "tiS_Codigo",
  },
  {
    title: "Nombre",
    field: "tiS_Nombre",
  },
  {
    title: "Descripcion",
    field: "tiS_Descripcion",
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

function TiposSeguros() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [tiposeguroseleccionado, setTipoSeguroSeleccionado] = useState({
    tiS_Codigo: 0,
    tiS_Nombre: "",
    tiS_Descripcion: "123",
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

  const seleccionarTipoSeguro = (tiposeguro, caso) => {
    setTipoSeguroSeleccionado(tiposeguro);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipoSeguroSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/TiposSeguros/registrotiposeguro", tiposeguroseleccionado)
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
      .put("https://localhost:7235/api/TiposSeguros/actualizar", tiposeguroseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.tiS_Codigo === tiposeguroseleccionado.tiS_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            tiS_Nombre: tiposeguroseleccionado.tiS_Nombre,
            tiS_Descripcion: tiposeguroseleccionado.tiS_Descripcion,
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
      .put("https://localhost:7235/api/TiposSeguros/eliminar", tiposeguroseleccionado)
      .then(() => {
        setData(
          data.filter((tiposeguro) => tiposeguro.tiS_Codigo !== tiposeguroseleccionado.tiS_Codigo)
        );
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/TiposSeguros/tiposseguros")
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
      <h3>Agregar Nuevo Tipo de Seguro</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="tiS_Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="tiS_Descripcion"
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
      <h3>Editar Tipo de Seguro</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="tiS_Nombre"
        onChange={handleChange}
        value={tiposeguroseleccionado && tiposeguroseleccionado.tiS_Nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="tiS_Descripcion"
        onChange={handleChange}
        value={tiposeguroseleccionado && tiposeguroseleccionado.tiS_Descripcion}
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
        Deseas Eliminar el Tipo de Seguro
        <b> {tiposeguroseleccionado && tiposeguroseleccionado.tiS_Nombre}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Tipo de Seguro</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Tipos de Seguros"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Tipo de Seguro",
                      onClick: (event, rowData) => seleccionarTipoSeguro(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Tipo de Seguro",
                      onClick: (event, rowData) => seleccionarTipoSeguro(rowData, "Eliminar"),
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

export default TiposSeguros;
