
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import HomeCard from "../components/HomeCard/HomeCard";
// import { useState } from 'react'
import styles from '../styles/Home.module.css';

export default function Home(props) {
  
  const selections = [
    {
      title: "Completed Tasks",
      count: props.todos.filter( todo => todo.isCompleted === true ).length,
      path: "/todo/completed",
      classNames: [styles.completed, styles.card]
    },
    {
      title: "To-be Completed Tasks",
      count: props.todos.filter( todo => todo.isCompleted === false ).length,
      path: "todo/active",
      classNames: [styles.incomplete,styles.card]
    },
    {
      title: "Create Todo",
      path: "/todo/create",
      classNames: [styles.create,styles.card]
    },
    {
      title: "View All",
      count: props.todos.length,
      path:"/todo/viewAll",
      classNames: [styles.viewAll, styles.card]
    }
  ];

  const router = useRouter()
  // console.log(router.asPath.match(/#([a-z0-9]+)/gi ))
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Grid container spacing={1}>
          {selections.map((selection, index) =>( 
            <Grid item key={index} md={6}>
              <Box className={`${styles.wrapper} ${index % 2 === 0 ? styles.flexEnd : ""}`}>
                <HomeCard 
                title={selection.title} 
                count={selection.count} 
                classNames={selection.classNames} 
                cardClickHandler={() => router.push(selection.path)}/> 
              </Box> 
            </Grid> 
          )
        )}
        </Grid>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  const res = await fetch("http://localhost:3000/api/todo", {
    method: "GET", 
    headers: {
    "Content-Type": "application/json"
  }});
  const {data} = await res.json();

  
  return {
    props:{
      todos: data
    },
    revalidate: 40
  }
}