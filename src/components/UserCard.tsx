import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  CardActions,
} from "@mui/material";

import User from "@/types/User";

interface Props {
  user: User;
  handleRemove: Function;
}

export default function UserCard({ user, handleRemove }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, backgroundSize: "auto 100%" }}
        image={user.avatar}
        title={user.name + "'s profile picture"}
      />
      <CardContent>
        <Typography component={"div"} variant="h5">
          {user.name}{" "}
          <span
            style={{
              color: "cyan",
              fontFamily: "monospace",
              fontSize: "0.7em",
            }}
          >
            [{user.id}]
          </span>
        </Typography>
        <Typography component={"div"} variant="body2" color="text.secondary">
          <Chip
            label={user.gender}
            color="info"
            sx={{ height: 20, marginRight: 1 }}
          />
          <Chip label={user.email} color="success" sx={{ height: 20 }} />
        </Typography>
        <Typography component={"div"} variant="body1" sx={{ marginTop: 1 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          animi?
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
            handleRemove(user.id);
          }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
