import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { adminLogin } from 'store/actions';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const { user } = useSelector((state) => state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = async () => {
    dispatch(adminLogin({ email, password }));
  };

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      {user ? <Redirect to='/' /> : <></>}
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='4'>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='text'
                        placeholder='Email'
                        autoComplete='email'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-lock-locked' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs='6'>
                        <CButton color='primary' className='px-4' onClick={() => login()}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
