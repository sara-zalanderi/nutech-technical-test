import styled from "styled-components";

const StyledPagination = styled.span`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
    padding: 30px 0;
  }
  && span {
    color: #b8b9bd;
  }
  && .ui.menu {
    border: 1px solid #9b9ca2;
  }
  && .ui.menu .item:before {
    background: #9b9ca2;
  }
  && .ui.pagination {
    margin-left: 15px;
  }
  && .ui.pagination.menu .item {
    color: #404145;
    font-weight: bold;
  }
  && .ui.pagination.menu .item i.icon {
    color: #b8b9bd;
  }
  && .ui.pagination.menu .active.item {
    background-color: #0146a0;
    color: #ffffff;
  }
`;

export default StyledPagination;
