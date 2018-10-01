import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DetectedResult from 'ui/DetectedResult'

import { createBox } from 'ui/Box/BoxActions'
import { serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes, hideBoxesControl, showBoxesControl } from 'ui/SideBarController/SideBarControllerActions'

import { hideBoxes as hideBoxesIndicator, hideBoxesControls as hideBoxesControlsIndicator } from 'ui/Box/BoxSelectors'

import SideBarControllerStyle from './SideBarController.scss';

var intervalIndecator;

function SideBarController ({ createBox, serializeBoxs, saveBoxesAsPicture, hideBoxes, showBoxes, hideBoxesIndicator, hideBoxesControlsIndicator, hideBoxesControl, showBoxesControl }) {
  return (
    <section className="sideBarController">
      <button className="sideBarController-button" onClick={() => {
        if (!remote) {
          return;
        }

        const w = remote.getCurrentWindow();
        w.close();
      }}>CLOSE</button>
      <button className="sideBarController-button" onClick={() => {
        if (!remote) {
          return;
        }

        const w = remote.getCurrentWindow();
        w.toggleDevTools();
      }}>TOGGLE DEV TOOLS</button>
      {hideBoxesIndicator
        ? <button className="sideBarController-button" onClick={() => showBoxes()}>show boxes</button>
        : <button className="sideBarController-button" onClick={() => hideBoxes()}>hide boxes</button>
      }
      {hideBoxesControlsIndicator
        ? <button className="sideBarController-button" onClick={() => showBoxesControl()}>show boxes control</button>
        : <button className="sideBarController-button" onClick={() => hideBoxesControl()}>hide boxes control</button>
      }
      <button className="sideBarController-button" onClick={() => createBox()}>add box</button>
      <button className="sideBarController-button" onClick={() => serializeBoxs()}>serialize boxs</button>
      <button className="sideBarController-button" onClick={() => {
        saveBoxesAsPicture();
        // if (!intervalIndecator){
        //   intervalIndecator = setInterval(async () => {
        //     if (hideBoxesIndicator) {
        //       saveBoxesAsPicture();
        //     } else {
        //       hideBoxes();
        //       await new Promise(res => setTimeout(res, 300));
        //       saveBoxesAsPicture();
        //       showBoxes();
        //     }
        //   }, 1000);
        // } else {
        //   clearInterval(intervalIndecator);
        //   intervalIndecator = null;
        // }




      }}>save boxes as picture</button>

      <DetectedResult />
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
