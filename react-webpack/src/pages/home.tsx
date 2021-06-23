import React from "react";
import styled from "@emotion/styled";
// import { Text } from "components";

const Page = (): JSX.Element => {
  return (
    <HomePageWrapper>
      <Title>React Webpack Template</Title>
    </HomePageWrapper>
  );
};

export default Page;

const HomePageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
`;
