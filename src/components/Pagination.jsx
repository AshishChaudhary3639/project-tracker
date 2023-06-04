import React, { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/action";
const Pagination = () => {
  const [page, setPage] = useState(0);
  const [searchParams,setSearchParams]=useSearchParams()
  const dispatch = useDispatch();
  const items = useSelector((store) => store.appReducer.projects);
  const count = new Array(Math.floor(Number(items.length / 10)) + 1).fill(1);
  useEffect(() => {
    let params={page:page}
    setSearchParams(params)
    dispatch(getProjects(page));
  }, [dispatch, page,setSearchParams]);
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        left: "50%",
        display: "flex",
        gap: "1rem",
        translate: "-50%",
        alignItems:'center',
      }}
    >
      <Box>{`<<`}</Box>
      {count?.map((_, i) => (
        <Box
          color={`red`}
          key={i}
          onClick={() => setPage(i)}
          borderRadius="50%"
          padding="5px"
          _hover={{ cursor: "pointer",bgColor:"teal", borderRadius:"50%",padding:"5px" }}
        >
          {i + 1}
        </Box>
      ))}
      <Box>{`>>`}</Box>
    </div>
  );
};

export default Pagination;
