
import { Card, Grid } from "@mui/material";
// import { useState } from 'react'
import styles from '../styles/Home.module.css';

export default function Home() {
  const selections = [
    {
      title: "Completed Tasks",
      count: 0,
      path: "/todo/completed"
    },
    {
      title: "To-be Completed Tasks",
      count: 0,
      path: "todo/active"
    },
    {
      title: "Create Todo",
      path: "/todo/create"
    },
    {
      title: "View All",
      count: 0,
      path:"/todo/viewAll"
    }
  ];

  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Grid container spacing={2}>
          {selections.map((selection, index) => <Grid item key={index} md={6}> <Card>{selection.title}</Card> </Grid> )}
        </Grid>
      </main>
    </div>
  )
}
