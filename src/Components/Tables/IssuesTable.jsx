import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";


export default function IssuesTable() {
  const [issues, setIssues] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("https://autodiagsystemtest.runasp.net/api/v1/faults?pagesize=3&pagenumber=2");
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let token = localStorage.getItem("authToken");

  const fetchIssues = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching issues");
      }
      const data = await response.json();
      const paginationHeader = JSON.parse(response.headers.get('X-Pagination'));
      setIssues(data);
      setPrevUrl(paginationHeader.previousPageLink);
      setNextUrl(paginationHeader.nextPageLink);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchIssues(currentUrl);
    }, 6500);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [currentUrl]);

  // useEffect(() => {
  //   fetchIssues(currentUrl);
  // }, [currentUrl]);

  const handlePrevious = () => {
    if (prevUrl) {
      setLoading(true);
      setCurrentUrl(prevUrl);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      setLoading(true);
      setCurrentUrl(nextUrl);
    }
  };

  const handleCurrent = () => {
    setLoading(true);
    setCurrentUrl("https://autodiagsystemtest.runasp.net/api/v1/faults?pagesize=3&pagenumber=2");
  };

  // Define styles as variables
  const tableHeadCellStyle = {
    fontWeight: 'bold',
    color: '#ffcc00',
    fontSize: "20px",
    borderRight: '2px solid #454545',
  };

  const tableBodyCellStyle = {
    fontFamily: 'Lucida Console',
    color: '#F8F9F9',
    fontSize: "17px",
    borderRight: '2px solid #454545',
  };

  const borderBottomStyle = {
    borderBottom: '2px solid #454545',
  };

  return (
    <TableContainer
      sx={{
        borderRadius: 2,
        bgcolor: "primary.bgColor",
        p: 2,
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={borderBottomStyle}>
            <TableCell align="center" sx={tableHeadCellStyle}>Problem Code</TableCell>
            <TableCell align="center" sx={tableHeadCellStyle}>Description</TableCell>
            <TableCell align="center" sx={tableHeadCellStyle}>Severity</TableCell>
            <TableCell align="center" sx={tableHeadCellStyle}>Created Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: "#ffcc00", fontSize: "20px" }}>Fixes Tutorial</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} sx={borderBottomStyle}>
              <TableCell align="center" sx={{ fontFamily: 'Arial', fontWeight:'bold', color: 'red', fontSize: "17px", borderRight: '2px solid #454545' }}>{issue.problemCode}</TableCell>
              <TableCell align="center" sx={tableBodyCellStyle}>{issue.problemDescription}</TableCell>
              <TableCell align="center" sx={tableBodyCellStyle}>{issue.severity}</TableCell>
              <TableCell align="center" sx={tableBodyCellStyle}>{new Date(issue.createdDate).toLocaleString()}</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Lucida Console', fontSize: "17px" }}>
                {issue.troubleCodeLinks && issue.troubleCodeLinks.map((linkObj, index) => (
                  <React.Fragment key={index}>
                  <a href={linkObj.link} target="_blank" style={{ color: '#0D3CCF', textDecoration: 'underline' }}>{linkObj.title}</a>
                    {index !== issue.troubleCodeLinks.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button sx={{bgcolor:"#ffcc00"}}
          variant="contained"
          disabled={loading || !prevUrl}
          onClick={handlePrevious}
          style={{ transform: 'rotate(180deg)' }} // Rotate to make it look like a left arrow
        >
          ➤
        </Button>
        <Button sx={{bgcolor:"#ffcc00"}}
          variant="contained"
          disabled={loading}
          onClick={handleCurrent}
        >
          Current
        </Button>
        <Button sx={{bgcolor:"#ffcc00"}}
          variant="contained"
          disabled={loading || !nextUrl}
          onClick={handleNext}
        >
          ➤
        </Button>
      </div>
    </TableContainer>
  );
}
