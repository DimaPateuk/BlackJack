import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { boxes } from 'ui/Box/BoxSelectors';


import { createBox } from 'ui/Box/BoxActions'

import Box from 'ui/Box'

function Boody ({ boxes }) {
  return (
    <section>
      {boxes.map((data) => {
        const id = data.get('id');
        return <Box key={id} id={id} />
      })}
    </section>
  );
}

export default connect(createStructuredSelector({
  boxes,
}))(Boody);
