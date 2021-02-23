import { CButton, CModal, CModalBody, CModalHeader, CModalFooter } from '@coreui/react';
import { useState } from 'react';

export default function deleteModal({ url }) {
  const [modal, setModal] = useState(false);

  const deleteCommand = async (id) => {
    try {
      await axiosClient.delete(url);
      getCommands(currentDeviceType);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CButton
        block
        shape='pill'
        className='btn-sm'
        color='danger'
        onClick={() => deleteCommand(item.id)}
      >
        Delete
      </CButton>
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
    </>
  );
}
