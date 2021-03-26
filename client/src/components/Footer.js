import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  }
}))



const Links = () => (
    <Typography variant='body2' color='textSecondary' align='center'>
      <Link target='_blank' rel="noreferrer"color='inherit' href='https://github.com/jshafto/simple-decks'>
        Github
      </Link>{' | '}
      <Link target='_blank' rel="noreferrer" color='inherit' href='https://julietshafto.com'>
        Portfolio
      </Link>
    </Typography>
);



const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Links />
    </footer>
  )
}

export default Footer
