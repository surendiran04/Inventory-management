import React, { useRef, useState } from 'react';
import { Card, IconButton, Menu,MenuItem, CardContent, Typography, Box} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

const channelData = [
  { day: 'Mon', online: 30, amazon: 40, ebay: 20, physical: 10, distributors: 50 },
  { day: 'Tue', online: 40, amazon: 50, ebay: 25, physical: 15, distributors: 60 },
  { day: 'Wed', online: 50, amazon: 60, ebay: 30, physical: 20, distributors: 70 },
  { day: 'Thu', online: 60, amazon: 70, ebay: 35, physical: 25, distributors: 80 },
  { day: 'Fri', online: 70, amazon: 80, ebay: 40, physical: 30, distributors: 90 },
  { day: 'Sat', online: 80, amazon: 90, ebay: 45, physical: 35, distributors: 100 },
  { day: 'Sun', online: 90, amazon: 100, ebay: 50, physical: 40, distributors: 110 },
];

const ChannelsBarChart = () => {

    const chartRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

  // Function to download chart as PNG
  const downloadAsPNG = async () => {
    const canvas = await html2canvas(chartRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, 'chart.png');
    });
    handleMenuClose();
  };

  // Function to download chart data as CSV
  const downloadAsCSV = () => {
    const csv = channelData.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([`day,online,amazon,ebay,physical,distributors\n${csv}`], { type: 'text/csv' });
    saveAs(blob, 'chart.csv');
    handleMenuClose();
  };

  // Function to download chart as SVG
  const downloadAsSVG = () => {
    const svg = chartRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    saveAs(svgBlob, 'chart.svg');
    handleMenuClose();
  };

  return (
    <Card sx={{ padding: 2, borderRadius: 2,boxShadow: 3,position:'relative',left:'20px',width:'550px', height:'400px',top:'12px' }}>
      <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">Channels</Typography>
        {/* Download IconButton */}
        <IconButton onClick={handleMenuClick}>
          <DownloadIcon />
        </IconButton>

        {/* Menu with download options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={downloadAsPNG}>Download as PNG</MenuItem>
          <MenuItem onClick={downloadAsSVG}>Download as SVG</MenuItem>
          <MenuItem onClick={downloadAsCSV}>Download as CSV</MenuItem>
        </Menu>
      </Box>
        <Box mt={2}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData} barSize={5} barCategoryGap={3}>
              <CartesianGrid strokeDasharray="0 3" />  
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend layout='vertical' align='right' verticalAlign='top'/>
              <Bar dataKey="online" stackId="a" fill="#4285F4" name="Online Store" />
              <Bar dataKey="amazon" stackId="a" fill="#34A853" name="Amazon Marketplace" />
              <Bar dataKey="ebay" stackId="a" fill="#FFBB33" name="eBay Marketplace" />
              <Bar dataKey="physical" stackId="a" fill="#FF5252" name="Physical Store" />
              <Bar dataKey="distributors" stackId="a" fill="#8E24AA" name="Distributors" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChannelsBarChart;
