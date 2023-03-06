/** @format */

import { Box, Button, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { ClientContext } from '../context/ClientContext';
import MyDialog from './MyDialog';
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ borderRadius: '100vw' }} variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const MainForm = () => {
  const [dialog, setDialog] = useState({ status: false });
  const { clientID } = useContext(ClientContext);
  const file1Ref = useRef();
  const [progress, setProgress] = useState(0);
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e.currentTarget);
    let fd = new FormData(e.currentTarget);
    fd.append('id', clientID);
    await axios
      .post('mainForm.php', fd, {
        onUploadProgress: ({ loaded, total }) => {
          const p = Math.round((loaded / total) * 100);
          setProgress(p);
        },
      })
      .then(result => {
        const res = result.data.res;
        if (res === true) {
          setDialog({
            title: 'Success',
            des: 'Form is submitted Successfully.',
            status: true,
          });
          document.getElementById('myForm').reset();
        } else if (res === 'file') {
          setDialog({
            title: 'Failure',
            des: 'Form is not submitted. Only Jpg, png and pdf files are allowed. Please try again.',
            status: true,
          });
        } else if (res === 'size') {
          setDialog({
            title: 'Failure',
            des: 'Form is not submitted. File size must be less than 5MB. Please try again.',
            status: true,
          });
        } else {
          setDialog({
            title: 'Failure',
            des: 'Form is not submitted. Please try again.',
            status: true,
          });
        }
      })
      .catch(err => {
        setDialog({
          title: 'Failure',
          des: 'Form is not submitted. Please try again.',
          status: true,
        });
        console.log(err);
      });
  };

  return (
    <Paper variant='outlined' sx={{ m: { xs: 1, md: 3 }, p: { xs: 2, md: 5 } }}>
      <form id='myForm' className='mainForm' onSubmit={handleSubmit}>
        <TextField name='noSystems' type='number' required fullWidth label='Number of Systems' />
        <div className='input-column'>
          <Typography className='input-lable'>Schedule of Commissioning</Typography>
          <input name='schedule' required accept='.pdf,.png,.jpg,jpeg' type='file' ref={file1Ref} />
        </div>
        <TextField type='text' name='checqueNo' required fullWidth label='Payment Checque Number' />
        <TextField type='text' name='paymentAmount' required fullWidth label='Payment Amount' />
        <div className='input-column'>
          <Typography className='input-lable'>Uploaded Agreement Forms</Typography>
          <input
            name='agreement'
            required
            accept='.pdf,.png,.jpg,jpeg'
            type='file'
            ref={file1Ref}
          />
        </div>
        {progress > 0 && progress < 100 && (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}
        <Button type='submit' color='success' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Upload & Save
        </Button>
      </form>
      {dialog.status && (
        <MyDialog
          des={dialog.des}
          title={dialog.title}
          action={() => setDialog({ status: false })}
        />
      )}
    </Paper>
  );
};

export default MainForm;
