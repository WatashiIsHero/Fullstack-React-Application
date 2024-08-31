import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";

export default function Appbar() {
  const paperStyle = {
    width: "500px",
    padding: "10px 50px 40px 50px",
  };

  const containerStyle = {
    margin: "1% 20% 1% 29%",
  };

  const submitBtnStyle = {
    margin: "35px 0 0 410px",
  };

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/student/getAllStudents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.log("エラーが起きました"));
  }, []);

  const submitStudent = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then(console.log("登録成功"))
      .catch(console.log("エラーが起きました"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spring Boot React Full Stack Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={containerStyle}>
        <Paper elevation={3} style={paperStyle}>
          <h2 style={{ color: "blue", textDecoration: "underline" }}>
            Add Student
          </h2>
          <TextField
            id="name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="address"
            label="Student Address"
            variant="outlined"
            style={{ marginTop: "20px" }}
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            style={submitBtnStyle}
            variant="contained"
            onClick={submitStudent}
          >
            submit
          </Button>
        </Paper>
      </Container>
      <Container maxWidth="sm" style={containerStyle}>
        <Paper elevation={6} style={paperStyle}>
          <h2 style={{ fontWeight: "bold", textDecoration: "underline" }}>
            All Students
          </h2>
          {students.map((student) => {
            return (
              <Paper
                key={student.id}
                style={{ textAlign: "left", margin: "10px " }}
              >
                Id：{student.id}
                <br />
                名前：{student.name}
                <br />
                住所：{student.address}
              </Paper>
            );
          })}
        </Paper>
      </Container>
    </Box>
  );
}
