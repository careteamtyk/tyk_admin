
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Plans from './Plans';
import Topups from './Topups';

export default function ManagePlans() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} >
        <Tab label="Subscriptions" />
        <Tab label="Topups" />
      </Tabs>
      {
        value ===0?<Plans />:<Topups />
      }
    </Box>
  );
}