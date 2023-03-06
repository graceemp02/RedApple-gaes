/** @format */

import { useState, useMemo, useEffect, useContext } from 'react';
import Paper from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ClientContext } from '../context/ClientContext';

function Customers() {
  const { clientID, setClientID } = useContext(ClientContext);
  const [customers, setCustomers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(() => clientID);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get('../customers.php')
      .then(result => {
        setCustomers(result.data);
        if (!clientID) {
          localStorage.setItem('ins_client', result.data[0].id);
          setSelectedIndex(result.data[0].id);
          setClientID(result.data[0].id);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handleListItemClick = (e, index) => {
    e.preventDefault();
    localStorage.setItem('ins_client', index);
    setSelectedIndex(index);
    setClientID(index);
  };
  const filteredCustomers = useMemo(() => {
    return customers.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, customers]);

  return (
    <div style={{ height: { xs: 'auto', sm: '50%' }, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          marginBottom: '5px',
          paddingBottom: '5px',
          borderBottom: '2px solid gray',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
        }}>
        <Typography
          width={'50%'}
          fontWeight={'bold'}
          display={'inline'}
          sx={{
            textDecoration: 'Underline',
            color: 'black',
            mb: 0.5,
            textAlign: 'left',
            fontSize: { xs: '2.5vh', sm: '3vh', md: '3.2vh' },
          }}>
          CUSTOMERS
        </Typography>
        <TextField
          value={query}
          autoFocus
          variant='filled'
          onChange={e => setQuery(e.target.value)}
          label='Search Customer'
          className='cSearch'
          sx={{
            height: '100% !important',
            width: '45%',
            fontSize: '2vh',
          }}
        />
      </div>
      <Paper
        sx={{
          marginBottom: '15px',
          flex: 1,
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: '1vh',
          display: 'flex',
          padding: 0,
        }}>
        {filteredCustomers.length > 0 ? (
          <List
            component='nav'
            aria-label='customers'
            sx={{
              flex: 1,
              minHeight: 'auto',
              maxHeight: { xs: '300px', md: 'fit-content' },
              overflow: 'auto',
              borderRadius: '1vh',
            }}>
            {filteredCustomers.map(row => {
              return (
                <>
                  <ListItemButton
                    sx={{ padding: '0.3rem 1rem' }}
                    divider={filteredCustomers.length - 1 === row.id ? false : true}
                    key={row.name}
                    selected={selectedIndex === row.id}
                    onClick={event => handleListItemClick(event, row.id)}>
                    <ListItemText
                      key={row.name}
                      primary={row.name}
                      sx={{ m: 0, fontSize: '2vh !important' }}
                    />
                  </ListItemButton>
                </>
              );
            })}
          </List>
        ) : (
          <Typography sx={{ textAlign: 'center', fontSize: '2vh', margin: '3vh', width: '100%' }}>
            No Customer with entered name.
          </Typography>
        )}
      </Paper>
    </div>
  );
}
export default Customers;
