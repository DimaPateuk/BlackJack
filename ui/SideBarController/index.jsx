import React from 'react';
import { connect } from 'react-redux';

import { createBox } from 'ui/Box/BoxActions'
import { serializeBoxs } from 'ui/SideBarController/SideBarControllerActions'

import SideBarControllerStyle from './SideBarController.scss';

function SideBarController ({ createBox, serializeBoxs }) {
  return (
    <section className="sideBarController">
      <button className="sideBarController-button" onClick={createBox}>add box</button>
      <button className="sideBarController-button" onClick={serializeBoxs}>serialize boxs</button>
    </section>
  );
}

export default connect(() => ({}), {
  createBox,
  serializeBoxs,
})(SideBarController);
