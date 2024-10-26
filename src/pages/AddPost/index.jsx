import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios, { baseURL } from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data?.url);
      console.log(data.url);
    } catch (error) {
      console.error(error);
      alert("Не удалось загрузить изображение");
    }
  };

  const onClickRemoveImage = async () => {
    try {
      await axios.delete("/upload" + imageUrl.slice(8));

      setImageUrl("");
    } catch (error) {
      console.warn(error);
      alert("Не удалось удалить изображение");
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
      if (isEditing) {
        await axios.patch("/posts/" + id, fields);
        navigate(`/posts/${id}`);
      } else {
        const { data } = await axios.post("/posts", fields);

        navigate(`/posts/${data._id}`);
      }
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании статьи");
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  React.useEffect(() => {
    if (isEditing) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setTags(res.data.tags.join(","));
          setTitle(res.data.title);
          setImageUrl(res.data.imageUrl);
          setText(res.data.text);
        })
        .then(console.log(title, imageUrl, text))
        .catch((error) => {
          console.warn(error);
          alert("ошибка при загрузке поста");
        });
    }
  }, []);
  if (window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={baseURL + imageUrl}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
