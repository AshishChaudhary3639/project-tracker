import * as types from './actionType'
import axios from 'axios'
const getProjects=(page=0)=>(dispatch)=>{
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzaGlzaEBnbWFpbC5jb20iLCJpYXQiOjE2ODU2MDU0NjN9.YXJxqkisgB1w8vMEmODKOZFZxpRFSl6jPrUi0vSuYac'
    dispatch({type:types.REQUEST_PROJECT_LIST})
    return axios.get(`https://good-gold-buffalo-fez.cyclic.app/getprojects?page=${page}`,{
        headers:{Authorization:`Bearer ${token}`}
    }).then((res)=>{
        dispatch({type:types.SUCCESS_PROJECT_LIST,payload:res.data})
    }).catch((e)=>{
        dispatch({type:types.FAILURE_PROJECT_LIST,payload:e})
    })
    // console.log(payload)
}

const updateProjectsStatus=({id,status,page})=>(dispatch)=>{
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzaGlzaEBnbWFpbC5jb20iLCJpYXQiOjE2ODU2MDU0NjN9.YXJxqkisgB1w8vMEmODKOZFZxpRFSl6jPrUi0vSuYac'
    dispatch({type:types.REQUEST_PROJECT_LIST})
    return axios.patch(`https://good-gold-buffalo-fez.cyclic.app/getprojects/${id}`,{status,page},{
        headers:{Authorization:`Bearer ${token}`}
    }).then((res)=>{
        dispatch({type:types.SUCCESS_PROJECT_LIST,payload:res.data})
    }).catch((e)=>{
        dispatch({type:types.FAILURE_PROJECT_LIST,payload:e})
    })
    // console.log(payload)
}

export {getProjects,updateProjectsStatus}