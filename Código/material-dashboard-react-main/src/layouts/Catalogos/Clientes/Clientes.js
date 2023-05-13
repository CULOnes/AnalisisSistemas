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
    field: "cli_Codigo",
  },
  {
    title: "Nombre",
    field: "cli_Nombre",
  },
  {
    title: "Apellido",
    field: "cli_Apellido",
  },
  {
    title: "Correo",
    field: "cli_Correo",
  },
  {
    title: "Celular",
    field: "cli_TelefonoCelular",
    type: "number",
  },
  {
    title: "Telefono Secundario",
    field: "cli_TelefonoSecundario",
    type: "number",
  },
  {
    title: "Direccion",
    field: "cli_Direccion",
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

function Clientes() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [clienteseleccionado, setClienteSeleccionado] = useState({
    cli_Codigo: 0,
    cli_Nombre: "",
    cli_Apellido: "",
    cli_Correo: "",
    cli_TelefonoCelular: 0,
    cli_TelefonoSecundario: 0,
    Cli_Direccion: "",
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

  const seleccionarCliente = (cliente, caso) => {
    setClienteSeleccionado(cliente);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Clientes/registroclientes", clienteseleccionado)
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
      .put("https://localhost:7235/api/Clientes/actualizar", clienteseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.cli_Codigo === clienteseleccionado.cli_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            cli_Nombre: clienteseleccionado.cli_Nombre,
            cli_Apellido: clienteseleccionado.cli_Apellido,
            cli_Correo: clienteseleccionado.cli_Correo,
            cli_TelefonoCelular: clienteseleccionado.cli_TelefonoCelular,
            cli_TelefonoSecundario: clienteseleccionado.cli_TelefonoSecundario,
            cli_Direccion: clienteseleccionado.cli_Direccion,
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
      .put("https://localhost:7235/api/Clientes/eliminar", clienteseleccionado)
      .then(() => {
        setData(data.filter((cliente) => cliente.cli_Codigo !== clienteseleccionado.cli_Codigo));
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/Clientes/clientes")
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
      <h3>Agregar Nuevo Clientes</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="cli_Nombre"
        type="text"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="cli_Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="cli_Correo"
        type="email"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Celular"
        name="cli_TelefonoCelular"
        type="number"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telefono Secundario"
        name="cli_TelefonoSecundario"
        type="number"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Direccion"
        name="cli_Direccion"
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
      <h3>Editar Cliente</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="cli_Nombre"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_Nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="cli_Apellido"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_Apellido}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="cli_Correo"
        type="email"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_Correo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Celular"
        name="cli_TelefonoCelular"
        type="number"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_TelefonoCelular}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telefono Secundario"
        name="cli_TelefonoSecundario"
        type="number"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_TelefonoSecundario}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Direccion"
        name="cli_Direccion"
        onChange={handleChange}
        value={clienteseleccionado && clienteseleccionado.cli_Direccion}
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
        Deseas Eliminar el Cliente
        <b> {clienteseleccionado && clienteseleccionado.cli_Nombre}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Cliente</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Clientes"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Cliente",
                      onClick: (event, rowData) => seleccionarCliente(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Cliente",
                      onClick: (event, rowData) => seleccionarCliente(rowData, "Eliminar"),
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

export default Clientes;
