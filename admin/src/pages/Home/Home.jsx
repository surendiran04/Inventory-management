// import React from 'react'

// function Home() {
//   return (
//     <div>
//       Home
//     </div>
//   )
// }

// export default Home

import React from 'react';
import './Home.css'
import { Card, CardContent, Typography, Box, Grid2 } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SalesLineChart from './SalesLineChart';
import ChannelsBarChart from './ChannelsBarChart';
import TopSellingProductsTable from './TopSellingProductsTable';
import Sidebar from '../../components/Sidebar/Sidebar';

const data = [
  { icon: <InventoryIcon fontSize="large" style={{ color: '#fff' }} />, label: 'Picked', value: 1256 },
  { icon: <LocalShippingIcon fontSize="large" style={{ color: '#fff' }} />, label: 'Shipped', value: 12 },
  { icon: <CheckCircleIcon fontSize="large" style={{ color: '#fff' }} />, label: 'Delivered', value: 15 },
  { icon: <ReceiptIcon fontSize="large" style={{ color: '#fff' }} />, label: 'Invoice', value: '07' },
];

const Home = () => {
  return (
    <div className='app-content'>
        <Sidebar />
    <div>
    <Grid2 container spacing={10} sx={{margin:'3px 3px 2px 10px',padding:'10px',position:'sticky'}}>
      {data.map((item, index) => (
        <Grid2 item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, boxShadow: 7, borderRadius: 4 }}>
            <Box
              sx={{
                // backgroundColor: '#1976d2',
                backgroundColor:'rgb(255,99,71)',
                borderRadius: '8px',
                width: 98,
                height: 68,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2,
                // boxShadow: 3,
                // borderRadius: 2 
              }}
            >
              {item.icon}
            </Box>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="body2" sx={{ fontSize: 24 }} color="textSecondary">
                {item.label}
              </Typography>
              <Typography variant="h5" sx={{ fontSize: 20 }}>{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
    <SalesLineChart />
    <div className='pos'>
        <ChannelsBarChart />
        <TopSellingProductsTable />
    </div>
    </div>
    </div>
  );
};

export default Home;
