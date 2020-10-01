import React from 'react';


import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'


const PracticeCard = () => {
  const [cardOpen, setCardOpen] = React.useState(false);

  const handleChange = () => {
    setCardOpen((prev) => !prev);
  };


  return (
    // <Paper variant="outline">
    <Grid container direction="column">
      <Typography variant="h3" component="h2">Deck Name</Typography>
      {/* <Typography variant="h4" component="h4">Front</Typography> */}
      <Typography variant="h5" component="h5" color="textSecondary">1/23</Typography>
      <Grid item>
        <Card onClick={handleChange}>
          <Grow in={cardOpen}>
            <CardContent>
              <Typography variant="h5">HELLO</Typography>
            </CardContent>

          </Grow>
          <Grow in={!cardOpen}>
            <CardContent>
              <Typography variant="h5">GOODBYE</Typography>
            </CardContent>

          </Grow>
        </Card>
        {/* <Card onClick={handleChange}> */}
        {/* </Card> */}
      </Grid>
    </Grid>
    // </Paper>
  )
}

export default PracticeCard;
