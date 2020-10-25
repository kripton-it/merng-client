import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import MenuItem from './MenuItem';

import MenuItems from '../consts/menu-items';
import Page from '../consts/page';
import Route from '../consts/route';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { logout, user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const activeItem = pathname.slice(1) || Page.HOME;
  const defaultMenu = (
    <Menu pointing secondary size='massive' color='teal'>
      {MenuItems.LEFT.map(item => (
        <MenuItem
          key={item}
          item={item}
          isActive={activeItem === Page[item]}
        />
      ))}
      <Menu.Menu position='right'>
        {MenuItems.RIGHT.map(item => (
          <MenuItem
            key={item}
            item={item}
            isActive={activeItem === Page[item]}
          />
        ))}
      </Menu.Menu>
    </Menu>
  );

  return user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={user.username}
        active
        as={Link}
        to={Route.HOME}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name={Page.LOGOUT}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : defaultMenu;
};

export default MenuBar;