import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { boxes, hideBoxes } from 'ui/Box/BoxSelectors';

import Box from 'ui/Box'

function BoxesArea ({ boxes, hideBoxes }) {
  return (
    <section className="boxesArea">
      {!hideBoxes && boxes.reduce((res, item) => {
        const id = item.get('id');
        res.push(<Box key={id} id={id} />)
        return res;
      }, [])}
    </section>
  );
}

export default connect(createStructuredSelector({
  boxes,
  hideBoxes,
}))(BoxesArea);
