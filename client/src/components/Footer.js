import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(6),
  }
}))


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/jshafto/simple-decks">
        simple decks
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer} >
      {/* <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography> */}
      <Copyright />
    </footer>
  )
}

{/* <footer className={classes.footer}>
<Typography variant="h6" align="center" gutterBottom>
  Footer
</Typography>
<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
  Something here to give the footer a purpose!
</Typography>
<Copyright />
</footer> */}
export default Footer
