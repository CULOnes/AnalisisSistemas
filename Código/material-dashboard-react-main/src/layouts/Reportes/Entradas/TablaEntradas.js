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
      { Header: "fechas", accessor: "fechas", align: "left" },
      { Header: "valor", accessor: "valor", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="30000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="50000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="30000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="40000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="10000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
      {
        fechas: <Author name="01/01/2021" email="30/02/2021" />,
        valor: <Job phone1="Kilometraje" phone2="15000" />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>picture_as_pdf</Icon>&nbsp;
            <Icon>grid_on</Icon>&nbsp;
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
