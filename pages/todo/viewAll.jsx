import { Box, List, ListItem } from "@mui/material";
import styles from "../../styles/Home.module.css";
import {useRouter} from "next/router"
export default function ViewAll(props){
  const router = useRouter()
 return (
  <main className={styles.main}>
    <Box style={
      {
        backgroundColor: "white",
        width: "70%",
        minWidth: 300,
        borderRadius: 4,
        minHeight: 400,
        height: "70vh"
    }
      }>
      <List>
        {props.todos.map(todo => <ListItem key={todo.id} onClick={() => router.push(`/todo/${todo.id}`)}>{todo.title}</ListItem>)}
      </List>
    </Box>
  </main>
 )
}

export async function getStaticProps(){
try {
  const res = await fetch("http://localhost:3000/api/todo", {
    method: "GET", 
    headers: { "Content-Type": "application/json"}
  });
  const {data} = await res.json();
  return {
    props: {
      todos: data
    }
  }
} catch (error) {
  console.error(error);
}
}
