import React from "react";
import { Icon, Pagination } from "semantic-ui-react";

import StyledPagination from "./index.style";

const DefaultPagination = ({
  activePage,
  totalPages,
  onPageChange,
  boundaryRange,
  siblingRange,
  ellipsisItem,
  firstItem,
  lastItem,
  prevItem,
  nextItem,
}) => {
  return (
    <StyledPagination>
      <Pagination
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={(e, value) => onPageChange(e, value)}
        boundaryRange={boundaryRange}
        siblingRange={siblingRange}
        ellipsisItem={ellipsisItem}
        firstItem={firstItem}
        lastItem={lastItem}
        prevItem={prevItem}
        nextItem={nextItem}
      />
    </StyledPagination>
  );
};

DefaultPagination.defaultProps = {
  boundaryRange: 0,
  siblingRange: 3,
  ellipsisItem: false,
  firstItem: {
    content: <Icon name="angle double left" />,
    icon: true,
  },
  lastItem: {
    content: <Icon name="angle double right" />,
    icon: true,
  },
  prevItem: {
    content: <Icon name="angle left" />,
    icon: true,
  },
  nextItem: {
    content: <Icon name="angle right" />,
    icon: true,
  },
};

export default DefaultPagination;
