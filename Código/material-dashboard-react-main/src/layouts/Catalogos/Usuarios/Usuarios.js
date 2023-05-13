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
    field: "usu_Codigo",
  },
  {
    title: "Usuario",
    field: "usu_NombreUsuario",
  },
  {
    title: "Nombre",
    field: "usu_Nombre",
  },
  {
    title: "Apellido",
    field: "usu_Apellido",
  },
  {
    title: "Correo",
    field: "usu_Correo",
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

function Usuarios() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [usuarioseleccionado, setUsuarioSeleccionado] = useState({
    usu_Apellido: "",
    usu_Codigo: 0,
    usu_Contrasena: "123",
    usu_Correo: "",
    usu_Nombre: "",
    usu_NombreUsuario: "",
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

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Usuarios/registrousuarios", usuarioseleccionado)
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
      .put("https://localhost:7235/api/Usuarios/actualizar", usuarioseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.usu_Codigo === usuarioseleccionado.usu_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            usu_Nombre: usuarioseleccionado.usu_Nombre,
            usu_Apellido: usuarioseleccionado.usu_Apellido,
            usu_Correo: usuarioseleccionado.usu_Correo,
            usu_NombreUsuario: usuarioseleccionado.usu_NombreUsuario,
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
      .put("https://localhost:7235/api/Usuarios/eliminar", usuarioseleccionado)
      .then(() => {
        setData(data.filter((usuario) => usuario.usu_Codigo !== usuarioseleccionado.usu_Codigo));
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/Usuarios/usuarios")
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
      <h3>Agregar Nuevo Usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usu_NombreUsuario"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="usu_Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="usu_Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="usu_Correo"
        type="email"
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
      <h3>Editar Usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usu_NombreUsuario"
        onChange={handleChange}
        value={usuarioseleccionado && usuarioseleccionado.usu_NombreUsuario}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="usu_Nombre"
        onChange={handleChange}
        value={usuarioseleccionado && usuarioseleccionado.usu_Nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="usu_Apellido"
        onChange={handleChange}
        value={usuarioseleccionado && usuarioseleccionado.usu_Apellido}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="usu_Correo"
        onChange={handleChange}
        value={usuarioseleccionado && usuarioseleccionado.usu_Correo}
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
        Deseas Eliminar el Usuario
        <b> {usuarioseleccionado && usuarioseleccionado.usu_NombreUsuario}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Usuario</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Usuarios"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Usuario",
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Usuario",
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Eliminar"),
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

export default Usuarios;
