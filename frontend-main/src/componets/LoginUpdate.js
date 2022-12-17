import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Card, Form, Modal } from "react-bootstrap";

export default function LoginUpdate(props) {
  const [post, setPost] = useState();
  const [render, setRender] = useState(0);
  const [show, setShow] = useState(false);
  const [updatePost, setUpdatePost] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("Uid form Login Update", props.uid);
  useEffect(() => {
    Axios.get("https://icsi-518-hw3.herokuapp.com/usersPost")
      .then((res) => {
        console.log(res);
        setPost([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [render]);
  const deletePost = (id) => {
    console.log("About delete this id ", id);
    Axios.delete(`https://icsi-518-hw3.herokuapp.com/delete/${id}`)
      .then((res) => {
        console.log(res);
        setRender(render + 1);
        // Success message delete has been made
      })
      .catch((err) => {
        console.log(
          "An error occurred when trying to delete error message =",
          err
        );
      });
  };
  const handleUpdate = (e) => {
    const { name, value } = e?.target;
    setUpdatePost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateCurrentPost = (e) => {
    console.log(e);
    setUpdatePost(e);
    handleShow();
  };

  const saveUpdatedPost = () => {
    console.log(
      "I am about update the post and here what I have so far",
      updatePost
    );
    Axios.put(
      `https://icsi-518-hw3.herokuapp.com/update/${updatePost._id}`,
      updatePost
    )
      .then((res) => {
        console.log("An Update has been made ", res);
        setRender(render + 1);
      })
      .catch((err) => {
        console.log("An error occurred during update", err);
      });
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                placeholder="name or title"
                style={{ marginBottom: "1rem" }}
                name="name"
                value={updatePost.name ? updatePost.name : ""}
                onChange={handleUpdate}
              />

              <Form.Control
                placeholder="bio"
                name="bio"
                style={{ marginBottom: "1rem" }}
                value={updatePost.bio ? updatePost.bio : ""}
                onChange={handleUpdate}
              />
              <Form.Control
                placeholder="url of image"
                name="url"
                value={updatePost.url ? updatePost.url : ""}
                onChange={handleUpdate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveUpdatedPost();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {post
        ? post?.map((current, index) => {
            if (current?.uid === props.uid)
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
                      <Card.Text>{current?.uid}</Card.Text>
                    </Card.Body>
                    <Button
                      onClick={() => {
                        deletePost(current?._id);
                      }}
                    >
                      Delete Post
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateCurrentPost(current);
                      }}
                    >
                      Update Post
                    </Button>
                  </Card>
                </div>
              );
          })
        : ""}
    </div>
  );
}
