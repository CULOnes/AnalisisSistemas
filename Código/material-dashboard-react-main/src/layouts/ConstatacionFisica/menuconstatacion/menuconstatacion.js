import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import "styles/styles.css";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function Menuconstatacion() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Realizar Constatacion"
                route="RealizarConstatacion"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="secondary"
                icon="car_repair"
                title="Historial"
                route="Historial"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Menuconstatacion;
