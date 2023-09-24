"use client";
import * as React from "react";
import { Grid, Container, Typography } from "@mui/material";

import UserCard from "../../components/UserCard";
import User from "@/types/User";

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);
  function handleRemove(id: number) {
    if (users.length > 0) {
      setUsers(users.filter((u: User) => u.id !== id));
    }
  }
  React.useEffect(() => {
    const savedUsers = window.sessionStorage.getItem("saved_users");
    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
  }, []);

  return (
    <Container>
      {!users.length ? (
        <Typography component={"span"} variant={"h6"}>
          No users to display
        </Typography>
      ) : (
        <Grid container spacing={1.5}>
          {users.map((u: User) => (
            <Grid item xs={12} md={4} lg={3} key={u.id}>
              <UserCard user={u} handleRemove={handleRemove} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
