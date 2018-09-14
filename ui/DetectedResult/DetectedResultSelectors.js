import { createSelector, createStructuredSelector } from 'reselect';

import { boxes } from 'ui/Box/BoxSelectors';

export function prediction (state) {
  return state.getIn(['detectedResult', 'prediction']);
}


export const mapStateToProps = createStructuredSelector({
  prediction,
  boxes,
});
