import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Axios from "axios";
import Update from "../componets/LoginUpdate";
import Create from "../componets/LoginCreate";

export default function Login() {
  const [newUser, setNewUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setlogin] = useState(true);
  const [userObj, setUserObj] = useState({ name: "", uid: "" });
  const [showOptions, setShowOptions] = useState("true");
  const [display, setDisplay] = useState("");

  const handleChange = (event) => {
    // console.log(event.target);
    console.log(
      "name=",
      currentUser.name,
      "password=",
      currentUser.password,
      "email=",
      currentUser.email
    );
    const { name, value } = event.target;
    setCurrentUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div style={{ padding: 30 }}>
      {login ? (
        <div>
          {newUser ? (
            <Button
              onClick={() => {
                setNewUser(false);
              }}
            >
              Go back to Login
            </Button>
          ) : (
            <Button
              onClick={() => {
                setNewUser(true);
              }}
            >
              Create a new Account
            </Button>
          )}
          {newUser ? (
            <Form>
              {/* //from bootstart /form/overview url= {https://react-bootstrap.github.io/forms/overview/ } */}
              <Form.Text>Create a new Account</Form.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="username"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  name="email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
       <Form.Check type="checkbox" label="Check me out" />
     </Form.Group> */}
              <Button
                variant="primary"
                onClick={() => {
                  console.log("About create a new account");
                  console.log("?CurrentUser?", currentUser);
                  Axios.post(
                    "https://icsi-518-hw3.herokuapp.com/newUser",
                    currentUser
                  )
                    .then((res) => {
                      console.log(res);
                      setSuccess("Yes");
                      // Alert("Made a new account");
                      // false;
                    })
                    .catch((err) => {
                      console.log("Was error" + err);
                      // Alert("An error occurred during making of new account" + err);
                      setErrorMessage(err);
                      setSuccess("noNew");
                      console.log(errorMessage, " errorororo");
                    });
                }}
              >
                Create a new Account
              </Button>
              {success === "noNew" && (
                <Alert key="danger" variant="danger">
                  This an error when making a new account (username might be
                  taken)
                </Alert>
              )}
              {success === "Yes" && (
                <Alert key="success" variant="success">
                  This a success you made account go back and login
                </Alert>
              )}
            </Form>
          ) : (
            <Form>
              {/* //from bootstart /form/overview url= {https://react-bootstrap.github.io/forms/overview/ } */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="username"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Please keep a week password we do not do any encrypt
                </Form.Text>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
              <Button
                variant="primary"
                onClick={() => {
                  console.log("About run Login", currentUser);
                  Axios.post(
                    "https://icsi-518-hw3.herokuapp.com/login",
                    currentUser
                  )
                    .then((res) => {
                      console.log(res);
                      console.log(res.data, "Data from EXPRESS");
                      setUserObj({ uid: res.data.uid, name: res.data.name });
                      console.log(
                        "uid=",
                        res.data.uid,
                        "name= ",
                        res.data.name
                      );
                      console.log("USER OBJ ", userObj);
                      setlogin(false);
                      setSuccess("LoginYes");
                      // false;
                    })
                    .catch((err) => {
                      console.log("Was error " + err);
                      setSuccess("ErrorLogin");
                      // true;
                    });
                }}
              >
                Login{" "}
              </Button>
              {success === "ErrorLogin" && (
                <Alert key="danger" variant="danger">
                  This an error when logins into your account (username might be
                  wrong)
                </Alert>
              )}
            </Form>
          )}{" "}
        </div>
      ) : (
        <div>
          {console.log("USER OBJ ", userObj)}

          <Button
            onClick={() => {
              setUserObj({ name: "", uid: "" });
              setlogin(true);
            }}
          >
            log out
          </Button>
          {showOptions ? (
            <Card>
              <Button
                onClick={() => {
                  setDisplay("CREATE");
                  setShowOptions(false);
                }}
              >
                Create
              </Button>
              <Button
                onClick={() => {
                  setDisplay("UPDATE");
                  setShowOptions(false);
                }}
              >
                Update
              </Button>
            </Card>
          ) : (
            <Card>
              <Button
                onClick={() => {
                  setShowOptions(true);
                  setDisplay("");
                }}
              >
                Go Back
              </Button>
            </Card>
          )}

          {display === "UPDATE" && <Update uid={userObj.uid} />}
          {display === "CREATE" && <Create uid={userObj.uid} />}

          <p>Hello world</p>
        </div>
      )}
    </div>
  );
}
// export userObj;
