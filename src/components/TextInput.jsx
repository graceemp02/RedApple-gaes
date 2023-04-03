/** @format */

import { Alert, Button, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MyDialog from './MyDialog';
import { ClientContext } from '../context/ClientContext';

const TextInput = ({ lable, type, name }) => {
  const [dialog, setDialog] = useState({ status: false, msg: '', title: '' });
  const { clientID } = useContext(ClientContext);
  const [shrk, setShrk] = useState();
  const txtRef = useRef();

  useEffect(() => {
    axios
      .get('txtInput.php', {
        params: { id: clientID, name },
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        const data = res.data.res;
        if (data) {
          setShrk(true);
          txtRef.current.value = data;
        } else {
          setShrk();
          txtRef.current.value = '';
        }
      })
      .catch(err => console.log(err));
  }, [clientID, name]);

  const handleSubmit = async e => {
    e.preventDefault();
    let fd = new FormData();
    fd.append('id', clientID);
    fd.append('txtInput', txtRef.current.value);
    fd.append('name', name);
    await axios
      .post(`txtInput.php`, fd)
      .then(res => {
        if (res.data.res === 'true') {
          setShrk(true);
          setDialog({
            status: true,
            title: 'Success',
            msg: ` Updated Successfully`,
          });
        } else {
          txtRef.current.value = '';
          setDialog({
            msg: 'Sorry, there was an error. Please try again',
            title: 'FAILURE',
            status: true,
          });
        }
      })
      .catch(err => {
        txtRef.current.value = '';
        setDialog({
          msg: 'Sorry, there was an error. Please try again',
          title: 'FAILURE',
          status: true,
        });
        console.log(err);
      });
  };
  return (
    <div className='input-column'>
      <Typography className='input-lable'>{lable}</Typography>
      <form className='inner-txt-form' onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          InputLabelProps={{ shrink: shrk }}
          label={lable}
          size='small'
          sx={{ flex: 1, fontSize: '1.7vh', mr: 1, display: 'inline' }}
          type={type}
          inputRef={txtRef}
        />
        <div className='text-btn-status' style={{ display: 'flex' }}>
          <Button color='success' type='submit' variant='contained' sx={{ mr: 1 }}>
            Upload
          </Button>

          {shrk ? (
            <Alert className='alert' severity='success'>
              Uploaded
            </Alert>
          ) : (
            <Alert className='alert' severity='warning'>
              Not Uploaded
            </Alert>
          )}
        </div>
      </form>

      {dialog.status && (
        <MyDialog
          title={dialog.title}
          des={dialog.msg}
          action={() => setDialog({ status: false })}
        />
      )}
    </div>
  );
};

export default TextInput;
