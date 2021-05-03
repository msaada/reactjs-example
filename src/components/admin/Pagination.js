import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Admin.css';

export default (props) => {
  let renderedItems = [];
  let nbPages = props.items.length / props.itemsPerPage;
  for (let page = 1; page <= nbPages; page++) {
    renderedItems = [
      ...renderedItems,
      <Pagination.Item
        key={page}
        active={page === props.activePage}
        onClick={props.onSelect(page)}
      >
        {page}
      </Pagination.Item>,
    ];
  }
  if (props.items.length) {
    if (nbPages < 5) {
      return <Pagination className="pagination">{renderedItems}</Pagination>;
    } else {
      return (
        <Pagination className="pagination">
          <Pagination.Prev onClick={props.onSelect(props.activePage - 1)} />
          {renderedItems.slice(0, 3)}
          <Pagination.Ellipsis disabled />
          {renderedItems.slice(nbPages - 3, nbPages)}
          <Pagination.Next onClick={props.onSelect(props.activePage + 1)} />
        </Pagination>
      );
    }
  }
  return null;
};
