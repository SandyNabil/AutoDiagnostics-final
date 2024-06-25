    import React, { useState, useEffect } from 'react';
    import SensorsStyle from './SensorsStyle';

    const ThrottlePosition = () => {
    const [data, setData] = useState(null);
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateReadings, setSelectedDateReadings] = useState([]);

    const apiUrl = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/4/sensors/101';
    const apiUrl2 = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/4/sensors/101/readings';

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

    return (
        <SensorsStyle
            data={data}
            readings={readings}
            fetchReadings={fetchReadings}
            selectedDateReadings={selectedDateReadings}
            description="Throttle Position Sensor (TPS): Think of this sensor as the car’s gas pedal monitor. It watches how far you’re pressing the pedal and tells the car’s computer, so it can mix just the right amount of air with fuel for the engine to run well.


    "
        />
    );
    };

    export default ThrottlePosition;
