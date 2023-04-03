/** @format */

import { Paper, Stack, Typography } from '@mui/material';

import TextInput from './TextInput';
import FileInput from './FileInput';

const MainForm = () => {
  return (
    <Paper variant='outlined' sx={{ m: { xs: 1, md: 1 }, p: { xs: 2, md: 5 } }}>
      <Typography align='center' variant='h6' sx={{ color: 'red', p: 0 }}>
        File size must be less than 5MB
      </Typography>
      <Stack direction='column' gap='.7vh'>
        <TextInput name='noSystems' lable='Number of Systems' type='number' />
        <FileInput name='schedule' lable='Schedule of Commissioning' />
        <TextInput name='checqueNo' lable='Payment Checque Number' type='text' />
        <TextInput name='paymentAmount' lable='Payment Amount' type='text' />
        <FileInput name='agreement' lable='Uploaded Agreement Forms' />
      </Stack>
    </Paper>
  );
};

export default MainForm;
