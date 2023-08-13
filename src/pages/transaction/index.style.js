import { Modal, Grid, Message } from "semantic-ui-react";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  && {
    width: 400px;
  }
  && .field .label {
    background: none;
    color: initial;
    display: block;
    padding-left: 0;
    margin-top: 10px;
  }
  && .field .input,
  && .field .input input {
    width: 100%;
  }
  && .field .action.input {
    display: flex;
  }
  && .field .action.input input {
    width: initial;
    text-transform: capitalize;
  }
  && .field .ui.labeled {
    display: flex;
  }
  && .field .ui.labeled .label {
    background: #e8e8e8;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.78571429em 0.833em 0.78571429em;
    margin: 0;
  }
  && .field .ui.labeled input {
    width: initial;
  }
`;

export const StyledLine = styled(Grid.Row)`
  &&.row {
    padding: 0;
    margin: -1rem 0;
  }
`;

export const StyledContent = styled(Grid.Row)`
  &&.row {
    display: flex;
    align-items: center;
    margin: 0 1rem;
    border-bottom: 1px solid #ccc;
  }
  && .column:first-child {
    padding-left: 0;
  }
  && .column:last-child {
    padding-right: 0;
  }
`;

export const StyledMessage = styled(Message)`
  && {
    width: 100%;
    margin: 0 1rem;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
