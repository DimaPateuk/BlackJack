import { createSelector, createStructuredSelector } from 'reselect';


export function boxes (state) {
  return state.getIn(['box', 'boxes']);
}

export function boxById (state, { id }) {
  return state.getIn(['box', 'boxes']).find((box) => box.get('id') === id);
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
    spreadBoxProps
  })
}
