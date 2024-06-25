import React from "react";
import { Grid, Typography } from '@mui/material';
import SensorValsCard from '../Components/Cards/SensorValsCard';
import IssuesTable from '../Components/Tables/IssuesTable';
import DataFetcher from '../utils/DataFetcher';

const Introduction = () => {
  const sensors = [
    { systemNumber: 3, sensorNumber: 100 },
    { systemNumber: 4, sensorNumber: 101 },
    { systemNumber: 2, sensorNumber: 102 },
    { systemNumber: 2, sensorNumber: 103 },
    { systemNumber: 1, sensorNumber: 104 },
    { systemNumber: 1, sensorNumber: 105 },
    { systemNumber: 1, sensorNumber: 106 },
    { systemNumber: 1, sensorNumber: 107 },
  ];

  const getColor = (value, minValue, maxValue, avgValue) => {
    const midMaxAvg = (maxValue + avgValue) / 2;
    const midMinAvg = (minValue + avgValue) / 2;

    if (value > midMaxAvg) return '#C2140A'; // High value (red arrow)
    if (value < midMinAvg) return '#0D3CCF'; // Low value (blue arrow)
    return '#74C077'; // Average value (green arrow)
  };

  const renderSensorCard = (data, systemNumber, sensorNumber) => { 
    if (!data) return null;

    const { details, readings } = data;

    const sensorDetails = details.find(sensor => sensor.id === sensorNumber);
    if (!sensorDetails) {
      return null;
    }

    const sensorReading = readings[0];
    if (!sensorReading) {
      return null;
    }

    const sensorData = {
      sensorName: sensorDetails.sensorName,
      avgValue: sensorDetails.avgValue,
      unit: sensorDetails.unit,
      systemNumber,
      sensorNumber,
      value: sensorReading.value,
      color: getColor(sensorReading.value, sensorDetails.minValue, sensorDetails.maxValue, sensorDetails.avgValue),
    };

    return <SensorValsCard sensor={sensorData} />;
  };

  return (
    <>
      <Typography component="h2" sx={{ fontSize: '2rem', color: '#ffcc00', fontWeight: 'bold', fontFamily: 'Lucida Console', marginTop:'2vh' }}>
        Sensors
      </Typography>
      <Grid container spacing={2} pb={2}>
        {sensors.map(({ systemNumber, sensorNumber }) => (
          <Grid item xs={6} md={4} lg={3} key={`${systemNumber}-${sensorNumber}`}>
            <DataFetcher
              apiUrl={`https://autodiagsystemtest.runasp.net/api/v1/car-systems/${systemNumber}/sensors`}
              apiUrl2={`https://autodiagsystemtest.runasp.net/api/v1/car-systems/${systemNumber}/sensors/${sensorNumber}/readings?PageNumber=1&PageSize=1`}
              render={(data) => renderSensorCard(data, systemNumber, sensorNumber)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography component="h2" sx={{ fontSize: '2rem', color: '#ffcc00', fontWeight: 'bold', fontFamily: 'Lucida Console' }}>
        Issues
      </Typography>
      <DataFetcher
        apiUrl="https://autodiagsystemtest.runasp.net/api/v1/faults?pagesize=3&pagenumber=2"
        apiUrl2={null}
        render={(data) => <IssuesTable data={data} />}
      />
    </>
  );
};

export default Introduction;
