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
    field: "ins_Codigo",
  },
  {
    title: "Usuario",
    field: "usu_Codigo",
  },
  {
    title: "Vehiculo",
    field: "veh_Codigo",
  },
  {
    title: "Kilometraje",
    field: "ins_KilometrajeActual",
  },
  {
    title: "Aprobacion",
    field: "ins_Aprobacion",
  },
  {
    title: "Estado",
    field: "ins_Estado",
  },
  {
    title: "Fecha",
    field: "ins_Fecha",
  },
  {
    title: "Descripcion",
    field: "ins_Descripcion",
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
  parrafo: {
    paddingTop: "5px",
    color: "grey",
    fontSize: "14px",
  },
}));

function Inspecciones() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [inspeccionseleccionado, setInspeccionSeleccionado] = useState({
    ins_Codigo: 0,
    usu_Codigo: 0,
    veh_Codigo: 0,
    ins_KilometrajeActual: 0,
    ins_Aprobacion: "",
    ins_Estado: "",
    ins_Fecha: 0,
    ins_Descripcion: "",
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

  const seleccionarInspeccion = (inspeccion, caso) => {
    setInspeccionSeleccionado(inspeccion);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInspeccionSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    await axios
      .post("https://localhost:7235/api/Inspecciones/registroinspecciones", inspeccionseleccionado)
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
      .put("https://localhost:7235/api/Inspecciones/actualizar", inspeccionseleccionado)
      .then(() => {
        const copiaArray = [...data];
        const indice = copiaArray.findIndex(
          (elemento) => elemento.ins_Codigo === inspeccionseleccionado.ins_Codigo
        );
        if (indice !== -1) {
          copiaArray[indice] = {
            ...copiaArray[indice],
            usu_Codigo: inspeccionseleccionado.usu_Codigo,
            veh_Codigo: inspeccionseleccionado.veh_Codigo,
            ins_KilometrajeActual: inspeccionseleccionado.ins_KilometrajeActual,
            ins_Aprobacion: inspeccionseleccionado.ins_Aprobacion,
            ins_Estado: inspeccionseleccionado.ins_Estado,
            ins_Fecha: inspeccionseleccionado.ins_Fecha,
            ins_Descripcion: inspeccionseleccionado.ins_Descripcion,
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
      .put("https://localhost:7235/api/Inspecciones/eliminar", inspeccionseleccionado)
      .then(() => {
        setData(
          data.filter((inspeccion) => inspeccion.ins_Codigo !== inspeccionseleccionado.ins_Codigo)
        );
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionget = async () => {
    await axios
      .get("https://localhost:7235/api/Inspecciones/inspecciones")
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
      <h3>Agregar Nueva Inspeccion</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usu_Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Vehiculo"
        name="veh_Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Kilometraje"
        name="ins_KilometrajeActual"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Aprobacion"
        name="ins_Aprobacion"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Estado"
        name="ins_Estado"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="ins_Descripcion"
        onChange={handleChange}
      />
      <br />
      <p className={styles.parrafo}>Fecha de Nacimiento</p>
      <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="ins_Fecha"
        type="date"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.iNS_Fecha}
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
      <h3>Editar Inspeccion</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usu_Codigo"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.usu_Codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Vehiculo"
        name="veh_Codigo"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.veh_Codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Kilometraje"
        name="ins_KilometrajeActual"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.ins_KilometrajeActual}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Aprobacion"
        name="ins_Aprobacion"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.ins_Aprobacion}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Estado"
        name="ins_Estado"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.ins_Estado}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="ins_Descripcion"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.ins_Descripcion}
      />
      <br />
      {/* <TextField
        className={styles.inputMaterial}
        // label="Fecha"
        name="ins_Fecha"
        type="date"
        onChange={handleChange}
        value={inspeccionseleccionado && inspeccionseleccionado.ins_Fecha}
      /> */}
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
        Deseas Eliminar la Inspeccion
        <b> {inspeccionseleccionado && inspeccionseleccionado.ins_Codigo}</b>?
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
                <Button onClick={() => abrircerrarModalInsertar()}>Insertar Inspeccion</Button>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Inspecciones"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Inspeccion",
                      onClick: (event, rowData) => seleccionarInspeccion(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Inspeccion",
                      onClick: (event, rowData) => seleccionarInspeccion(rowData, "Eliminar"),
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

export default Inspecciones;
