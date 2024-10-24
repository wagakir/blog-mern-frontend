import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe } from "./redux/slices/auth";
import React from "react";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchAuthMe());
    }
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>

        {/* <Home /> */}
        {/* <FullPost /> */}
        {/* <AddPost /> */}
        {/* <Login /> */}
        {/*<Registration />*/}
      </Container>
    </>
  );
}

export default App;
