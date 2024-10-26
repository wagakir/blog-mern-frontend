import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [postStatus, setPostStatus] = React.useState("loading");
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get("/posts/" + id)
      .then((res) => {
        setData(res.data);
      })
      .then(() => setPostStatus("loaded"))
      .catch((err) => {
        console.warn(err);
        setPostStatus("error");
        alert("Ошибка получения статьи");
      });
  }, []);

  if (postStatus === "loading") {
    return <Post isLoading={true} isFullPost />;
  }
  if (postStatus === "error") {
    return <p>Ошибка при загрузке поста</p>;
  }
  return (
    <>
      <Post
        imageUrl={data.imageUrl}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        createdDate={data.createdDate}
        commentsCount={3}
        tags={data.tags}
        id={id}
        title={data.title}
        user={data.user}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
