import React from "react";
import { useSelector } from "react-redux";

const ProtectedPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2>Protected Page</h2>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>You need to log in to access this page.</p>
      )}
    </div>
  );
};

export default ProtectedPage;
