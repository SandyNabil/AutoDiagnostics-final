    import React, { useState, useEffect } from 'react';
    import SensorsStyle from './SensorsStyle';

    const IntakeManifoldPressure = () => {
    const [data, setData] = useState(null);
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateReadings, setSelectedDateReadings] = useState([]);

    const apiUrl = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/2/sensors/103';
    const apiUrl2 = 'https://autodiagsystemtest.runasp.net/api/v1/car-systems/2/sensors/103/readings';

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
            description="Air Intake Temp Sensor: This sensor checks how hot or cold the air is that’s being sucked into the engine. The car’s computer uses this info to mix the right amount of air with fuel for the engine to work its best."
    
        />
    );
    };

    export default IntakeManifoldPressure;
