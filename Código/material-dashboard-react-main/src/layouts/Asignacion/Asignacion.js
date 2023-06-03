import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import MDBox from "components/MDBox";
import "styles/styles.css";
import MaterialTable from "material-table";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDButton from "components/MDButton";

const columns = [
  {
    title: "ID",
    field: "asi_Codigo",
  },
  {
    title: "Fecha Salida",
    field: "asi_Fechasalida",
  },
  {
    title: "Fecha Entrada",
    field: "asi_Fechaentrada",
  },
  {
    title: "Observaciones",
    field: "asi_Observaciones",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "5%",
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
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
    marginTop: "15px",
  },
}));

function Asignaciones() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [datase, setDatase] = useState([]);
  const [dataus, setDataus] = useState([]);
  const [datain, setDatain] = useState([]);
  const [datave, setDatave] = useState([]);
  const [dataem, setDataem] = useState([]);
  const [datacl, setDatacl] = useState([]);
  const [modalinsertar, setModalInsertar] = useState(false);
  const [modaleditar, setModalEditar] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [modaleliminar, setModalEliminar] = useState(false);
  const [asignacionseleccionado, setAsignacionSeleccionado] = useState({
    asi_Codigo: 0,
    usu_Codigo: 0,
    ins_Codigo: 0,
    veh_Codigo: 0,
    emp_Codigo: 0,
    cli_Codigo: 0,
    seg_Codigo: 0,
    asi_Kilometraje: 0,
    asi_Fechasalida: 0,
    asi_Fechaentrada: 0,
    asi_Observaciones: "",
  });

  const abrircerrarModalInsertar = () => {
    setModalInsertar(!modalinsertar);
  };

  const abrircerrarModalEditar = () => {
    setModalEditar(!modaleditar);
  };

  const abrircerrarModalEliminar = () => {
    // Swal.fire({
    //   title: "",
    //   html: `Estas seguro que deseas eliminar <b>${
    //     clienteseleccionado && clienteseleccionado.cli_Nombre
    //   }</b>`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   cancelButtonText: "Cancelar",
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Eliminar",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     peticiondelete();
    //   }
    // });
    setModalEliminar(!modaleliminar);
  };

  const seleccionarAsignacion = (asignacion, caso) => {
    setAsignacionSeleccionado(asignacion);
    if (caso === "Editar") {
      abrircerrarModalEditar();
    } else {
      abrircerrarModalEliminar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsignacionSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionpost = async () => {
    Swal.showLoading();
    if (
      asignacionseleccionado.usu_Codigo === 0 ||
      asignacionseleccionado.ins_Codigo === 0 ||
      asignacionseleccionado.veh_Codigo === 0 ||
      asignacionseleccionado.emp_Codigo === 0 ||
      asignacionseleccionado.cli_Codigo === 0 ||
      asignacionseleccionado.seg_Codigo === 0 ||
      asignacionseleccionado.asi_Kilometraje === 0 ||
      asignacionseleccionado.asi_Fechasalida === 0 ||
      asignacionseleccionado.asi_Fechaentrada === 0 ||
      asignacionseleccionado.asi_Observaciones === ""
    ) {
      abrircerrarModalInsertar();
      Swal.close();
      Swal.fire({
        icon: "info",
        title: "",
        html: "Debe de llenar <b>todos</b> los campos",
      });
    } else {
      abrircerrarModalInsertar();
      await axios
        .post(
          "https://localhost:7235/api/Asignaciones/registroasignaciones",
          asignacionseleccionado
        )
        .then((response) => {
          setData(data.concat(response.data));
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Asignacion creada exitosamente",
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "",
            text: error.response.data,
            timer: 2500,
          });
        });
    }
  };

  const peticionput = async () => {
    if (
      asignacionseleccionado.usu_Codigo === 0 ||
      asignacionseleccionado.ins_Codigo === 0 ||
      asignacionseleccionado.veh_Codigo === 0 ||
      asignacionseleccionado.emp_Codigo === 0 ||
      asignacionseleccionado.cli_Codigo === 0 ||
      asignacionseleccionado.seg_Codigo === 0 ||
      asignacionseleccionado.asi_Kilometraje === 0 ||
      asignacionseleccionado.asi_Fechasalida === 0 ||
      asignacionseleccionado.asi_Fechaentrada === 0 ||
      asignacionseleccionado.asi_Observaciones === ""
    ) {
      abrircerrarModalEditar();
      Swal.close();
      Swal.fire({
        icon: "info",
        title: "",
        html: "Debe de llenar <b>todos</b> los campos",
      });
    } else {
      abrircerrarModalEditar();
      Swal.showLoading();
      await axios
        .put("https://localhost:7235/api/Asignaciones/actualizar", asignacionseleccionado)
        .then(() => {
          const copiaArray = [...data];
          const indice = copiaArray.findIndex(
            (elemento) => elemento.asi_Codigo === asignacionseleccionado.asi_Codigo
          );
          if (indice !== -1) {
            copiaArray[indice] = {
              ...copiaArray[indice],
              usu_Codigo: asignacionseleccionado.usu_Codigo,
              ins_Codigo: asignacionseleccionado.ins_Codigo,
              veh_Codigo: asignacionseleccionado.veh_Codigo,
              emp_Codigo: asignacionseleccionado.emp_Codigo,
              cli_Codigo: asignacionseleccionado.cli_Codigo,
              seg_Codigo: asignacionseleccionado.seg_Codigo,
              asi_Kilometraje: asignacionseleccionado.asi_Kilometraje,
              asi_Fechasalida: asignacionseleccionado.asi_Fechasalida,
              asi_Fechaentrada: asignacionseleccionado.asi_Fechaentrada,
              asi_Observaciones: asignacionseleccionado.asi_Observaciones,
            };
          }
          setData(copiaArray);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "",
            text: "Asignacion actualizada exitosamente",
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "",
            text: error.response.data,
            timer: 2500,
          });
        });
    }
  };

  const peticiondelete = async () => {
    abrircerrarModalEliminar();
    Swal.showLoading();
    await axios
      .put("https://localhost:7235/api/Asignaciones/eliminar", asignacionseleccionado)
      .then(() => {
        setData(
          data.filter((asignacion) => asignacion.asi_Codigo !== asignacionseleccionado.asi_Codigo)
        );
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "",
          text: "Asignacion eliminada exitosamente",
          timer: 2500,
        });
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data,
          timer: 2500,
        });
      });
  };

  const peticionget = async () => {
    Swal.showLoading();
    await axios
      .get("https://localhost:7235/api/Asignaciones/asignaciones")
      .then((response) => {
        setData(response.data);
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data,
          timer: 2500,
        });
      });
  };

  const peticiongetus = async () => {
    await axios
      .get("https://localhost:7235/api/Usuarios/usuarios")
      .then((response) => {
        setDataus(response.data);
      })
      .catch();
  };

  const peticiongetin = async () => {
    await axios
      .get("https://localhost:7235/api/Inspecciones/inspecciones")
      .then((response) => {
        setDatain(response.data);
      })
      .catch();
  };

  const peticiongetve = async () => {
    await axios
      .get("https://localhost:7235/api/Vehiculos/vehiculos")
      .then((response) => {
        setDatave(response.data);
      })
      .catch();
  };

  const peticiongetem = async () => {
    await axios
      .get("https://localhost:7235/api/Empleados/empleados")
      .then((response) => {
        setDataem(response.data);
      })
      .catch();
  };

  const peticiongetcl = async () => {
    await axios
      .get("https://localhost:7235/api/Clientes/clientes")
      .then((response) => {
        setDatacl(response.data);
      })
      .catch();
  };

  const peticiongetse = async () => {
    await axios
      .get("https://localhost:7235/api/Seguros/seguros")
      .then((response) => {
        setDatase(response.data);
      })
      .catch();
  };

  useEffect(() => {
    peticionget();
    peticiongetus();
    peticiongetin();
    peticiongetve();
    peticiongetem();
    peticiongetcl();
    peticiongetse();
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  if (!showComponent) {
    return null;
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <MDTypography variant="h3"> Agregar Nueva Asignacion </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Usuario: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="usu_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Usuario
                </option>
                {dataus.map((element) => (
                  <option key={element.usu_Codigo} value={element.usu_Codigo}>
                    {element.usu_NombreUsuario}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Inspeccion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="ins_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Inspeccion
                </option>
                {datain.map((element) => (
                  <option key={element.ins_Codigo} value={element.ins_Codigo}>
                    {element.ins_Descripcion}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="veh_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Vehiculo
                </option>
                {datave.map((element) => (
                  <option key={element.veh_Codigo} value={element.veh_Codigo}>
                    {element.veh_Marca} {element.veh_Modelo}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Empleado: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="emp_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Empleado
                </option>
                {dataem.map((element) => (
                  <option key={element.emp_Codigo} value={element.emp_Codigo}>
                    {element.emp_Nombre} {element.emp_Apellido}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Cliente: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="cli_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Cliente
                </option>
                {datacl.map((element) => (
                  <option key={element.cli_Codigo} value={element.cli_Codigo}>
                    {element.cli_Nombre} {element.cli_Apellido}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Seguro: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select name="seg_Codigo" className="form-control" onChange={handleChange}>
                <option key="0" value="0">
                  Seleccione Seguro
                </option>
                {datase.map((element) => (
                  <option key={element.seg_Codigo} value={element.seg_Codigo}>
                    {element.seg_Cobertura}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Kilometraje: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Kilometraje"
                name="asi_Kilometraje"
                type="number"
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha Salida: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput name="asi_Fechasalida" type="date" onChange={handleChange} size="small" />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha Entrada: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput name="asi_Fechaentrada" type="date" onChange={handleChange} size="small" />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Observaciones: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Observaciones"
                name="asi_Observaciones"
                type="text"
                multiline
                rows={2}
                onChange={handleChange}
                size="small"
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={() => peticionpost()}>
              Insertar
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton
              variant="gradient"
              color="light"
              fullWidth
              onClick={() => abrircerrarModalInsertar()}
            >
              Cancelar
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <MDTypography variant="h3"> Editar Cliente </MDTypography>
      <Divider sx={{ marginTop: 1 }} light={false} />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Usuario: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="usu_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.usu_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Usuario
                </option>
                {dataus.map((element) => (
                  <option key={element.usu_Codigo} value={element.usu_Codigo}>
                    {element.usu_NombreUsuario}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Inspeccion: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="ins_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.ins_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Inspeccion
                </option>
                {datain.map((element) => (
                  <option key={element.ins_Codigo} value={element.ins_Codigo}>
                    {element.ins_Descripcion}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Vehiculo: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="veh_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.veh_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Vehiculo
                </option>
                {datave.map((element) => (
                  <option key={element.veh_Codigo} value={element.veh_Codigo}>
                    {element.veh_Marca} {element.veh_Modelo}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Empleado: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="emp_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.emp_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Empleado
                </option>
                {dataem.map((element) => (
                  <option key={element.emp_Codigo} value={element.emp_Codigo}>
                    {element.emp_Nombre} {element.emp_Apellido}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Cliente: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="cli_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.cli_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Cliente
                </option>
                {datacl.map((element) => (
                  <option key={element.cli_Codigo} value={element.cli_Codigo}>
                    {element.cli_Nombre} {element.cli_Apellido}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Seguro: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <select
                name="seg_Codigo"
                className="form-control"
                onChange={handleChange}
                value={asignacionseleccionado && asignacionseleccionado.seg_Codigo}
              >
                <option key="0" value="0">
                  Seleccione Seguro
                </option>
                {datase.map((element) => (
                  <option key={element.seg_Codigo} value={element.seg_Codigo}>
                    {element.seg_Cobertura}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Kilometraje: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Kilometraje"
                name="asi_Kilometraje"
                type="number"
                onChange={handleChange}
                size="small"
                value={asignacionseleccionado && asignacionseleccionado.asi_Kilometraje}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha Salida: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                name="asi_Fechasalida"
                type="date"
                onChange={handleChange}
                size="small"
                disabled
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Fecha Entrada: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                name="asi_Fechaentrada"
                type="date"
                onChange={handleChange}
                size="small"
                disabled
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={2}>
              <MDTypography variant="h6"> Observaciones: </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <MDBox mb={2}>
              <MDInput
                label="Observaciones"
                name="asi_Observaciones"
                type="text"
                multiline
                rows={2}
                onChange={handleChange}
                size="small"
                value={asignacionseleccionado && asignacionseleccionado.asi_Observaciones}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} lg={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={() => peticionput()}>
              Actualizar
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <MDButton
              variant="gradient"
              color="light"
              fullWidth
              onClick={() => abrircerrarModalEditar()}
            >
              Cancelar
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Deseas Eliminar la Asignacion
        <b> {asignacionseleccionado && asignacionseleccionado.asi_Codigo}</b>?
      </p>
      <div align="right">
        <MDButton color="secondary" onClick={() => peticiondelete()}>
          Si
        </MDButton>
        <MDButton onClick={() => abrircerrarModalEliminar()}>No</MDButton>
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
                <MDButton
                  variant="gradient"
                  color="success"
                  onClick={() => abrircerrarModalInsertar()}
                >
                  Insertar Asignacion
                </MDButton>
                <br />
                <br />
                <MaterialTable
                  columns={columns}
                  data={data}
                  title="Asignaciones"
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar Asignacion",
                      onClick: (event, rowData) => seleccionarAsignacion(rowData, "Editar"),
                    },
                    {
                      icon: "delete",
                      tooltip: "Eliminar Asignacion",
                      onClick: (event, rowData) => seleccionarAsignacion(rowData, "Eliminar"),
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

export default Asignaciones;

// // import PropTypes from 'prop-types'
// import React from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// function Asignaciones() {
//   const listapilotos = [{ label: "Piloto 1" }, { label: "Piloto 2" }, { label: "Piloto 3" }];
//   const listavehiculos = [
//     { label: "Vehiculo 1" },
//     { label: "Vehiculo 2" },
//     { label: "Vehiculo 3" },
//   ];
//   const listaclientes = [{ label: "Cliente 1" }, { label: "Cliente 2" }, { label: "Cliente 3" }];
//   const listaestado = [{ label: "Optimo" }, { label: "Daños leves" }, { label: "No conducible" }];

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Piloto:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={listapilotos}
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label="Pilotos" />}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Vehiculo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 options={listavehiculos}
//                 fullWidth
//                 renderInput={(params) => <TextField {...params} label="Vehiculo" />}
//               />
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Cliente:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 options={listaclientes}
//                 fullWidth
//                 renderInput={(params) => <TextField {...params} label="Cliente" />}
//               />
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Kilometraje:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="number" label="Kilometraje" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Estado del Vehiculo:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={listaestado}
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label="Estado del Vehiculo" />}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={4} lg={2}>
//               <MDBox mb={2}>
//                 <MDTypography variant="h6">Observaciones:</MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={2}>
//                 <MDInput type="text" label="Observaciones" fullWidth />
//               </MDBox>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4} lg={2}>
//               <MDButton variant="gradient" color="info" fullWidth>
//                 Crear
//               </MDButton>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </Card>
//     </DashboardLayout>
//   );
// }

// export default Asignaciones;
