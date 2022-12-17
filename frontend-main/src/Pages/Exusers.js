import React from "react";
import { useState } from "react";
import { Button, Fade } from "react-bootstrap";
import Axios from "axios";
//From https://www.youtube.com/watch?v=je3FTTunyp4&list=PLpPqplz6dKxW5ZfERUPoYTtNUNvrEebAR&index=7&ab_channel=PedroTech
export default function Excuser() {
  const [userExcuse, setUserExcuse] = useState(null);
  // const[userInput, getUserExcuse] = useState(null);
  const fetchData = (excuse) => {
    Axios.get("https://excuser.herokuapp.com/v1/excuse/" + excuse).then(
      (res) => {
        setUserExcuse(res.data[0].excuse);
      }
    );
  };
  return (
    <div>
      <Button
        variant="dark"
        size="lg"
        onClick={() => fetchData("office")}
        aria-controls="my-office"
        aria-expanded={userExcuse}
      >
        Get Office excuse
      </Button>
      <Button
        variant="dark"
        size="lg"
        onClick={() => fetchData("party")}
        aria-controls="my-fade"
        aria-expanded={userExcuse}
      >
        Get party excuse
      </Button>
      <Button
        variant="dark"
        size="lg"
        onClick={() => fetchData("college")}
        aria-controls="fade-college"
        aria-expanded={userExcuse}
      >
        Get College excuse
      </Button>
      {/* <p>{userExcuse}</p> */}
      <Fade in={userExcuse}>
        <p id="my-office">{userExcuse}</p>
        {/* <p id="my-fade">{userExcuse}</p> 
            <p id="fade-college">{userExcuse}</p>  */}
      </Fade>
    </div>
  );
}
