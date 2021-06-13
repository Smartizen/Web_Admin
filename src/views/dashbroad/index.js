import React from 'react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import MainChart from '../../components/chart/mainChart';
import { useEffect, useState } from 'react';
import axiosClient from 'api';

const fields = ['id', 'firstname', 'lastname', 'email', 'phonenumber', 'Action'];

export default function Dashboard() {
  const [data, setData] = useState();
  const [inDay, setInDay] = useState(0);
  const [inMonth, setInMonth] = useState(0);

  const getUser = async () => {
    let dataInDay = await axiosClient.get('/users/byUnit?unit=day');
    let dataInMonth = await axiosClient.get('/users/byUnit?unit=month');
    setInDay(dataInDay.data);
    setInMonth(dataInMonth.data);
    let dataUser = await axiosClient.get('/users/getall');
    setData(dataUser.data);
  };

  useEffect(() => {
    getUser();
  }, [setData]);

  const deleteUser = async ({ id }) => {
    await axiosClient.delete(`/users/${id}`);
    getUser();
  };

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm='5'>
              <h4 id='traffic' className='card-title mb-0'>
                Thống kê số lượng người dùng
              </h4>
            </CCol>
            <CCol sm='7' className='d-none d-md-block'>
              <CButton color='primary' className='float-right'>
                <CIcon name='cil-cloud-download' />
              </CButton>
              <CButtonGroup className='float-right mr-3'>
                {['Tháng'].map((value) => (
                  <CButton
                    color='outline-secondary'
                    key={value}
                    className='mx-0'
                    active={value === 'Tháng'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart style={{ height: '300px', margintop: '40px' }} data={inMonth} />
        </CCardBody>
        <CCardFooter>
          <CRow className='text-center'>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Người dùng mới trong ngày</div>
              <strong>{inDay.count} Người dùng</strong>
            </CCol>
            <CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
              <div className='text-muted'>Người dùng mới trong tháng</div>
              <strong>{inMonth.count} Người dùng</strong>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Bảng chi tiết thông tin của người dùng</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs='12' md='12' xl='12'>
                  <CDataTable
                    items={data}
                    fields={fields}
                    hover
                    striped
                    bordered
                    itemsPerPage={10}
                    pagination
                    scopedSlots={{
                      Action: (user) => (
                        <>
                          <td>
                            <CButton
                              block
                              shape='pill'
                              className='btn-sm'
                              color='danger'
                              onClick={() => deleteUser(user)}
                            >
                              Xóa
                            </CButton>
                          </td>
                        </>
                      ),
                    }}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
