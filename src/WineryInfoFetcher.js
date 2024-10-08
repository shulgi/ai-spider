import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Alert,
} from "@mui/material";

const WineryInfoFetcher = () => {
  const [wineries, setWineries] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWineryInfo = async (wineryName) => {
    try {
      console.log("Fetching info for:", wineryName);
      const response = await fetch(
        `/api/getWineryInfo?wineryName=${encodeURIComponent(wineryName)}`,
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching winery info:", error);
      setError(`Failed to fetch info for ${wineryName}: ${error.message}`);
      return null;
    }
  };

  const handleFetchWineries = async () => {
    setLoading(true);
    setError(null);
    const wineryNames = input.split("\n").filter((name) => name.trim() !== "");
    const wineryPromises = wineryNames.map(fetchWineryInfo);
    const wineryResults = await Promise.all(wineryPromises);
    setWineries(wineryResults.filter((winery) => winery !== null));
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Winery Information Fetcher
      </Typography>
      <TextField
        label="Enter winery names (one per line)"
        multiline
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchWineries}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Winery Info"}
      </Button>

      {error && (
        <Alert severity="error" style={{ marginTop: "1rem" }}>
          {error}
        </Alert>
      )}

      {wineries.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wineries.map((winery, index) => (
                <TableRow key={index}>
                  <TableCell>{winery.name}</TableCell>
                  <TableCell>{winery.formatted_address}</TableCell>
                  <TableCell>{winery.formatted_phone_number}</TableCell>
                  <TableCell>{winery.rating}</TableCell>
                  <TableCell>
                    {winery.website && (
                      <a
                        href={winery.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {winery.website}
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default WineryInfoFetcher;
