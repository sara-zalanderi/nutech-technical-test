import styled from "styled-components";
import { Segment } from "semantic-ui-react";

export default styled(Segment)`
  &.segment {
    right: 15px;
    position: fixed;
    top: 80px;
    z-index: 1000;
    padding: 20px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    border-left: 4px solid #009688;
    border-radius: 5px;
    &.teal-border {
      border-left: 4px solid#00b5ad;
    }

    &.blue-border {
      border-left: 4px solid #2185d0;
    }

    &.red-border {
      border-left: 4px solid #db2828;
    }
  }
  .ui.header {
    font-weight: 400;
    display: flex;
    align-items: center;
    > p {
      width: 200px;
      margin-left: 10px;
    }
  }
`;
