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

export default function SmartizenDevices() {
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [typeId, setTypeId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [host, setHost] = useState();
  const [description, setDescription] = useState();

  const { smartizenDeviceType } = useSelector((state) => state);

  const getDevice = async () => {
    let data = await axiosClient.get('/device/platform/smartizen');
    setData(data);
  };

  useEffect(() => {
    getDevice();
  }, [setData]);

  useEffect(() => {
    setTypeId(smartizenDeviceType[0].typeId);
  }, [smartizenDeviceType]);

  const toggle = () => {
    setModal(!modal);
  };

  const registerDevice = async () => {
    await axiosClient.post('/device/smartizen', { typeId, deviceId, host, description });
    getDevice();
    toggle();
  };

  const deleteDevice = async ({ typeId, deviceId }) => {
    await axiosClient.delete(`/device/smartizen/${typeId}/${deviceId}`);
    getDevice();
  };

  return (
    <div>
      <CCol xs='12' lg='12'>
        <CCard>
          <CCardHeader className='between'>
            <strong>Bảng thiết bị trên Smartizen Platform</strong>
            <CButton color='success' onClick={toggle}>
              Thêm thiết bị
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
                        Cập nhật
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
                        Xóa
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
        <CModalHeader closeButton>Đăng ký thiết bị</CModalHeader>
        <CModalBody>
          <CLabel>Chọn loại thiết bị</CLabel>
          <CSelect onChange={(e) => setTypeId(e.target.value)}>
            {smartizenDeviceType.map((type, index) => (
              <option key={index} value={type.typeId}>
                {type.typeId}
              </option>
            ))}
          </CSelect>

          <CLabel>Nhập Device Id</CLabel>
          <CInput placeholder='Hãy nhập device Id' onChange={(e) => setDeviceId(e.target.value)} />

          <CLabel>Host</CLabel>
          <CInput placeholder='Hãy nhập host' onChange={(e) => setHost(e.target.value)} />

          <CLabel>Mô tả</CLabel>
          <CInput
            placeholder='Hãy nhập mô tả thiết bị'
            onChange={(e) => setDescription(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => registerDevice()}>
            Gửi
          </CButton>
          <CButton color='secondary' onClick={toggle}>
            Thoát
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
