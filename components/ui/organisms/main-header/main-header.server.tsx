import React from "react";
import GoogleButton from "components/ui/atoms/google-button.client";
import * as Styled from "./styled";

export default function MainHeader() {
  return (
    <Styled.Header>
      <a>KBlog</a>
      <a>
        <GoogleButton />
      </a>
    </Styled.Header>
  );
}
