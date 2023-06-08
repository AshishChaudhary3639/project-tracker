import React, { useState } from "react";
import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/action";
import axios from "axios";
const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      projectName &&
      reason &&
      type &&
      division &&
      category &&
      priority &&
      department &&
      startDate &&
      endDate &&
      location
    ) {
      let payload = {
        projectName,
        reason,
        type,
        division,
        category,
        priority,
        department,
        startDate,
        endDate,
        location,
      };
      const token = localStorage.getItem("projectTrackerToken");

      axios
        .post("http://localhost:8080/createproject", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast({
            title: "Project added.",
            description: "We've added your project",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((e) => {
          toast({
            title: "Project not added.",
            description: "We could not your project",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(e);
        });
    }
    else{
      toast({
        title: "Project not added.",
        description: "Every input feild are required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Flex w={`95%`} m={`auto`} justify={`space-between`} mt={`1rem`}>
        <Input
          value={projectName}
          type="text"
          placeholder="Project name"
          w={`60%`}
          border={`1px solid lightgray`}
          outline={`none`}
          padding={`5px`}
          borderRadius={`7px`}
          h={`50px`}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button
          border={`1px solid lightgray`}
          w={`150px`}
          h={`40px`}
          borderRadius={`20px`}
          bgColor={`#025aab`}
          color={`white`}
          onClick={handleSubmit}
        >
          Save Project
        </Button>
      </Flex>
      <Flex w={`95%`} m={`auto`} gap={30} mt={`2rem`}>
        <select
          style={{
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            height: "40px",
            outline: "none",
          }}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option>Select Reason</option>
          <option value="business">For Business</option>
          <option value="education">For Education</option>
          <option value="dealership">For Dealership</option>
          <option value="transport">For Transport</option>
        </select>
        <select
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Select Type</option>
          <option value="internal">Internal</option>
          <option value="external">Extarnal</option>
        </select>
        <select
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option>Select Filters</option>
          <option value="filter">Filters</option>
          <option value="compresser">Compresser</option>
          <option value="pumps">Pumps</option>
        </select>
      </Flex>
      <Flex w={`95%`} m={`auto`} gap={30} mt={`2rem`}>
        <select
          style={{
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            height: "40px",
            outline: "none",
          }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          <option value="A">Quality A</option>
          <option value="B">Quality B</option>
          <option value="C">Quality C</option>
          <option value="D">Quality D</option>
        </select>
        <select
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>Select Department</option>
          <option value="strategy">Strategy</option>
          <option value="finance">Finance</option>
          <option value="hr">HR </option>
        </select>
      </Flex>
      <Flex w={`95%`} m={`auto`} gap={30} mt={`2rem`}>
        <input
          type="date"
          placeholder="Start date"
          style={{
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            height: "40px",
            outline: "none",
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select
          style={{
            height: "40px",
            border: `1px solid lightgray`,
            borderRadius: "7px",
            width: "29%",
            outline: "none",
          }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option>Select location</option>
          <option value="pune">Pune</option>
          <option value="lucknow">Lucknow</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="noida">Noida</option>
        </select>
      </Flex>
      <Flex w={`95%`} m={`auto`} gap={30} mt={`2rem`}>
        <Box w={`29%`}></Box>
        <Box w={`29%`}></Box>
        <Box w={`29%`}>
          Status: <span style={{ fontWeight: `bold` }}>{`Registered`}</span>
        </Box>
      </Flex>
    </>
  );
};

export default AddProject;
