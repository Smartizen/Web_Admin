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
} from '@coreui/react';
import { useEffect, useState } from 'react';
import axiosClient from 'api';
import { useDispatch } from 'react-redux';
import { setFunctions } from 'store/actions';

const fields = ['id', 'name', 'command', 'description', 'Action'];

export default function Functions() {
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [command, setCommand] = useState(null);
  const [description, setDescription] = useState(null);

  const dispatch = useDispatch();

  const getFunctions = async () => {
    let data = await axiosClient.get('/function');
    setData(data);
    dispatch(setFunctions(data));
  };

  const setNull = () => {
    setId(null);
    setName(null);
    setCommand(null);
    setDescription(null);
  };

  useEffect(() => {
    getFunctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData]);

  const toggle = () => {
    setModal(!modal);
  };

  const updateToggle = (device) => {
    setUpdateModal(!updateModal);
    if (updateModal) setNull();
    else {
      let { id, name, command, description } = device;
      setId(id);
      setName(name);
      setCommand(command);
      setDescription(description);
    }
  };

  const addFunction = async () => {
    let res = await axiosClient.post('/function', { name, command, description });
    if (res.status === 200) {
      getFunctions();
      toggle();
      setNull();
    }
  };

  const deleteFunction = async ({ id }) => {
    let res = await axiosClient.delete(`/function/${id}`);
    if (res.status === 200) getFunctions();
  };

  const updateFunction = async () => {
    let res = await axiosClient.put(`/function/${id}`, { name, command, description });
    if (res.status === 200) {
      getFunctions();
      updateToggle();
    }
  };

  return (
    <div>
      <CCol xs='12' lg='12'>
        <CCard>
          <CCardHeader className='between'>
            <strong>Bảng tổng hợp các chức năng</strong>
            <CButton color='success' onClick={toggle}>
              Thêm chức năng
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
                      <CButton
                        block
                        shape='pill'
                        className='btn-sm'
                        color='primary'
                        onClick={() => updateToggle(device)}
                      >
                        Cập nhật
                      </CButton>
                    </td>
                    <td>
                      <CButton
                        block
                        shape='pill'
                        className='btn-sm'
                        color='danger'
                        onClick={() => deleteFunction(device)}
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
        <CModalHeader closeButton>Thêm chức năng</CModalHeader>
        <CModalBody>
          <CLabel>Tên</CLabel>
          <CInput placeholder='Hãy điền tên chức năng' onChange={(e) => setName(e.target.value)} />

          <CLabel>Command</CLabel>
          <CInput placeholder='Command ( Tùy chọn )' onChange={(e) => setCommand(e.target.value)} />

          <CLabel>Mô tả</CLabel>
          <CInput
            placeholder='Hãy điền mô tả chức năng'
            onChange={(e) => setDescription(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => addFunction()}>
            Gửi
          </CButton>
          <CButton color='secondary' onClick={toggle}>
            Thoát
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal show={updateModal} onClose={() => setUpdateModal()}>
        <CModalHeader closeButton>Cập nhật chức năng</CModalHeader>
        <CModalBody>
          <CLabel>Tên</CLabel>
          <CInput
            placeholder='Cập nhật tên'
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />

          <CLabel>Command</CLabel>
          <CInput
            placeholder='Cập nhật Command'
            defaultValue={command}
            onChange={(e) => setCommand(e.target.value)}
          />

          <CLabel>Mô tả</CLabel>
          <CInput
            placeholder='Cập nhật mô tả'
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => updateFunction()}>
            Gửi
          </CButton>
          <CButton color='secondary' onClick={updateToggle}>
            Xóa
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
