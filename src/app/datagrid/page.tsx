"use client";
import * as React from "react";
import Link from "next/link";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Alert, Button, ButtonGroup, Snackbar } from "@mui/material";

import User from "@/types/User";

function fetchRandomUsers(numberOfUsers: number = 50): Promise<User[]> {
  const new_data = fetch(
    `https://random-data-api.com/api/v2/users?size=${numberOfUsers}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.map((obj: any) => {
        const user: User = {
          id: obj.id,
          name: `${obj.first_name} ${obj.last_name}`,
          email: obj.email,
          gender: obj.gender,
          avatar: obj.avatar,
        };
        return user;
      });
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return new_data;
}

export default function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const apiRef = useGridApiRef();

  const columns = [
    // { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Full Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "avatar", headerName: "Avatar", flex: 2 },
    { field: "email", headerName: "E-mail Address", flex: 1 },
  ];

  function handleSave() {
    if (typeof window === undefined) {
      return;
    }

    const selectedUsers = Array.from(apiRef.current.getSelectedRows().values());
    const savedUsers = JSON.parse(
      window.sessionStorage.getItem("saved_users") || "[]"
    );

    window.sessionStorage.setItem(
      "saved_users",
      JSON.stringify([...savedUsers, ...selectedUsers])
    );

    selectedUsers.length && setOpenSnackbar(true);
  }

  function handleClose() {
    setOpenSnackbar(false);
  }

  React.useEffect(() => {
    fetchRandomUsers(20)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ButtonGroup style={{ paddingBottom: 5 }} variant="outlined">
        <Button onClick={handleSave}>Save</Button>
        <Button href="/users" component={Link}>
          Go to Users
        </Button>
      </ButtonGroup>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          variant="outlined"
          severity="success"
          onClose={handleClose}
          action={
            <Button href="/users" component={Link} color="inherit">
              Go to Users
            </Button>
          }
        >
          Selected users were added
        </Alert>
      </Snackbar>

      <DataGrid
        apiRef={apiRef}
        columns={columns}
        rows={users}
        checkboxSelection={true}
        pageSizeOptions={[10, 15, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </div>
  );
}
