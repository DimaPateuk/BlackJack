import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './DetectedResultSelectors';
import DetectedResultStyle from './DetectedResult.scss';


function DetectedResult ({ prediction, boxes }) {
  console.log(prediction.toJS());
  let result;
  if (!prediction.count()) {
    result = boxes.reduce((res, box) => {
      res.push(
        (<span className="detectedResult-item">{box.get('id')}</span>)
      );
      
      return res;
    }, []);
  } else {
    result = prediction.reduce((res, lable) => {
      res.push(
        (<span className="detectedResult-item">{lable}</span>)
      );
      
      return res;
    }, []);
  }

  return (
    <section className="detectedResult">
      {result}
    </section>
  );
}

export default connect(mapStateToProps)(DetectedResult);
