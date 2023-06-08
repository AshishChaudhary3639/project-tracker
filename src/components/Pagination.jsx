import React, { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/action";
const Pagination = () => {
  const dispatch = useDispatch();
  const {projects,isAuth,totalPages,currentPage} = useSelector((store) => store.appReducer);
 
  console.log(currentPage)
  useEffect(()=>{
    if(projects.length===0){
      dispatch(getProjects(currentPage))
    }
  },[dispatch,projects,currentPage])

  const handlePageChange=(page)=>{
    dispatch(getProjects(page))
  }
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1px",
        left: "50%",
        display: isAuth?'flex':"none",
        gap: "1rem",
        alignItems:'center',
        color:'red'
      }}
    >
      <Box>{`<<`}</Box>
      
        <Box
          color={`red`}
          
          borderRadius="50%"
          padding="5px"
          
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            p='0px 1rem'
            _hover={{ cursor: "pointer",bgColor:"teal", borderRadius:"50%",padding:"5px" }}
          >
            {page}
          </Button>
        ))}
        </Box>
   
      <Box>{`>>`}</Box>
    </div>
  );
};

export default Pagination;
