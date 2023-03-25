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
  const Author = ({ name, email }) => (
    <MDBox alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ phone1, phone2 }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {phone1}
      </MDTypography>
      <MDTypography variant="caption">{phone2}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Usuarios", accessor: "Usuarios", align: "left" },
      { Header: "telefonos", accessor: "telefonos", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        Usuarios: <Author name="John Michael" email="john@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
        Usuarios: <Author name="Alexa Liras" email="alexa@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
        Usuarios: <Author name="Laurent Perrier" email="laurent@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
        Usuarios: <Author name="Michael Levi" email="michael@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
        Usuarios: <Author name="Richard Gran" email="richard@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
        Usuarios: <Author name="Miriam Eric" email="miriam@creative-tim.com" />,
        telefonos: <Job phone1="61798245" phone2="92384016" />,
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
