"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid, List, grid2Classes, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  avatar: string;
}

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);
  function handleRemove(id: number) {
    if (users.length > 0) {
      setUsers(users.filter((u: User) => u.id !== id));
    }
  }
  React.useEffect(() => {
    const selectedUsers = window.sessionStorage.getItem("saved_users");
    setUsers(selectedUsers ? JSON.parse(selectedUsers) : []);
  }, []);

  return (
    <Container>
      <Grid container spacing={1}>
        {users.map((u: User) => (
          <Grid xs={12} md={4} lg={3} key={u.id}>
            <Card sx={{ maxWidth: 345, margin: 1 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={u.avatar}
                title={u.name + "'s profile picture"}
              />
              <CardContent>
                <Typography variant="h5">
                  {u.name}{" "}
                  <Typography
                    sx={{ color: "cyan", fontFamily: "monospace" }}
                    component="code"
                  >
                    {" "}
                    [{u.id}]
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Chip
                    label={u.gender}
                    color="info"
                    sx={{ height: 20, marginRight: 1 }}
                  />
                  <Chip label={u.email} color="success" sx={{ height: 20 }} />
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, animi?
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  Like
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleRemove(u.id);
                  }}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
