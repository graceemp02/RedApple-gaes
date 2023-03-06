/** @format */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Protected = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('gaes_id');
  useEffect(() => {
    if (!id) {
      navigate('/login');
    }
  }, []);
  return <Layout />;
};

export default Protected;
