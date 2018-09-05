import React from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { createSpreadBoxProps } from 'ui/Box/BoxSelectors';

import { updateBox, removeBox, cloneBox } from './BoxActions';

import { move, changeSize } from './BoxUtils';

import BoxStyle from './Box.scss';

let currentBoxId = null;

function Box ({ height, width, x, y, id, updateBox, removeBox, pontDiffX, pontDiffY, cloneBox }) {
  return (
    <section className="box"
      style={{ height, width, top: y, left: x }}
      onMouseDown={(e) => {
        const func = move(updateBox, id, {
          height,
          width,
          x,
          y,
          startX: e.clientX,
          startY: e.clientY,
        });
        const removeListener = () => {
          document.removeEventListener('mousemove', func);
          document.removeEventListener('mouseup', removeListener);
        };

        document.addEventListener('mousemove', func);
        document.addEventListener('mouseup', removeListener);

      }}
    >

      <button className="box-remove-button" onClick={() => removeBox(id)}>remove "{id}"</button>
      <button className="box-clone-button" onClick={() => cloneBox(id)}>clone "{id}"</button>
      <div className="box-size-controlle" onMouseDown={(e) => {
        e.stopPropagation();

        const func = changeSize(updateBox, id, {
          height,
          width,
          startX: e.clientX,
          startY: e.clientY,
          x,
          y,
        });
        const removeListener = () => {
          document.removeEventListener('mousemove', func);
          document.removeEventListener('mouseup', removeListener);
        };

        document.addEventListener('mousemove', func);
        document.addEventListener('mouseup', removeListener);

      }}/>
    </section>
  );
}

export default connect(createSpreadBoxProps, { updateBox, removeBox, cloneBox })(({ spreadBoxProps, ...restProps }) => <Box {...restProps} {...spreadBoxProps} />);
