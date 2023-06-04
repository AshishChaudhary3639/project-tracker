
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import Dashboard from '../pages/Dashboard';
import AddProject from "../pages/AddProject";
import Login from "../pages/Login";
import ListPage from "../pages/ListPage";
import Pagination from "../components/Pagination";
import ReqAuth from "../pages/ReqAuth";
import HomePage from "../pages/HomePage";
const AllRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Flex w={`100%`} justify={`space-between`} alignItems={`center`}>
        <VStack w={`3%`} h={`30vh`} border={`1px solid lightgray`}>
          {location.pathname === "/dashboard" ? (
            <Image
              src={process.env.PUBLIC_URL + "/Dashboard-active.svg"}
              pt={`20px`}
              onClick={() => navigate("/dashboard")}
              _hover={{
                cursor: `pointer`,
              }}
            />
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/Dashboard.svg"}
              pt={`20px`}
              onClick={() => navigate("/dashboard")}
              _hover={{
                cursor: `pointer`,
              }}
            />
          )}
          {location.pathname === "/listpage" ? (
            <Image
              src={process.env.PUBLIC_URL + "/Project-list-active.svg"}
              pt={`20px`}
              _hover={{
                cursor: `pointer`,
              }}
            />
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/Project-list.svg"}
              pt={`20px`}
              onClick={() => navigate("/listpage")}
              _hover={{
                cursor: `pointer`,
              }}
            />
          )}
          {location.pathname === "/addproject" ? (
            <Image
              src={process.env.PUBLIC_URL + "/create-project-active.svg"}
              pt={`20px`}
              _hover={{
                cursor: `pointer`,
              }}
            />
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/create-project.svg"}
              pt={`20px`}
              onClick={() => navigate("/addproject")}
              _hover={{
                cursor: `pointer`,
              }}
            />
          )}
        </VStack>

        <Box w={`97%`} position={`relative`} h={`100vh`}>
          <Image
            src={process.env.PUBLIC_URL + "/Header-bg.svg"}
            zIndex={`100`}
            w={`100%`}
            top={`0`}
          />
          <Flex
            position={`absolute`}
            top={`10`}
            width={`100%`}
            align={`center`}
          >
            <Flex
              w={`47%`}
              gap={`1rem`}
              align={`center`}
              color={`white`}
              ml={`1rem`}
            >
              <span>
                <IoIosArrowBack color="white" />
              </span>{" "}
              Create Project
            </Flex>
            <Box w={`50%`}>
              <Image
                src={process.env.PUBLIC_URL + "/Logo.svg"}
                boxSize="60px"
              />
            </Box>
          </Flex>
          <Box
            border={`1px solid lightgray`}
            h={location.pathname==='/login'?"70%":"80%"}
            position={`absolute`}
            zIndex={`999`}
            w={location.pathname==='/login'?"40%":"90%"}
            bgColor={`#ffff`}
            top={location.pathname==='/login'?"20%":"15%"}
            left={location.pathname==='/login'?"30%":"5%"}
            borderRadius={`10px`}
            overflow={location.pathname==='/login'?'':"auto"}
          >
            <Routes>
                <Route path="/" element={<HomePage/>}/>
              <Route
                path="/dashboard"
                element={
                  <ReqAuth>
                    <Dashboard />
                  </ReqAuth>
                }
              />
              <Route
                path="/listpage"
                element={
                  <ReqAuth>
                    <ListPage />
                  </ReqAuth>
                }
              />
              <Route
                path="/addproject"
                element={
                  <ReqAuth>
                    <AddProject />
                  </ReqAuth>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
          <Pagination />
        </Box>
      </Flex>
    </>
  );
};

export default AllRoute;
