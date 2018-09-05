import throttle from 'lodash.throttle';

export const move = (moveActions, id, {
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

export const changeSize = (changeSizeActions, id, {
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
