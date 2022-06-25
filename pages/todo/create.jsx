import { Box, Button, TextField, Typography } from "@mui/material";
import {useRouter} from "next/router";
import { useState } from "react";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const inputOnChangeHandler = (evt) => {
    if (evt.target.name === "title") {
      setTitle(evt.target.value)
    } else {
      setContent(evt.target.value)
    }
  }

  const createTodoSubmitHandler = async (evt) => {
    try {
      evt.preventDefault();
      await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        body: JSON.stringify({title, content}),
        headers: {
        "Content-Type": "application/json"
      }
    });
    setContent("");
    setTitle("");
    router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main style={
      {
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }
    }>
      <Box style={{
        backgroundColor: "white",
        height: 200,
        minWidth: 300,
        width: "25%",
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box style={{ width: "80%", minWidth: 250}}>
          <form onSubmit={createTodoSubmitHandler} style={{display: "flex", flexDirection: "column"}}>
            <TextField onChange={inputOnChangeHandler} name="title" id="name" placeholder="Enter title" type="text" value={title} />
            <TextField onChange={inputOnChangeHandler} name="content" id="content" placeholder="Enter todo information" multiline value={content} />
            <Button type="submit" variant="outlined">
              <Typography>
                Create Todo
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </main>
  )
}