import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import ChartComp from "../components/ChartComp";
import { getProjects } from "../redux/action";
const Dashboard = () => {
  const {projects,currentPage} = useSelector((store) => store.appReducer.projects);
  const dispatch=useDispatch()
  const [dep,setDep]=useState([])
  const [uniqDepArr,setUniqDepArr]=useState()
  useEffect(()=>{
    
    if(projects.length!==0){
     let depart=projects.map((e)=>{
      return e.department
     })
     const uniqueDepart=[...new Set(depart)]
     setUniqDepArr(uniqDepArr)
     uniqueDepart.forEach((el)=>{
      
        let singleDep=projects.filter((e)=>{
          if(el.department===e.department){

            return e.status==='Closed'
          }else{
            return
          }
        })
        setDep({e:singleDep.length})
        return
     })
     console.log(uniqueDepart)
    }else{
      dispatch(getProjects(currentPage))
    }
  },[dispatch,projects,currentPage,uniqDepArr])
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} h={`12vh`}>
        <GridItem w="100%" h="10" bg="red.500" />
        <ChartComp department={dep} uniqDepArr={uniqDepArr}/>
      </Grid>
    </>
  );
};

export default Dashboard;
