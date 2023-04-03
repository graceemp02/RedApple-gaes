/** @format */

import React from 'react';
import { Grid, Paper } from '@mui/material/';
import { styled } from '@mui/material/styles';
import Customers from '../components/Customers';
import MainForm from '../components/MainForm';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const DashboardPage = () => {
  return (
    <Grid container spacing={0.5} sx={{ p: 1 }}>
      <Grid item xs={12} md={5} lg={3}>
        <Item>
          <Customers />
        </Item>
      </Grid>
      <Grid item xs={12} md={7} lg={9}>
        <MainForm />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
