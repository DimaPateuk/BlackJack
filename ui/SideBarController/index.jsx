import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createBox } from 'ui/Box/BoxActions'
import { hideBoxes as hideBoxesIndicator, hideBoxesControls as hideBoxesControlsIndicator } from 'ui/Box/BoxSelectors'
import { serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes, hideBoxesControl, showBoxesControl } from 'ui/SideBarController/SideBarControllerActions'

import SideBarControllerStyle from './SideBarController.scss';

function SideBarController ({ createBox, serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes, hideBoxesIndicator, hideBoxesControlsIndicator, hideBoxesControl, showBoxesControl }) {
  return (
    <section className="sideBarController">
      {hideBoxesIndicator
        ? <button className="sideBarController-button" onClick={() => showBoxes()}>show boxes</button>
        : <button className="sideBarController-button" onClick={() => hideBoxes()}>hide boxes</button>
      }
      {hideBoxesControlsIndicator
        ? <button className="sideBarController-button" onClick={() => showBoxesControl()}>show boxes control</button>
        : <button className="sideBarController-button" onClick={() => hideBoxesControl()}>hide boxes control</button>
      }
      <button className="sideBarController-button" onClick={() =>createBox()}>add box</button>
      <button className="sideBarController-button" onClick={() =>serializeBoxs()}>serialize boxs</button>
      <button className="sideBarController-button" onClick={() =>saveBoxesAsPicture()}>save boxes as picture</button>
    </section>
  );
}

export default connect(createStructuredSelector({
  hideBoxesIndicator,
  hideBoxesControlsIndicator,
}), {
  showBoxes,
  hideBoxes,
  hideBoxesControl,
  showBoxesControl,
  createBox,
  serializeBoxs,
  saveBoxesAsPicture,
})(SideBarController);
