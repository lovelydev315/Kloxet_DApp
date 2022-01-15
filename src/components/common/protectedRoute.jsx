import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authServices";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Componet ? <Component user={user} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
