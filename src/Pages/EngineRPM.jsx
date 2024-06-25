import React, { useState, useEffect } from 'react';
// import GaugeChart from 'react-gauge-chart';
import RPMStyle from './RPMStyle';

const EngineRPM = () => {
    const [data, setData] = useState(null);
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateReadings, setSelectedDateReadings] = useState([]);

    const apiUrl = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/1/sensors/104';
    const apiUrl2 = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/1/sensors/104/readings';

    const fetchReadings = async (selectedDate) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const authHeader = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            let url = `${apiUrl2}?datecreated=${selectedDate}`;
            let allReadings = [];
            let hasNextPage = true;

            while (hasNextPage) {
                const response = await fetch(url, authHeader);
                const result = await response.json();
                const pagination = JSON.parse(response.headers.get('X-Pagination'));
                const selectedDateReadings = result.filter(
                    (reading) => new Date(reading.createdDate).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
                );
                allReadings = [...allReadings, ...selectedDateReadings];

                if (pagination.nextPageLink) {
                    url = pagination.nextPageLink;
                } else {
                    hasNextPage = false;
                }
            }

            setSelectedDateReadings(allReadings);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchInitialReadings = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const authHeader = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(apiUrl2, authHeader);
            const result = await response.json();

            // Sort the readings by date and take the latest 20 readings
            const sortedReadings = result.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            const latestReadings = sortedReadings.slice(0, 20).reverse();
            setReadings(latestReadings);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const authHeader = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const detailsResponse = await fetch(apiUrl, authHeader);
                if (!detailsResponse.ok) {
                    throw new Error("Error fetching details");
                }

                const detailsData = await detailsResponse.json();

                await fetchInitialReadings();

                setData({ details: detailsData });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error}</p>;
    }

    // Get the last reading value
    // const lastReading = readings.length > 0 ? readings[readings.length - 1].value : 0;
    const description = "Engine RPM Sensor: This sensor is like the car’s tachometer. It keeps track of how fast the engine is spinning. It helps the car’s computer make sure everything is running in sync.";

    return (
        <div style={{ padding: "20px", backgroundColor: "#15131e" }}>
            {/* <h1 style={{ textAlign: "center", color: "#f0c302", fontSize: "5vh", marginBottom: "3vh" }}>
                {data.details.sensorName}
            </h1>
            <p style={{ color: "#e8e7e9", margin: "1vw", fontStyle: "italic", fontSize: "18px" }}>
                {description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <GaugeChart id="gauge-chart"
                    nrOfLevels={30}
                    percent={lastReading / 3125} // Adjust the max value as needed
                    textColor="#ffffff"
                />
            </div> */}
            <RPMStyle
                data={data}
                readings={readings}
                fetchReadings={fetchReadings}
                selectedDateReadings={selectedDateReadings}
                description={description}
            />
        </div>
    );
};

export default EngineRPM;
