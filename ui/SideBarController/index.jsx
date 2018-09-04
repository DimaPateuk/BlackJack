import React from 'react';
import { connect } from 'react-redux';

import { createBox } from 'ui/Box/BoxActions'

import SideBarControllerStyle from './SideBarController.scss';

function SideBarController ({ createBox }) {
  return (
    <section className="sideBarController">
      <button onClick={createBox}>add box</button>
    </section>
  );
}

export default connect(() => ({}), {
  createBox,
})(SideBarController);
