import {
  Container,
  Grid,
  Typography,
  Box,
  Stack,
  Link,
  styled,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "Components/Logo/Logo";

const TitleFooter = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: "400",
});

const TextFooter = styled(Typography)({
  color: "#9e9e9e",
  fontSize: "0.85rem",
  fontWeight: "300",
  transition: "all 0.4s",
});
const LinkFooter = styled(Link)(({ theme }) => ({
  color: "#9e9e9e ",
  fontSize: "0.85rem",
  fontWeight: "300",
  transition: "all 0.4s",
  "&:hover": {
    color: theme.palette.secondary.light,
  },
}));
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        color: "secondary.contrastText",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} lg={3}>
            <TitleFooter mb={2}>E-LEARNING</TitleFooter>
            <Typography>
              <LinkFooter href="#">Giới thiệu</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">FAQ</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">Liên hệ</LinkFooter>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} lg={4}>
            <TitleFooter mb={2}>ĐIỀU KHOẢN SỬ DỤNG</TitleFooter>
            <Typography>
              <LinkFooter href="#">Điều Khoản Chung</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">Điều Khoản Giao Dịch</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">Điều Khoản Thanh Toán</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">Điều Khoản Bảo Mật</LinkFooter>
            </Typography>
            <Typography>
              <LinkFooter href="#">Câu Hỏi Thường Gặp</LinkFooter>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} lg={5}>
            <Box>
              <TitleFooter mb={2}>LIÊN HỆ</TitleFooter>
              <Stack direction="row" alignItems="center">
                <FacebookIcon color="info" />
                <LinkFooter href="#" ml={1}>
                  Quang
                </LinkFooter>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Stack
          mt={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Logo />
          </Box>
          <TextFooter>© 2022 E-learning, Inc</TextFooter>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
