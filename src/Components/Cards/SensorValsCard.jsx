// SensorValsCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SensorValsCard = ({ sensor }) => {
  const { sensorName, avgValue, unit, value, color } = sensor;

  return (
    <Card sx={{ bgcolor: 'primary.bgColor' }}>
      <CardContent sx={{ height: '22vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ color: "#ffcc00", fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '2rem' } }}>{sensorName}</Typography>
        <Typography variant="h4" sx={{ color, padding: '4px', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          {value} {unit}
        </Typography>
        <Typography variant="body3" sx={{ color: "#F8F9F9", fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          Average: {avgValue} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SensorValsCard;
