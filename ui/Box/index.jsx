import React from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { createSpreadBoxProps } from 'ui/Box/BoxSelectors';

function Box ({ x, y }) {
  console.log(x, y);
  return <div>Box</div>
}

export default connect(createSpreadBoxProps)(({ spreadBoxProps }) => <Box {...spreadBoxProps} />);
