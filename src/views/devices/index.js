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
import { useSelector } from 'react-redux';

const fields = ['id', 'deviceId', 'typeId', 'description', 'authToken', 'Action'];

export default function Devices() {
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [typeId, setTypeId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [description, setDescription] = useState();

  const { deviceType } = useSelector((state) => state);

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
    console.log({ typeId, deviceId, description });
    let res = await axiosClient.post('/device', { typeId, deviceId, description });
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
            {deviceType.map((type, index) => (
              <option key={index} value={type.typeId}>
                {type.typeId}
              </option>
            ))}
          </CSelect>

          <CLabel>Device Id</CLabel>
          <CInput
            placeholder='Please enter deviceId'
            onChange={(e) => setDeviceId(e.target.value)}
          />

          <CLabel>Description</CLabel>
          <CInput placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
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
