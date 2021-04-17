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
} from '@coreui/react';
import { useEffect, useState } from 'react';
import axiosClient from 'api';
import { setDeviceType } from 'store/actions';
import { useDispatch } from 'react-redux';

const fields = ['typeId', 'description', 'createdAt', 'Action', 'Command'];

const commandFields = ['command', 'description', 'Action'];

export default function DeviceType() {
  const [data, setData] = useState();
  const [currentDeviceType, setCurrentDeviceType] = useState();
  const [details, setDetails] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [commands, setCommands] = useState([]);
  const [command, setCommand] = useState();
  const [description, setDescription] = useState();

  const [typeId, setTypeId] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const dispatch = useDispatch();

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
    let res = await axiosClient.post('/device-type', { typeId, newDescription });
    if (res.status === 200) {
      getDevice();
      newToggle();
    }
  };

  const getCommands = async (typeId) => {
    try {
      let data = await axiosClient.get(`/device-type/allCommand/${typeId}`);

      setCurrentDeviceType(data[0].typeId);
      setCommands(data[0].commands);
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
      getCommands(typeId);
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const newToggle = () => {
    setNewModal(!newModal);
  };

  // const addCommand = async () => {
  //   try {
  //     let res = await axiosClient.post('/command', {
  //       deviceTypeId: currentDeviceType,
  //       command,
  //       description,
  //     });
  //     if (res.status === 200) {
  //       getCommands(currentDeviceType);
  //       toggle();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteCommand = async (id) => {
  //   try {
  //     await axiosClient.delete(`/command/${id}`);
  //     getCommands(currentDeviceType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                Command: (item, index) => (
                  <>
                    <td>
                      <CButton
                        block
                        shape='pill'
                        className='btn-sm'
                        color='primary'
                        // onClick={() => {
                        //   toggleDetails(index, item.typeId);
                        // }}
                      >
                        Command
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
                          items={commands}
                          fields={commandFields}
                          hover
                          striped
                          bordered
                          itemsPerPage={10}
                          pagination
                          scopedSlots={{
                            Action: (item) => (
                              <>
                                {console.log(item)}
                                <td>
                                  <CButton
                                    block
                                    shape='pill'
                                    className='btn-sm'
                                    color='danger'
                                    // onClick={() => deleteCommand(item.id)}
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
          <CLabel>Command</CLabel>
          <CInput
            placeholder='Please enter deviceId'
            onChange={(e) => setCommand(e.target.value)}
          />

          <CLabel>Description</CLabel>
          <CInput placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton
            color='primary'
            // onClick={() => addCommand()}
          >
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
