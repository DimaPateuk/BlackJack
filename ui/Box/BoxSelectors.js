import { createSelector, createStructuredSelector } from 'reselect';


export function boxes (state) {
  return state.getIn(['box', 'boxes']);
}

export const createSpreadBoxProps = () => {
  const spreadBoxProps = createSelector(
    [(state, props) => props],
    ({ data }) => {
      return {
        id: data.get('id'),
        x: data.get('x'),
        y: data.get('y'),
        height: data.get('height'),
        width: data.get('width'),
      };
    }
  );

  return createStructuredSelector({
    spreadBoxProps
  })
}
