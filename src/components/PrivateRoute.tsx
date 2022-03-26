
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../Context";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { currentUser } = useContext<any>(Context);

  return (
    <Route
      {...rest}
      render={(routeProps: any) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute