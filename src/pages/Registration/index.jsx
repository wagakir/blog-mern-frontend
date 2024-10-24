import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "", password: "", fullName: "" },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      console.log(data);
      return alert(data);
    }
    // if ("token" in data.payload) {
    //   window.localStorage.setItem("token", data.payload.token);
    // }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", {
            required: "укажите имя",
            maxLength: 100,
            minLength: 3,
          })}
        />
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "укажите почту",
            pattern: /^\S+@\S+$/i,
          })}
        />
        <TextField
          // type="password"
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", {
            required: "укажите пароль",
            maxLength: 100,
            minLength: 5,
          })}
        />
        <TextField
          // type="password"
          className={styles.field}
          label="Повторите пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("confirm_password", {
            required: "укажите пароль",
            maxLength: 100,
            minLength: 5,
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
