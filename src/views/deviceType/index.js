import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CCollapse,
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
import { setDeviceType } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const fields = ['typeId', 'description', 'createdAt', 'Action', 'Feature'];

const commandFields = ['name', 'command', 'description', 'Action'];

export default function DeviceType() {
  const [data, setData] = useState();
  const [currentDeviceType, setCurrentDeviceType] = useState();
  const [details, setDetails] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [features, setFeatures] = useState([]);
  const [func, setFunc] = useState();

  const [typeId, setTypeId] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const { functions } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setFunc(functions[0].id);
  }, [functions]);

  const getDevice = async () => {
    let data = await axiosClient.get('/device-type');
    setData(data);
    dispatch(setDeviceType(data));
  };

  useEffect(() => {
    const getDevice = async () => {
      let data = await axiosClient.get('/device-type');
      setData(data);
      dispatch(setDeviceType(data));
    };
    getDevice();
  }, [setData, dispatch]);

  const addDeviceType = async () => {
    let res = await axiosClient.post('/device-type', { typeId, description: newDescription });
    if (res.status === 200) {
      getDevice();
      newToggle();
    }
  };

  const getFeatures = async (typeId) => {
    try {
      let data = await axiosClient.get(`/device-type/allFeature/${typeId}`);

      setCurrentDeviceType(data.typeId);
      setFeatures(data.functions);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDetails = (index, typeId) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      getFeatures(typeId);
      newDetails = [index];
    }
    setDetails(newDetails);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const newToggle = () => {
    setNewModal(!newModal);
  };

  const addFunction = async () => {
    try {
      let data = {
        deviceTypeId: currentDeviceType,
        functionId: func,
      };
      let res = await axiosClient.post('/feature', data);
      if (res.status === 200) {
        getFeatures(currentDeviceType);
        toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommand = async (id) => {
    try {
      await axiosClient.delete(`/feature/${id}`);
      getFeatures(currentDeviceType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CCol xs='12' lg='12'>
        <CCard>
          <CCardHeader className='between'>
            <strong>Device Type Table</strong>
            <CButton color='success' onClick={newToggle}>
              Add new Device Type
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
                Action: (item) => (
                  <>
                    <td>
                      <CButton block shape='pill' className='btn-sm' color='danger'>
                        Delete
                      </CButton>
                    </td>
                  </>
                ),
                Feature: (item, index) => (
                  <>
                    <td>
                      <CButton
                        block
                        shape='pill'
                        className='btn-sm'
                        color='primary'
                        onClick={() => {
                          toggleDetails(index, item.typeId);
                        }}
                      >
                        Feature
                      </CButton>
                    </td>
                  </>
                ),
                details: (item, index) => {
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <CButton style={{ marginBottom: 10 }} color='success' onClick={toggle}>
                          Add new Device
                        </CButton>
                        <CDataTable
                          items={features}
                          fields={commandFields}
                          hover
                          striped
                          bordered
                          itemsPerPage={10}
                          pagination
                          scopedSlots={{
                            Action: (item) => (
                              <>
                                <td>
                                  <CButton
                                    block
                                    shape='pill'
                                    className='btn-sm'
                                    color='danger'
                                    onClick={() => deleteCommand(item.Feature.id)}
                                  >
                                    Delete
                                  </CButton>
                                </td>
                              </>
                            ),
                          }}
                        ></CDataTable>
                      </CCardBody>
                    </CCollapse>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal */}
      <CModal show={newModal} onClose={newToggle}>
        <CModalHeader closeButton>Add Function</CModalHeader>
        <CModalBody>
          <CLabel>Type ID</CLabel>
          <CInput placeholder='Please enter Type ID' onChange={(e) => setTypeId(e.target.value)} />

          <CLabel>Description</CLabel>
          <CInput placeholder='Description' onChange={(e) => setNewDescription(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => addDeviceType()}>
            Submit
          </CButton>
          <CButton color='secondary' onClick={newToggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal */}
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>Register Device</CModalHeader>
        <CModalBody>
          <CLabel>Select Function</CLabel>
          <CSelect onChange={(e) => setFunc(e.target.value)}>
            {functions.map((funs, index) => (
              <option key={index} value={funs.id}>
                {funs.name}
              </option>
            ))}
          </CSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color='primary' onClick={() => addFunction()}>
            Add
          </CButton>
          <CButton color='secondary' onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
