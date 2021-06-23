import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "../pages";

export const HomeRouter = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
    </>
  );
};
