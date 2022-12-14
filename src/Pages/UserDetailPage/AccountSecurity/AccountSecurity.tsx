import React, { SyntheticEvent, useState } from "react";
import {
  Divider,
  Toolbar,
  Typography,
  Stack,
  Button,
  Paper,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PasswordInput from "Components/PasswordInput/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { UserDetail } from "Interfaces/userInterface";
import userAPI from "Services/UserAPI";
import CustomizedSnackbars from "Components/CustomizedSnackbars/CustomizedSnackbars";
import { dispatch } from "configStore";
import { getUserDetail } from "Slices/userDetailSlice";

type Props = {
  userDetail: UserDetail | null;
};
type SecurityForm = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const MyPaper = styled(Paper)({
  display: "flex",
  alignItems: "center",
  width: "100%",
});
const AccountSecurity = ({ userDetail }: Props) => {
  const [isEmailChangeSuccess, setIsEmailChangeSuccess] = useState(false);
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<SecurityForm>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const validateCurrentPassword = () => {
    if (getValues().currentPassword === userDetail?.matKhau) {
      return true;
    } else {
      setIsPasswordError(true);
      return false;
    }
  };
  const handleUpdateEmail = () => {
    if (!errors.email) {
      putUser(getValues().email, null);
      handleClose();
    }
  };
  const handleUpdatePassword = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      !(
        errors.currentPassword ||
        errors.newPassword ||
        errors.confirmPassword
      ) &&
      validateCurrentPassword()
    ) {
      putUser(null, getValues().newPassword);
    }
  };
  const putUser = async (email: string | null, password: string | null) => {
    try {
      if (userDetail) {
        await userAPI.putUser({
          taiKhoan: userDetail.taiKhoan,
          matKhau: password ? password : userDetail.matKhau,
          hoTen: userDetail.hoTen,
          soDT: userDetail.soDT,
          maLoaiNguoiDung: "HV",
          maNhom: userDetail.maNhom,
          email: email ? email : userDetail.email,
        });
        dispatch(getUserDetail());
        if (email) {
          setIsEmailChangeSuccess(true);
        } else if (password) {
          setIsPasswordChangeSuccess(true);
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {" "}
      <Toolbar
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          paddingY: 1,
        }}
      >
        <Typography variant="h5">T??i kho???n</Typography>
        <Typography variant="body1">
          Ch???nh s???a thi???t l???p t??i kho???n v?? thay ?????i m???t kh???u t???i ????y
        </Typography>
      </Toolbar>
      <Divider />
      <Stack
        sx={{
          m: "auto",
          paddingY: 2,
          overflowY: "auto",
          width: "80%",
        }}
        alignItems="center"
        component="form"
        onSubmit={(event: SyntheticEvent) => handleUpdatePassword(event)}
      >
        <Typography
          variant="subtitle1"
          sx={{ alignSelf: "flex-start", marginBottom: "5px" }}
        >
          Email:
        </Typography>
        <MyPaper variant="outlined">
          <Typography sx={{ flexGrow: "1", marginLeft: "5px" }}>
            ?????a ch??? email c???a b???n l?? <b>{userDetail?.email}</b>
          </Typography>
          <Button variant="text" onClick={handleClickOpen}>
            <EditIcon />
          </Button>
        </MyPaper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>C???p nh???t email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ????? thay ?????i email vui l??ng nh???p v??o ?? d?????i ????y.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              type="email"
              fullWidth
              variant="standard"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>????ng</Button>
            <Button onClick={handleUpdateEmail}>C???p nh???t</Button>
          </DialogActions>
        </Dialog>
        <Divider
          sx={{
            margin: "40px 0",
            width: "100%",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{ alignSelf: "flex-start", marginBottom: "5px" }}
        >
          Thay ?????i m???t kh???u:
        </Typography>

        <PasswordInput
          label="M???t kh???u hi???n t???i"
          helperText={errors.currentPassword?.message}
          error={!!errors.currentPassword}
          register={register("currentPassword")}
        />
        <PasswordInput
          label="M???t kh???u m???i"
          helperText={errors.newPassword?.message}
          error={!!errors.newPassword}
          register={register("newPassword")}
        />
        <PasswordInput
          label="Nh???p l???i m???t kh???u m???i"
          helperText={errors.confirmPassword?.message}
          error={!!errors.confirmPassword}
          register={register("confirmPassword")}
        />
        <CustomizedSnackbars
          message="C???p nh???t email th??nh c??ng"
          open={isEmailChangeSuccess}
          setOpen={setIsEmailChangeSuccess}
        />
        <CustomizedSnackbars
          message="C???p nh???t m???t kh???u th??nh c??ng"
          open={isPasswordChangeSuccess}
          setOpen={setIsPasswordChangeSuccess}
        />
        <CustomizedSnackbars
          message="M???t kh???u hi???n t???i kh??ng ch??nh x??c"
          open={isPasswordError}
          setOpen={setIsPasswordError}
          severity="error"
        />
        <Button type="submit" variant="contained">
          C???p nh???t
        </Button>
      </Stack>
    </>
  );
};

export default AccountSecurity;
export {};
