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
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../redux/actionType";
import axios from "axios";
import { getProjects } from "../redux/action";
const ListPage = () => {
  const { projects, currentPage } = useSelector(
    (store) => store.appReducer.projects
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleUpdateStatus = async ({ e }, str) => {
    let statusVal;
    if (str === "start") {
      statusVal = "Running";
    } else if (str === "close") {
      statusVal = "Closed";
    } else if (str === "cancel") {
      statusVal = "Cancelled";
    }
    try {
      await axios.patch(
        `https://good-gold-buffalo-fez.cyclic.app/getprojects/${e._id}`,
        { statusVal },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "projectTrackerToken"
            )}`,
          },
        }
      );
      dispatch(getProjects(currentPage));
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputSearch = async (e) => {
    setSearch(e.target.value);
    if (search) {
      const token = localStorage.getItem("projectTrackerToken");
      try {
        let res = await fetch(`https://good-gold-buffalo-fez.cyclic.app/search?query=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        let projects = await res.json();
        dispatch({ type: types.SUCCESS_PROJECT_LIST, payload: { projects } });
      } catch (error) {
        dispatch({ type: types.FAILURE_PROJECT_LIST, error });
      }
    }
  };

  const handleSelectedSort = async (e) => {
    let sortOption=e.target.value;
    if (sortOption) {
      try {
        dispatch(getProjects(currentPage,sortOption));
      } catch (error) {
        dispatch({ type: types.FAILURE_PROJECT_LIST, error });
      }
    }
  };

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
          <select style={{ fontWeight: "400" }} onChange={handleSelectedSort}>
            <option>Select option</option>
            <option value={`priority`}>Priority</option>
            <option value={`reason`}>Reason</option>
            <option value={`type`}>Type</option>
            <option value={`division`}>Division</option>
            <option value={`department`}>Department</option>
            <option value={`location`}>Location</option>
            <option value={`status`}>Status</option>
          </select>
        </Flex>
      </Flex>

      <Table size="sm" w={`100%`} m={`1rem auto`} textAlign={"left"}>
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
                    onClick={() => handleUpdateStatus({ e }, "start")}
                  >
                    Start
                  </button>{" "}
                  <button
                    style={{
                      borderRadius: `12px`,
                      border: `1px solid lightgray`,
                      padding: `0px 7px`,
                    }}
                    onClick={() => handleUpdateStatus({ e }, "close")}
                  >
                    Close
                  </button>
                  <button
                    style={{
                      borderRadius: `12px`,
                      border: `1px solid lightgray`,
                      padding: `0px 7px`,
                    }}
                    onClick={() => handleUpdateStatus({ e }, "cancel")}
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
