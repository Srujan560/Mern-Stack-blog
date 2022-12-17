import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "react-bootstrap";
export default function Display() {
  const [post, setPost] = useState();
  useEffect(() => {
    Axios.get("https://icsi-518-hw3.herokuapp.com/usersPost")
      .then((res) => {
        console.log(res);
        setPost([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ padding: 30 }}>
      {post
        ? post?.map((current, index) => {
            return (
              <div key={index}>
                <Card
                  className="text-center"
                  border="primary"
                  style={{ width: "50rem", height: "50rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={current?.url}
                    alt="profile picture"
                    height="500rem"
                  />
                  <Card.Body>
                    <Card.Title>{current?.name}</Card.Title>
                    <Card.Text>{current?.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        : ""}
    </div>
  );
}
