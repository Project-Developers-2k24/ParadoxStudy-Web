// import { Box, Container, Grid, Typography } from "@mui/material";

// export const Footer = () => {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "auto",
//         backgroundColor: "secondary.main",
//         paddingTop: "1rem",
//         paddingBottom: "1rem",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container direction="column" alignItems="center">
//           <Grid item xs={12}>
//             <Typography color="black" variant="h5">
//               React Starter App
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography color="textSecondary" variant="subtitle1">
//               {`${new Date().getFullYear()} | React | Material UI | React Router`}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;






import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff', // Set background color to white
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Paradox Study, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Jaipur, Rajasthan, India
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: paradoxstudy@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://paradoxstudy.me/">
              Paradox Study
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
