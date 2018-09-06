import { createSelector, createStructuredSelector } from 'reselect';

export function hideBoxes (state) {
  return state.getIn(['box', 'hideBoxes']);
}

export function hideBoxesControls (state) {
  return state.getIn(['box', 'hideBoxesControls']);
}

export function boxes (state) {
  return state.getIn(['box', 'boxes']);
}

export function boxById (state, { id }) {
  return state.getIn(['box', 'boxes']).get(id);
}

export const createSpreadBoxProps = () => {
  const spreadBoxProps = createSelector(
    [boxById],
    (box) => {
      return {
        id: box.get('id'),
        x: box.get('x'),
        y: box.get('y'),
        height: box.get('height'),
        width: box.get('width'),
      };
    }
  );

  return createStructuredSelector({
    spreadBoxProps,
    hideBoxesControls
  })
}
