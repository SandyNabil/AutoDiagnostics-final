import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMediaQuery } from "@mui/material";

const getColor = (value, minValue, maxValue, avgValue) => {
const midMaxAvg = (maxValue + avgValue) / 2;
const midMinAvg = (minValue + avgValue) / 2;

if (value > midMaxAvg) return "#C2140A";
if (value < midMinAvg) return "#0D3CCF";
if (value >= midMinAvg && value <= midMaxAvg) return "#74C077";

return "black";
};

const SensorsStyle = ({
data,
readings,
fetchReadings,
selectedDateReadings,
description,
}) => {
const { sensorName, minValue, maxValue, avgValue, unit } = data.details;
const latestReading =
readings.length > 0 ? readings[readings.length - 1].value : 0;
const chartRef = useRef(null);

const [selectedDate, setSelectedDate] = useState("");

const handleDateChange = (e) => {
setSelectedDate(e.target.value);
fetchReadings(e.target.value);
};

const isSmallScreen = useMediaQuery("(max-width: 768px)");

useEffect(() => {
const chart = chartRef.current;
if (chart) {
const ctx = chart.ctx;
const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

readings.forEach((reading, index) => {
const color = getColor(reading.value, minValue, maxValue, avgValue);
const stopPosition = index / (readings.length - 1);
gradient.addColorStop(stopPosition, color);
});

chart.data.datasets[0].borderColor = gradient;
chart.update();
}
}, [readings]);

const chartData = {
  labels: (isSmallScreen ? readings.slice(-5) : readings.slice(-20)).map(
    (reading) => new Date(reading.createdDate).toLocaleTimeString()
  ),
  datasets: [
    {
      label: sensorName,
      data: (isSmallScreen ? readings.slice(-5) : readings.slice(-20)).map(
        (reading) => reading.value
      ),
      fill: false,
      borderColor: (context) => {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return getColor(value, minValue, maxValue, avgValue);
      },
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      pointRadius: 5,
      pointBackgroundColor: (context) => {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return getColor(value, minValue, maxValue, avgValue);
      },
      pointShadowColor: (context) => {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return getColor(value, minValue, maxValue, avgValue);
      },
      pointShadowBlur: 10,
      cubicInterpolationMode: "monotone",
    },
  ],
};


const chartOptions = {
scales: {
y: {
suggestedMin: minValue - 5,
suggestedMax: maxValue + 5,
title: {
    display: true,
    text: `${sensorName} (${unit})`,
},
},
},
plugins: {
tooltip: {
callbacks: {
    label: function (context) {
    const value = context.raw;
    const date = new Date(readings[context.dataIndex].createdDate);
    const dateString = date.toLocaleDateString("en-GB");
    // const timeString = date.toLocaleTimeString();
    return `${sensorName}: ${value} ${unit} (${dateString})`;
    },
},
},
},
};

// Define styles as variables
const tableHeadCellStyle = {
fontWeight: "bold",
color: "#ffcc00",
fontSize: "20px",
borderRight: "2px solid #454545",
width: "33.33%", // Equal width for all columns
};

const tableBodyCellStyle = {
fontFamily: "Lucida Console",
color: "#F8F9F9",
fontSize: "17px",
borderRight: "2px solid #454545",
width: "33.33%", // Equal width for all columns
};

const borderBottomStyle = {
borderBottom: "2px solid #454545",
};

const timeHeaderCellStyle = {
fontWeight: "bold",
color: "#ffcc00",
fontSize: "20px",
width: "33.33%", // Equal width for all columns
};

return (
  <div style={{ padding: "20px", backgroundColor: "#15131e" }}>
    <h1
      style={{
        textAlign: "center",
        color: "#f0c302",
        fontSize: "5vh",
        marginBottom: "3vh",
      }}
    >
      {sensorName}
    </h1>
    <p
      style={{
        color: "#e8e7e9",
        margin: "1vw",
        fontStyle: "italic",
        fontSize: "18px",
      }}
    >
      {description}
    </p>

    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: "20px",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          flex: isSmallScreen ? "1" : "3",
          backgroundColor: "rgba(34,34,46,0.6)",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          width: isSmallScreen ? "100%" : "70%",
        }}
      >
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
      <div
        style={{
          flex: isSmallScreen ? "1" : "1",
          backgroundColor: "rgba(34,34,46,0.6)",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          width: isSmallScreen ? "100%" : "27%",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "column",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "#e8e7e9", fontSize: "3vh" }}>
          Min Value:{" "}
          <span
            style={{
              color: getColor(minValue, minValue, maxValue, avgValue),
            }}
          >
            {minValue}
          </span>{" "}
          {unit}
        </p>
        <p style={{ color: "#e8e7e9", fontSize: "3vh" }}>
          Avg Value:{" "}
          <span
            style={{
              color: getColor(avgValue, minValue, maxValue, avgValue),
            }}
          >
            {avgValue}
          </span>{" "}
          {unit}
        </p>
        <p style={{ color: "#e8e7e9", fontSize: "3vh" }}>
          Max Value:{" "}
          <span
            style={{
              color: getColor(maxValue, minValue, maxValue, avgValue),
            }}
          >
            {maxValue}
          </span>{" "}
          {unit}
        </p>

        <p style={{ color: "#e8e7e9", fontSize: "3vh" }}>
          Current Reading:{" "}
          <span
            style={{
              color: getColor(latestReading, minValue, maxValue, avgValue),
            }}
          >
            {latestReading}
          </span>{" "}
          {unit}
        </p>
      </div>
    </div>

    <div>
      <p style={{ color: "#ffcc00", marginBottom: "2vh", fontSize: "1.5rem",fontWeight:"bold" }}>
        Readings history
      </p>

      <label style={{ color: "#e8e7e9" }}>
        Select Date:
        <input
          type="date"
          name="selectedDate"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <div
        style={{
          marginTop: "20px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <TableContainer
          sx={{
            borderRadius: 2,
            bgcolor: "rgba(34,34,46,0.6)",
            p: 2,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={borderBottomStyle}>
                <TableCell align="center" sx={tableHeadCellStyle}>
                  Value ({unit})
                </TableCell>
                <TableCell align="center" sx={tableHeadCellStyle}>
                  Date
                </TableCell>
                <TableCell align="center" sx={timeHeaderCellStyle}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDateReadings.length > 0 ? (
                selectedDateReadings.map((reading, index) => (
                  <TableRow key={index} sx={borderBottomStyle}>
                    <TableCell
                      align="center"
                      sx={{
                        ...tableBodyCellStyle,
                        color: getColor(
                          reading.value,
                          minValue,
                          maxValue,
                          avgValue
                        ),
                        fontSize: "17px",
                        borderRight: "2px solid #454545",
                      }}
                    >
                      {reading.value}
                    </TableCell>
                    <TableCell align="center" sx={tableBodyCellStyle}>
                      {new Date(reading.createdDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </TableCell>
                    <TableCell align="center" sx={tableBodyCellStyle}>
                      {new Date(reading.createdDate).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ p: 2, fontSize: "2.5vh" }}
                  >
                    No readings available for selected date.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  </div>
);
};

export default SensorsStyle;
