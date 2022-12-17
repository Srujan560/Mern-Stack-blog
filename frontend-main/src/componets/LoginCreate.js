import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// import Link from "react-router-dom";
import Axios from "axios";

export default function LoginCreate(props) {
  const [userpro, setuserpro] = useState({
    name: "",
    bio: "",
    url: "",
    uid: props?.uid,
  });

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setuserpro((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    console.log(userpro);
  }, [userpro]);
  const [showform, setshowform] = useState(true);
  return (
    <div style={{ width: "98%", margin: "auto auto", textAlign: "center" }}>
      {showform ? (
        <Form>
          <Form.Group>
            <Form.Label>Enter Full name</Form.Label>
            <Form.Control
              type="string"
              name="name"
              value={userpro.name}
              placeholder="Enter Full name"
              style={{
                marginBottom: "1rem",
                width: "45%",
                textAlign: "center",
                margin: "auto auto",
              }}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Type your Bio </Form.Label>
            <Form.Control
              type="string"
              name="bio"
              value={userpro.bio}
              placeholder="I am loving playing sports ...."
              as="textarea"
              rows={3}
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Pick your profile </Form.Label>
            <Form.Control
              type="string"
              name="url"
              value={userpro.url}
              placeholder="Place URL to upload picture ...."
              as="textarea"
              rows={1}
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
          </Form.Group>
          <br />

          <Button
            onClick={() => {
              console.log("Button working ?");

              Axios.post("https://icsi-518-hw3.herokuapp.com/Create", userpro)
                .then((res) => {
                  console.log(res);

                  setshowform(false);
                })
                .catch((err) => {
                  console.log("Was error" + err);
                  setshowform(true);
                });
            }}
          >
            {" "}
            Submit
          </Button>
        </Form>
      ) : (
        <div>
          <h2>Nice Just made post Check it out!</h2>
          <Button href="/Display">Check out the post on Display</Button>
          <Button href="" disable>
            Add another one?
          </Button>
        </div>
      )}
    </div>
  );
}
