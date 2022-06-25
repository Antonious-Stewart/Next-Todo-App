import { Box, Button, Checkbox, Dialog, FormControlLabel, TextField, Typography, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useState } from "react";
import {useRouter} from "next/router"
import styles from "../../styles/Home.module.css";

export default function TodoDetail(props){
  const settings = {
    hour: "numeric", 
    minute: "numeric", 
    day: "numeric", 
    month: "numeric", 
    year: "numeric", 
    hour12: true
  };
  const [title, setTitle] = useState(props.todo.title);
  const [content, setContent] = useState(props.todo.content);
  const [updatedAt, setUpdatedAt] = useState(props.todo.updatedAt);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [isChecked, setIsChecked] = useState(props.todo.isCompleted);
  const editButtonText = isBeingUpdated ? "Confirm" : "Edit";
  const router = useRouter();

  const todoOnChangeHandler = (evt) => {
    if(evt.target.name === "title"){
      setTitle(evt.target.value)
    } else if(evt.target.name === "content") {
      setContent(evt.target.value)
    } else {
      setIsChecked(!isChecked)
    }
  }

  const updateClickHandler = async (evt) => {
    try{
       if(!isBeingUpdated){
      setIsBeingUpdated(true);
    } else {
      const res = await fetch(`http://localhost:3000/api/todo/${props.todo.id}`, {
        method: "PUT",
        body: JSON.stringify({title, content, isCompleted: isChecked}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const {data} = await res.json();
      setUpdatedAt(data.updatedAt)
      setIsBeingUpdated(false);
    }
    } catch(error){
      console.error(error);
    }
   
  }

  const deleteTodoClickHandler = async (evt) => {
    try {
      if(isBeingDeleted){
          await fetch(`http://localhost:3000/api/todo/${props.todo.id}`, {
          method: "DELETE", 
          headers: {
          "Content-Type": "application/json"
        }});
        setIsBeingDeleted(false);
        router.replace("/")
      } 
    } catch (error) {
      console.error(error);
    }
  }


  const extraButtons = [
    {
      onClick: (evt) => { setIsBeingUpdated(false); setIsBeingDeleted(false)},
      text: "Cancel",
      variant: "contained",
      color: "warning"
  }
];

  const showExtraButtons = isBeingUpdated && extraButtons.map((button, index) => 
  <Button key={index} onClick={button.onClick} variant={button.variant} color={button.color}>
    <Typography>{button.text}</Typography>
  </Button>
  ) ;
  const setValues = <Box sx={{mb: 3}}>
  <Typography>Id: {props.todo.id}</Typography>
  <Typography>Title: {title}</Typography>
  <Typography>Content: {content}</Typography>
  <Typography>CreatedAt: {new Date(props.todo.createdAt).toLocaleDateString("en-US",settings).replace(",", "")}</Typography>
  <Typography>UpdatedAt: {new Date(updatedAt).toLocaleDateString("en-US",settings).replace(",", "")}</Typography>
</Box>;

  const editableValules =  
  <Box sx={{ display: "flex", flexDirection: "column", mb: 3}}>
    <TextField name="title" id="title" value={title} onChange={todoOnChangeHandler} sx={{mb: 1}}>Title: {props.todo.title}</TextField>
    <TextField multiline name="content" id="content" value={content} onChange={todoOnChangeHandler}>Content: {props.todo.content}</TextField>
    <FormControlLabel control={<Checkbox checked={isChecked} onChange={todoOnChangeHandler}/>} label="Completed" />
  </Box>

const bodyContent = !isBeingUpdated ? setValues : editableValules; 
  return (
    <main className={styles.main}>
      <Box style={
        {
          backgroundColor: "white",
          width: "70%",
          minWidth: 300,
          padding: "10px 20px",
          borderRadius: 4
        }
      }>
        {bodyContent}
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Box>
            <Button variant="contained" color="error" sx={{mr: 1}} onClick={() => setIsBeingDeleted(true)}>Delete</Button>
            <Button onClick={updateClickHandler} variant={!isBeingUpdated ?  "outlined" : "contained"} color="secondary">{editButtonText}</Button>
          </Box>
          <Box>
            {showExtraButtons}
          </Box>
        </Box>
      </Box>
      <Dialog open={isBeingDeleted} onClose={() => setIsBeingDeleted(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo? You wont be able to get it back once you delete it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTodoClickHandler} variant="contained" color="error">Confirm</Button>
          <Button onClick={() => setIsBeingDeleted(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </main>
  )
}

export async function getStaticProps(context){
  try {
    const id = context.params.id; 
    const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "GET", 
      headers: { "Content-Type": "application/json"}
    });
    const {data} = await res.json();

    return {
      props: {
        todo: data
      }
    }
  } catch (error) {
    console.error(error);
  }
}


export async function getStaticPaths(){
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "GET", 
      headers: { "Content-Type": "application/json"}
    });
    const {data} = await res.json();

    return {
      paths: data.map(todo => ({params: {id: todo.id.toString()}})),
      fallback: false
    }
  } catch (error) {
    console.error(error);
  }
}