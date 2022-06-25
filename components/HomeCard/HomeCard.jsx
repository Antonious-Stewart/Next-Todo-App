import { Box, Card, Typography } from "@mui/material"

export default function HomeCard(props){
  const countComponent = <Typography fontSize={36} variant="h2" color="gray">{props.count}</Typography>
  return (
    <Card onClick={props.cardClickHandler} className={props.classNames.join(" ")}>
      <Box paddingX={5} paddingY={8}>
        <Typography variant="h2" color="gray" fontSize={36} letterSpacing={1}>
          {props.title}
        </Typography>
        {props.count >= 0 && countComponent }
      </Box>
    </Card>
  )
}