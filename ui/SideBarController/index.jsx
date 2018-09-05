import React from 'react';
import { connect } from 'react-redux';

import { createBox } from 'ui/Box/BoxActions'
import { serializeBoxs, saveBoxesAsPicture } from 'ui/SideBarController/SideBarControllerActions'

import SideBarControllerStyle from './SideBarController.scss';

function SideBarController ({ createBox, serializeBoxs, saveBoxesAsPicture }) {
  return (
    <section className="sideBarController">
      <button className="sideBarController-button" onClick={createBox}>add box</button>
      <button className="sideBarController-button" onClick={serializeBoxs}>serialize boxs</button>
      <button className="sideBarController-button" onClick={saveBoxesAsPicture}>save boxes as picture</button>
    </section>
  );
}

export default connect(() => ({}), {
  createBox,
  serializeBoxs,
  saveBoxesAsPicture,
})(SideBarController);
