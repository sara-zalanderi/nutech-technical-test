import { Message } from "semantic-ui-react";
import styled from "styled-components";

export const StyledMessage = styled(Message)`
  && h2 {
    margin: 2rem 0 -1rem;
  }
  && h4 {
    line-height: 1.5;
  }
  && p {
    line-height: 1.75;
  }
`;
