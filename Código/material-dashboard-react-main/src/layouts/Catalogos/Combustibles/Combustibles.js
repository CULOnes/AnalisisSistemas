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
    field: "com_Codigo",
  },
  {
    title: "Tipo",
    field: "com_TipoCombustible",
  },
  {
    title: "Marca",
    field: "com_Marca",
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

function Combustibles() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [combustibleseleccionado, setCombustibleSeleccionado] = useState({
    com_Codigo: 0,
    com_TipoCombustible: "",
    com_Marca: "",
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

  const seleccionarCombustible = (combustible, caso) => {
    setCombustibleSeleccionado(combustible);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCombustibleSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Combustibles/registrocombustibles", combustibleseleccionado)
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
      .put("https://localhost:7235/api/Combustibles/actualizar", combustibleseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.com_Codigo === combustibleseleccionado.com_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            com_TipoCombustible: combustibleseleccionado.com_TipoCombustible,
            com_Marca: combustibleseleccionado.com_Marca,
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
      .put("https://localhost:7235/api/Combustibles/eliminar", combustibleseleccionado)
      .then(() => {
        setData(
          data.filter(
            (combustible) => combustible.com_Codigo !== combustibleseleccionado.com_Codigo
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
      .get("https://localhost:7235/api/Combustibles/combustibles")
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
      <h3>Agregar Nuevo Combustible</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo"
        name="com_TipoCombustible"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Marca"
        name="com_Marca"
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
      <h3>Editar Combustible</h3>
      <TextField
        className={styles.inputMaterial}
        label="Tipo"
        name="com_TipoCombustible"
        onChange={handleChange}
        value={combustibleseleccionado && combustibleseleccionado.com_TipoCombustible}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Marca"
        name="com_Marca"
        onChange={handleChange}
        value={combustibleseleccionado && combustibleseleccionado.com_Marca}
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
        Deseas Eliminar el Combustible
        <b> {combustibleseleccionado && combustibleseleccionado.com_TipoCombustible}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Combustible</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Combustibles"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Combustible",
                      onClick: (event, rowData) => seleccionarCombustible(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Combustible",
                      onClick: (event, rowData) => seleccionarCombustible(rowData, "Eliminar"),
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

export default Combustibles;
