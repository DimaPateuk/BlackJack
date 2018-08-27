import React from 'react';
import { connect } from 'react-redux';

import { createBox } from 'ui/Box/BoxActions'

function SideBarController ({ createBox }) {
  return (
    <span>
      <button onClick={createBox}>add box</button>
    </span>
  );
}

export default connect(() => ({}), {
  createBox,
})(SideBarController);
