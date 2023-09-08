import React from 'react';
import { Button } from "@chakra-ui/react"
import {FcGoogle} from "react-icons/fc"
import { auth, provider } from '../authentication/firebase';
import { signInWithPopup } from 'firebase/auth';
import {useNavigate} from "react-router-dom"

function Authentication(props) {
    const navigate = useNavigate()

    const handleLoginWithGoogle = async(e) => {
        await signInWithPopup(auth, provider).then((data) => {
            localStorage.setItem('userId', data.user.uid);
            localStorage.setItem("userDisplayName", data.user.displayName);
            navigate("/");
        })
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",  
            alignItems: "center",    
            justifyContent: "center",  
            height: "100vh", 
            backgroundColor:"#374151" ,
               
        }}>
            <Button mb="20px" onClick={handleLoginWithGoogle} leftIcon={<FcGoogle />} colorScheme='gray' variant='solid'>
    Google
  </Button>
  <Button onClick={()=>{
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }} leftIcon={<FcGoogle />} colorScheme='gray' variant='solid'>
    Logout
  </Button>
        </div>
    );
}

export default Authentication;
