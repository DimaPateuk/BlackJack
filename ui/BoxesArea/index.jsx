import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { boxes } from 'ui/Box/BoxSelectors';


import { createBox } from 'ui/Box/BoxActions'

import Box from 'ui/Box'

function BoxesArea ({ boxes }) {
  return (
    <section className="boxesArea">
      {boxes.reduce((res, item) => {
        const id = item.get('id');
        res.push(<Box key={id} id={id} />)
        return res;
      }, [])}
    </section>
  );
}

export default connect(createStructuredSelector({
  boxes,
}))(BoxesArea);
