//@flow
import { CircularProgress } from 'material-ui/Progress';
import React from 'react';
import './ConditionalCircularProgress.css';

type Props = {
  predicate: boolean,
};
export default (props: Props) => {
  if (props.predicate) {
    return (
      <div className={'conditionalProgress'}>
        <CircularProgress size={90} />
      </div>
    );
  } else {
    return <div />;
  }
};
