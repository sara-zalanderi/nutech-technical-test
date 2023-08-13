import React, { Fragment, useState, useRef } from "react";
import { Input } from "semantic-ui-react";
import { debounce } from "lodash";

const SearchFilter = ({ onGetList }) => {
  const [keywords, setkeywords] = useState("");
  const delayedkeywords = useRef(
    debounce((q) => {
      onGetList(
        q
          ? {
              q: q,
              page: 1,
            }
          : {
              page: 1,
            },
        true
      );
    }, 500)
  ).current;

  const handleChangeFilterSearch = (e) => {
    setkeywords(e.target.value);
    delayedkeywords(e.target.value);
  };

  return (
    <Fragment>
      <Input
        name="search"
        placeholder="Search Pokémon name"
        icon="search"
        iconPosition="right"
        clearable
        fluid
        value={keywords}
        onChange={(e, newValue) => handleChangeFilterSearch(e, newValue)}
        style={{ width: "250px" }}
      />
    </Fragment>
  );
};

export default SearchFilter;
