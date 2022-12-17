// https://www.youtube.com/watch?v=bRIJQRDI1yg&ab_channel=MarinaKim
const express = require("express");
const cors = require("cors");
const app = express();
const UserModel = require("./UserLogin");
const userPost = require("./UsersPost"); // get create or add new user posts
const mongoose = require("mongoose");
// const multer = require("multer");
mongoose
  .connect(
    "mongodb+srv://ICSI518Hw2:jj39D86_byWRsbE@cluster0.tov4bod.mongodb.net/hw3"
  )
  .catch((err) => {
    console.log(
      "an error has occurred when trying to connect to DB and error message is " +
        err
    );
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express is Working ");
});
// const upload = multer();
// app.post("/Create", upload.single("file"), (req, res, next) => {
//   console.log("What backend got ", req.body);
//   console.log("Image is ", req.file);
//   const {
//     file,
//     body: { name, bio },
//   } = req;
//   res.send(
//     "OK Got the file" +
//       req.file.originalname +
//       "got name " +
//       req.body.name +
//       " got bio " +
//       req.body.bio
//   );
// });

app.post("/Create", (req, res) => {
  // console.log("What BAKCEND GOT  ", req);
  console.log("What backend got ", req.body);
  console.log("Image URL is ", req.body.url);
  const name = req.body.name;
  const bio = req.body.bio;
  const url = req.body.url;
  const newPost = new userPost({
    name,
    bio,
    url,
    uid: req.body.uid,
  });
  newPost.save();
  res.send(
    "OK Got the file" +
      req.body.url +
      "got name " +
      req.body.name +
      " got bio " +
      req.body.bio
  );
});

app.get("/usersPost", (req, res) => {
  // userPost.find({}, (err, result) => {
  //   if (err) {
  //     res.json(err);
  //     console.log(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
  userPost
    .find()
    .then((items) => res.json(items))
    .catch((err) => {
      console.log("error", err);
      res.status(500).json(err);
    });
});

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//       console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

//REGISTER
app.post("/newUser", (req, res) => {
  console.log("What I got in backend for newUser: ", req.body);
  try {
    const newUsers = new UserModel({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    newUsers.save();
    res.status(200).json("user has been created");
  } catch (err) {
    console.log("error has occurred trying to make new account");
    res.status(500).json(err);
  }
});

//login
app.post("/login", (req, res) => {
  console.log("What I got in backed for login user: ", req.body);
  try {
    let name = "";
    let id = "";
    console.log("I amhere before ");
    const currentUser = UserModel.findOne({ name: req.body.name }).then(
      (user) => {
        !user &&
          res
            .status(400)
            .json("no username is wrong (but will say no wrong input ");
        try {
          console.log("names=", user.name);
          console.log("password", user?.password);
          user.password !== req.body.password &&
            res
              .status(400)
              .json("no password is wrong (but will say no wrong input ");
          name = user.name;
          id = user?._id;

          console.log("id = ", id, "and name = ", name);
          res
            .status(200)
            .json({ message: "user has is auth", name: name, uid: id });
        } catch (err) {
          // res
          //   .status(400)
          //   .json("no password is wrong (but will say no wrong input ");
          console.log("my user err", err);
        }
      }
    );

    // !currentUser &&
    //   res.status(400).json("no user name was found (but will say no password)");

    console.log("I am here before ****8********8");

    console.log(" *************8");
  } catch (error) {
    console.log("error has occurred trying logins into account account");
    res.status(500).json(error);
  }
});

app.delete("/delete/:id", (req, res) => {
  console.log("What Backend Delete got  ", req.params.id);
  userPost
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log("the documents is ", result);
      res.status(200).json("A Delete has been made ");
    })
    .catch((error) => {
      console.log("found an error and message is ", error);
      res.status(500).json("sorry Delete was not possible", error);
    });
});

app.put("/update/:id", (req, res) => {
  console.log("id=", req.params);
  console.log("What updateBackendgot =", req.body);
  userPost
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        bio: req.body.bio,
        url: req.body.url,
        uid: req.body.uid,
      }
    )
    .then((result) => {
      console.log("Update has been made document =", result);
      res.status(200).json("An Update has been made ");
    })
    .catch((error) => {
      console.log("found an error and message is ", error);
      res.status(500).json("sorry update was not possible", error);
    });
});

app.listen(3001, () => {
  console.log("Server index .js is running");
  //mongodb+srv://ICSI518Hw2:<jj39D86_byWRsbE>@cluster0.tov4bod.mongodb.net/hw3
});
