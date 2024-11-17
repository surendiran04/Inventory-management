import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';

const products = [
  { name: 'ASOS Ridey', price: 25.05, quantity: 73, amount: 1828 },
  { name: 'Philip Morris International', price: 85.05, quantity: 84, amount: 7144 },
  { name: 'Donna Karan', price: 96.05, quantity: 94, amount: 9028 },
  { name: 'Marco Pollo', price: 31.09, quantity: 51, amount: 1585 },
  { name: 'Dolce Gabbana', price: 27.09, quantity: 78, amount: 2113 },
];

const TopSellingProductsTable = () => {
  return (
    <Card sx={{ padding: 2, borderRadius: 2,boxShadow: 3,position:'relative',left:'20px',width:'630px', height:'400px',top:'12px'}}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Top selling products</Typography>
        <Box mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopSellingProductsTable;
