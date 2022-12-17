const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
  },
  uid: {
    type: String,
    default: "",
  },
});
const UserUpload = mongoose.model("BlogPost", UserSchema);
module.exports = UserUpload;
