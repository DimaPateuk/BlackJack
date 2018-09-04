import React, { Fragment } from 'react';
import appStyle from './AppStyle.scss'

import BoxesArea from 'ui/BoxesArea';
import SideBarController from 'ui/SideBarController';

export default function () {
  return (
    <Fragment>
      <BoxesArea />
      <SideBarController />
    </Fragment>
  );
}
