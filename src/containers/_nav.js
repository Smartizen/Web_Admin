import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý người dùng',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thiết bị'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý loại thiết bị',
    to: '/device-type',
    icon: 'cil-laptop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý các chức năng',
    to: '/functions',
    icon: 'cil-apps-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý các thiết bị',
    to: '/devices',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
  },
];

export default _nav;
