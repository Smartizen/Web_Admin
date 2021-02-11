import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CLabel,
  CInput,
  CSelect,
} from '@coreui/react';
import { useEffect, useState } from 'react';
import axiosClient from 'api';

const fields = ['id', 'deviceId', 'typeId', 'description', 'createdAt', 'Action'];

export default function Devices() {
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [typeId, setTypeId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  const getDevice = async () => {
    let data = await axiosClient.get('/device');
    setData(data);
  };

  useEffect(() => {
    getDevice();
  }, [setData]);

  const toggle = () => {
    setModal(!modal);
  };

  const registerDevice = async () => {
    let res = await axiosClient.post('/device', { typeId, deviceId, description, price, discount });
    if (res.status === 200) {
      getDevice();
      toggle();
    }
  };

  const deleteDevice = async ({ typeId, deviceId }) => {
    let res = await axiosClient.delete(`/device/${typeId}/${deviceId}`);
    if (res.status === 200) getDevice();
  };

  return (
    <div>
      <CCol xs='12' lg='12'>
        <CCard>
          <CCardHeader className='between'>
            <strong>Device Table</strong>
            <CButton color='success' onClick={toggle}>
              Add new Device
            </CButton>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              items={data}
              fields={fields}
              hover
              striped
              bordered
              itemsPerPage={10}
              pagination
              scopedSlots={{
                Action: (device) => (
                  <>
                    <td>
                      <CButton block shape='pill' className='btn-sm' color='primary'>
                        Update
                      </CButton>
                    </td>
                    <td>
                      <CButton
                        block
                        shape='pill'
                        className='btn-sm'
                        color='danger'
                        onClick={() => deleteDevice(device)}
                      >
                        Delete
                      </CButton>
                    </td>
                  </>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal */}
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>Register Device</CModalHeader>
        <CModalBody>
          <CLabel>Type Id</CLabel>
          <CSelect onChange={(e) => setTypeId(e.target.value)}>
            <option value='test2'>test2</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </CSelect>

          <CLabel>Device Id</CLabel>
          <CInput
            placeholder='Please enter deviceId'
            onChange={(e) => setDeviceId(e.target.value)}
          />

          <CLabel>Description</CLabel>
          <CInput placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

          <CLabel>Price</CLabel>
          <CInput placeholder='Price' onChange={(e) => setPrice(parseInt(e.target.value))} />

          <CLabel>Discount</CLabel>
          <CInput placeholder='Discount' onChange={(e) => setDiscount(parseInt(e.target.value))} />
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => registerDevice()}>
            Register
          </CButton>
          <CButton color='secondary' onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
