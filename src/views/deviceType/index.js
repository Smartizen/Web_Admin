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

const fields = ['typeId', 'description', 'createdAt', 'Action', 'Command'];

const commandFields = ['command', 'description', 'Action'];

// const usersData = [
//   { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
//   { id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
//   { id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//   { id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//   { id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//   { id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//   { id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active' },
//   { id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//   { id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//   { id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//   { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//   { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active' },
//   { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//   { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//   {
//     id: 14,
//     name: 'Eustorgios Amulius',
//     registered: '2018/03/01',
//     role: 'Member',
//     status: 'Pending',
//   },
//   { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//   { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active' },
//   { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//   {
//     id: 18,
//     name: 'Micheal Mercurius',
//     registered: '2018/02/01',
//     role: 'Admin',
//     status: 'Inactive',
//   },
//   {
//     id: 19,
//     name: 'Ganesha Dubhghall',
//     registered: '2018/03/01',
//     role: 'Member',
//     status: 'Pending',
//   },
//   { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//   { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active' },
//   { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//   { id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending' },
//   { id: 42, name: 'Ford Prefect', registered: '2001/05/25', role: 'Alien', status: "Don't panic!" },
// ];

export default function DeviceType() {
  const [data, setData] = useState();
  const [currentDeviceType, setCurrentDeviceType] = useState();
  const [details, setDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [commands, setCommands] = useState([]);
  const [command, setCommand] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const getDevice = async () => {
      let data = await axiosClient.get('/device-type');
      setData(data);
    };
    getDevice();
  }, [setData]);

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

  const addCommand = async () => {
    try {
      let res = await axiosClient.post('/command', {
        deviceTypeId: currentDeviceType,
        command,
        description,
      });
      if (res.status === 200) {
        getCommands(currentDeviceType);
        toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommand = async (id) => {
    try {
      await axiosClient.delete(`/command/${id}`);
      getCommands(currentDeviceType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CCol xs='12' lg='12'>
        <CCard>
          <CCardHeader>Device Type Table</CCardHeader>
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
                        onClick={() => {
                          toggleDetails(index, item.typeId);
                        }}
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
                                    onClick={() => deleteCommand(item.id)}
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
          <CButton color='primary' onClick={() => addCommand()}>
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
