import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createBox } from 'ui/Box/BoxActions'
import { hideBoxes as hideBoxesIndicator } from 'ui/Box/BoxSelectors'
import { serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes } from 'ui/SideBarController/SideBarControllerActions'

import SideBarControllerStyle from './SideBarController.scss';

function SideBarController ({ createBox, serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes, hideBoxesIndicator }) {
  return (
    <section className="sideBarController">
      {hideBoxesIndicator
        ? <button className="sideBarController-button" onClick={() =>showBoxes()}>show boxes</button>
        : <button className="sideBarController-button" onClick={() =>hideBoxes()}>hide boxes</button>
      }
      <button className="sideBarController-button" onClick={() =>createBox()}>add box</button>
      <button className="sideBarController-button" onClick={() =>serializeBoxs()}>serialize boxs</button>
      <button className="sideBarController-button" onClick={() =>saveBoxesAsPicture()}>save boxes as picture</button>
    </section>
  );
}

export default connect(createStructuredSelector({
  hideBoxesIndicator,
}), {
  showBoxes,
  hideBoxes,
  createBox,
  serializeBoxs,
  saveBoxesAsPicture,
})(SideBarController);
