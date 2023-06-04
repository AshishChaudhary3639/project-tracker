import {
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, updateProjectsStatus } from "../redux/action";
import * as types from "../redux/actionType";
import {  useSearchParams } from "react-router-dom";
const ListPage = () => {
  const [serachParams,setSearchParams]=useSearchParams('')
  const projects = useSelector((store) => store.appReducer.projects);
  const page=serachParams.get('page')
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  console.log("page",page);

  const handleUpdateStatus=({e},str)=>{
    let statusVal
    if(str==='start'){
      statusVal='Running'
    }else if(str==='close'){
      statusVal='Closed'
    }else if(str==='cancel'){
      statusVal='Cancelled'
    }
    let params={
        id:e._id,
        status:statusVal,
        page:page
      }
      console.log(params)
    dispatch(updateProjectsStatus(params))

  }
  const handleInputSearch = async (e) => {
    setSearch(e.target.value);
    if (search) {
      const token =localStorage.getItem('projectTrackerToken')
      try {
        let res = await fetch(
          `http://localhost:8080/search?query=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        let data = await res.json();
        dispatch({ type: types.SUCCESS_PROJECT_LIST, payload: data });
      } catch (error) {
        dispatch({ type: types.FAILURE_PROJECT_LIST, error });
      }
    }
  };
  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjects());
    }
  }, [dispatch, projects.length]);
  return (
    <>
      <Flex
        w={`90%`}
        m={`auto`}
        justify={`space-between`}
        mt={`1rem`}
        h={`3rem`}
        fontSize={`18px`}
        alignItems={`center`}
      >
        <Flex
          align={`center`}
          gap={`1rem`}
          borderBottom={`1px solid lightgray`}
          p={`5px 0px`}
        >
          <BsSearch />
          <Input
            type="text"
            placeholder="Search..."
            border={`none`}
            outline={`none`}
            onChange={handleInputSearch}
          />
        </Flex>
        <Flex align={`center`} gap={`1rem`}>
          <Text color={`gray`}>Sort by:</Text>
          <select style={{ fontWeight: "400" }}>
            <option>Select option</option>
            <option value={`priority`}>Priority</option>
            <option value={`priority`}>Priority</option>
            <option value={`priority`}>Priority</option>
          </select>
        </Flex>
      </Flex>

      <Table
        size="sm"
        w={`100%`}
        m={`1rem auto`}
        textAlign={"left"}
      >
        <Thead>
          <Tr>
            <Th>Project Name</Th>
            <Th>Reason</Th>
            <Th>Type</Th>
            <Th>Division</Th>
            <Th>Category</Th>
            <Th>Priority</Th>
            <Th>Dept.</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th>Location</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects &&
            projects?.map((e) => (
              <Tr
                key={e._id}
                borderBottom={`1px solid lightgray`}
                p={`10px`}
                h={`40px`}
              >
                <Td>{e.projectName}</Td>
                <Td>{e.reason}</Td>
                <Td>{e.type}</Td>
                <Td>{e.division}</Td>
                <Td>{e.category}</Td>
                <Td>{e.priority}</Td>
                <Td>{e.department}</Td>
                <Td>{e.startDate}</Td>
                <Td>{e.endDate}</Td>
                <Td>{e.location}</Td>
                <Td>{e.status}</Td>
                <Flex justify={`space-between`} align={`center`}>
                  <button
                    style={{
                      borderRadius: `12px`,
                      backgroundColor: `#025aab`,
                      color: `white`,
                      padding: `0px 7px`,
                    }}
                    onClick={()=>handleUpdateStatus({e},'start')}
                  >
                    Start
                  </button>{" "}
                  <button
                    style={{
                      borderRadius: `12px`,
                      border: `1px solid lightgray`,
                      padding: `0px 7px`,
                    }}
                    onClick={()=>handleUpdateStatus({e},'close')}
                  >
                    Close
                  </button>
                  <button
                    style={{
                      borderRadius: `12px`,
                      border: `1px solid lightgray`,
                      padding: `0px 7px`,
                    }}
                    onClick={()=>handleUpdateStatus({e},'cancel')}
                  >
                    Cancel
                  </button>
                </Flex>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ListPage;
