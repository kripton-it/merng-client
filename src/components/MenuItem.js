import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Page from '../consts/page';
import Route from '../consts/route';

const MenuItem = ({ item, isActive }) => (
  <Menu.Item
    name={Page[item]}
    active={isActive}
    as={Link}
    to={Route[item]}
  />
)

export default MenuItem;