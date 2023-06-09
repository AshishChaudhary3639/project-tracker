import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {SUCCESS_LOGIN} from '../redux/actionType'
import { useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const commingFrom=location.state?.from?.pathname || '/dashboard'
  const handleSubmit=async()=>{
    if(email&&password){
      let payload={email,password}
      let res=await axios.post(`https://good-gold-buffalo-fez.cyclic.app/login`,payload)
      if(res.data.token){
        localStorage.setItem('projectTrackerToken',res.data.token)
        dispatch({type:SUCCESS_LOGIN,payload:true})
        navigate(commingFrom,{replace:true})
      }
    }
  }
  const isEmailError = email === "";
  const isPasswordError = password === "";
  return (
    <Box w={`90%`} m={`auto`}>
      <FormControl isInvalid={isEmailError}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailError ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isPasswordError}>
        <FormLabel>Password</FormLabel>
        <Input
          type="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordError ? (
          <FormHelperText>
            Enter the Password you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="teal" mt={`1rem`}>Submit</Button>
    </Box>
  );
}

export default Login;
