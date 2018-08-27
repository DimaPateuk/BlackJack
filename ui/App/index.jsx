import React, { Fragment } from 'react';
import appStyle from './AppStyle.scss'

import Boody from 'ui/Boody';
import SideBarController from 'ui/SideBarController';

export default function () {
  return (
    <Fragment>
      <Boody />
      <SideBarController />
    </Fragment>
  );
}
