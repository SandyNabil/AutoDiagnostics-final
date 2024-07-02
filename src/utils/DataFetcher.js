// import React, { useState, useEffect } from "react";

// const DataFetcher = ({ apiUrl, apiUrl2, render, interval = 6500 }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   let token = localStorage.getItem("authToken");

//   const fetchData = async () => {
//     try {
//       const authHeader = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const detailsResponse = await fetch(apiUrl, authHeader);
//       if (!detailsResponse.ok) {
//         throw new Error("Error fetching details");
//       }

//       const detailsData = await detailsResponse.json();
//       console.log("Fetched details data:", detailsData);

//       const readingResponse = apiUrl2
//         ? await fetch(apiUrl2, authHeader)
//         : { json: () => [] };
//       if (apiUrl2 && !readingResponse.ok) {
//         throw new Error("Error fetching readings");
//       }

//       const readingData = apiUrl2 ? await readingResponse.json() : [];
//       console.log("Fetched readings data:", readingData);

//       const readings = Array.isArray(readingData) ? readingData : [readingData];

//       setData({ details: detailsData, readings: readings });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Initial fetch

//     const intervalId = setInterval(fetchData, interval); // Set up interval for periodic fetching

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, [apiUrl, apiUrl2, interval]); // Depend on apiUrl, apiUrl2, and interval

//   if (loading) {
//     return <p>Loading data...</p>;
//   }

//   if (error) {
//     return <p>Error fetching data: {error}</p>;
//   }

//   return render(data); // Render the fetched data
// };

// export default DataFetcher;



//without interval
import React, { useState, useEffect } from "react";

const DataFetcher = ({ apiUrl, apiUrl2, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let token = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
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
      console.log("Fetched details data:", detailsData);

      const readingResponse = apiUrl2
        ? await fetch(apiUrl2, authHeader)
        : { json: () => [] };
      if (apiUrl2 && !readingResponse.ok) {
        throw new Error("Error fetching readings");
      }

      const readingData = apiUrl2 ? await readingResponse.json() : [];
      console.log("Fetched readings data:", readingData);

      const readings = Array.isArray(readingData) ? readingData : [readingData];

      setData({ details: detailsData, readings: readings });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, [apiUrl, apiUrl2]); // Depend on apiUrl and apiUrl2

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return render(data); // Render the fetched data
};

export default DataFetcher;
