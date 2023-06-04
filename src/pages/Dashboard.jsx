import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/action";
import ChartComp from "../components/ChartComp";
const Dashboard = () => {
 
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} h={`12vh`}>
        <GridItem w="100%" h="10" bg="red.500" />
        <ChartComp />
      </Grid>
    </>
  );
};

export default Dashboard;
