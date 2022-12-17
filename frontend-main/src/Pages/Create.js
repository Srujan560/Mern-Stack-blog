import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
// import Link from "react-router-dom";
import Axios from "axios";
export default function Create() {
  const [userpro, setuserpro] = useState({
    name: "",
    bio: "",
    url: "",
    uid: "None",
  });
  const [img, setimg] = useState();
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
      <Alert variant="danger">
        remember you can delete or update post go to login and u will giving a
        new bar and create from there{" "}
      </Alert>
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
            <Form.Label> Will be removed </Form.Label>
            <Form.Control
              disabled
              type="file"
              accept="image/*"
              placeholder="Only files end with .png,.jpg,.jpeg,.webp"
              onChange={(e) => {
                const tempFile = e.target.files[0];
                setimg(tempFile);
              }}
            />
            <Form.Text>
              Only files end with ".png, .jpg, .jpeg, .webp"
            </Form.Text>
          </Form.Group>
          <br />

          <Button
            onClick={() => {
              console.log("Button working ?");
              // const formData = new FormData();

              // formData.append("name", userpro.name);
              // formData.append("bio", userpro.bio);

              // formData.append("file", img);
              // formData.append("upload_present", "xw4yrog1");
              // console.log(formData);
              //   http://localhost:3001/Create
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
          <Button href="/Create">Add another one?</Button>
        </div>
      )}

      {false && <p>img: {img}</p>}
    </div>
  );
}
