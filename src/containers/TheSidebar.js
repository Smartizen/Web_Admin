import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

// sidebar nav config
import navigation from './_nav';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className='d-md-down-none' to='/dashboard'>
        <img
          style={{ height: '56px' }}
          src='https://avatars.githubusercontent.com/u/77471619'
          alt='logo'
        />
        <p style={{ margin: '0px 10px', fontSize: 18 }}>
          <strong>Smartizen</strong>
        </p>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className='c-d-md-down-none' />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
