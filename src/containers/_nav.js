import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Devices'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Device Type',
    to: '/device-type',
    icon: 'cil-laptop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Functions',
    to: '/functions',
    icon: 'cil-apps-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Device',
    to: '/devices',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
  },
];

export default _nav;
