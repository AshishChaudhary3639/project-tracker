import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import ChartComp from "../components/ChartComp";
const Dashboard = () => {
  const projects = useSelector((store) => store.appReducer.projects);
 const [department,setDepartment]=useState([])
  useEffect(()=>{
    if(projects){
      projects.map((e)=>{
        if(department[department.length-1]!==e.department){
          setDepartment(e.department)
        }
        return e.department
      })
    }
  },[department,projects])
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} h={`12vh`}>
        <GridItem w="100%" h="10" bg="red.500" />
        <ChartComp department={department}/>
      </Grid>
    </>
  );
};

export default Dashboard;
