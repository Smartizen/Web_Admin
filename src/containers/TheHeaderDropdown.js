import React, { useState } from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import { Redirect } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { logoutAccount } from 'store/actions';
import { useDispatch } from 'react-redux';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAccount());
    setRedirect('./');
  };

  return (
    <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
      {redirect ? <Redirect to={redirect} /> : <></>}
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div className='c-avatar'>
          <CImg
            src='https://avatars.githubusercontent.com/u/33363513?s=460&u=e99d79f90d47112fba6543671fd9acf705e11728'
            className='c-avatar-img'
            alt='admin@bootstrapmaster.com'
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem header tag='div' color='light' className='text-center'>
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-bell' className='mfe-2' />
          Updates
          <CBadge color='info' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-envelope-open' className='mfe-2' />
          Messages
          <CBadge color='success' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-task' className='mfe-2' />
          Tasks
          <CBadge color='danger' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-comment-square' className='mfe-2' />
          Comments
          <CBadge color='warning' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem header tag='div' color='light' className='text-center'>
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-user' className='mfe-2' />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-settings' className='mfe-2' />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-credit-card' className='mfe-2' />
          Payments
          <CBadge color='secondary' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-file' className='mfe-2' />
          Projects
          <CBadge color='primary' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => logout()}>
          <CIcon name='cil-account-logout' className='mfe-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
