import React from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import throttle from 'lodash.throttle';

import { createSpreadBoxProps } from 'ui/Box/BoxSelectors';

import { updateBox } from './BoxActions';

import BoxStyle from './Box.scss';

let currentBoxId = null;

const move = (moveActions, id, {
  height,
  width,
  x,
  y,
  startX,
  startY,
}) => {
  const pontDiffX = startX - x;
  const pontDiffY = startY - y;

  const func = (e) => moveActions(id, {
    x: e.x - pontDiffX,
    y: e.y - pontDiffY,
  });

  return throttle(func, 50);
}

const changeSize = (changeSizeActions, id, {
  height,
  width,
  startX,
  startY,
  x,
  y,
}) => {

  const func = (e) => {
    const newHeight = height - (startY - e.y);
    const newWidth = width - (startX - e.x);
    changeSizeActions(id, {
      height: newHeight,
      width: newWidth,
      x,
      y,
    });
  };

  return throttle(func, 50);
}

function Box ({ height, width, x, y, id, updateBox, pontDiffX, pontDiffY }) {
  return (
    <section className="box"
      style={{height, width, top: y, left: x}}
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

export default connect(createSpreadBoxProps, { updateBox })(({ spreadBoxProps, ...restProps }) => <Box {...restProps} {...spreadBoxProps} />);
