/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Author = ({ name, seguro }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{seguro}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ npoliza }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {npoliza}
      </MDTypography>
    </MDBox>
  );

  const Tel = ({ telefono }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {telefono}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Empresa", accessor: "empresa", align: "left" },
      { Header: "Poliza", accessor: "poliza", align: "left" },
      { Header: "Telefono", accessor: "telefono", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        empresa: <Author name="Seguros el roble" seguro="Asistencia en carretera" />,
        poliza: <Job npoliza="61798245" />,
        telefono: <Tel telefono="64829348" phone2="92384016" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        empresa: <Author name="Aseguradora General" seguro="Seguro completo" />,
        poliza: <Job npoliza="61798245" />,
        telefono: <Tel telefono="37594039" phone2="47384950" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        empresa: <Author name="Seguros G&T" seguro="Seguro por reparaciones" />,
        poliza: <Job npoliza="34485948" />,
        telefono: <Tel telefono="38495037" phone2="39504859" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        empresa: <Author name="Seguros Universales" seguro="Seguro por daño a la propiedad" />,
        poliza: <Job npoliza="59483759" />,
        telefono: <Tel telefono="36273940" phone2="49503758" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        empresa: <Author name="Seguros Universales" seguro="Seguro por fallecimiento" />,
        poliza: <Job npoliza="48593058" />,
        telefono: <Tel telefono="39503857" phone2="38495837" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
      {
        empresa: <Author name="Aseguradora General" seguro="Seguro de vida" />,
        poliza: <Job npoliza="63940348" />,
        telefono: <Tel telefono="37584930" phone2="39503849" />,
        status: (
          <MDBox ml={-1} sx={{ cursor: "pointer" }}>
            <MDBadge badgeContent="Inactivo" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>visibility</Icon>&nbsp;
            <Icon>drive_folder_upload</Icon>&nbsp;
            <Icon>delete</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
