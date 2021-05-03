import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import './ConditionalCircularProgress.css';

export default (props) => {
  if (props.predicate) {
    return (
      <div className="conditionalProgress">
        <CircularProgress size={90} />
      </div>
    );
  } else {
    return null;
  }
};
