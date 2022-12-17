import React from "react";

export default function Home() {
  return (
    <div style={{ padding: 30 }}>
      <h1> welcome to Home</h1>
      <p>you can login, and user who login will get new NAVBAR</p>
      <p>
        you can create (for user that are not login can also create but not able
        to update and deletePost){" "}
      </p>
      <p>login User can create, Update, delete, and see there own Post</p>
      <p>you can See other post </p>
    </div>
  );
}
