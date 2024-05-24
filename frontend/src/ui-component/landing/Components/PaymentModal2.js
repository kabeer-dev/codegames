import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardMedia, Divider, Grid } from "@mui/material";
import {
  PaymentModal2Img,
  PaymentModal2Btn,
  PaymentModal2Btn2,
  PaymentModal2Wrap,
  PaymentModal2style,
} from "../constants/style";

export default function PaymentModal2({ btntext, image, height, width }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>{btntext}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ background: "#101328" }}
      >
        <Box sx={PaymentModal2style}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              image={image}
              alt="not"
              sx={{ height: { height }, width: { width }, ...PaymentModal2Img }}
            />
          </Grid>
          <Grid
            sx={{
              ...PaymentModal2Wrap,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ pt: 1 }}>
              Payment completed!
            </Typography>
            <Typography sx={{ pt: 1, fontSize: { sm: "16px", xs: "14px" } }}>
              PUBG Mobile Code US Redeem Code
            </Typography>
            <Typography sx={{ pt: 1 }}>5,2 €</Typography>
            <Divider sx={{ width: "100%", borderColor: "#303542", py: 1 }} />
            <Typography sx={{ py: 2 }}>Activation code sent</Typography>
            <Grid>
              <Button
                sx={{
                  ...PaymentModal2Btn,
                }}
              >
                codegames@gmail.com
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{
                  ...PaymentModal2Btn2,
                }}
              >
                Detail order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
