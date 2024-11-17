import React, { useRef, useState } from 'react';
import { Card, IconButton, Menu,MenuItem,  CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

const data = [
  { day: 'Mon', currentWeek: 1800, previousWeek: 900 },
  { day: 'Tue', currentWeek: 2500, previousWeek: 1700 },
  { day: 'Wed', currentWeek: 3000, previousWeek: 2500 },
  { day: 'Thu', currentWeek: 3500, previousWeek: 2700 },
  { day: 'Fri', currentWeek: 4000, previousWeek: 3200 },
  { day: 'Sat', currentWeek: 3800, previousWeek: 2900 },
  { day: 'Sun', currentWeek: 3300, previousWeek: 2400 },
];

const SalesLineChart = () => {

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
    <Card sx={{ padding: 2, borderRadius: 2,boxShadow: 3, position:'relative',left:'20px',width:'800px', height:'400px' }}>
      <CardContent>
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Typography variant="h6" fontWeight="bold">Total Sales</Typography>
                <Typography variant="body2" color="textSecondary">Sales over time</Typography>
            </div>    
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
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currentWeek" stroke="#4285F4" dot={{ r: 5 }} name="Current Week" />
              <Line type="monotone" dataKey="previousWeek" stroke="#34A853" dot={{ r: 5 }} name="Previous Week" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesLineChart;
