import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "2px",
  },
  title: {
    flexGrow: 1,
    alignItems:"flex-start",
    textAlign:"left"
  },
});

const Navbar = ()=>{
  const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor:"#97D8C4"}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Tabata Bros
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
}


export default Navbar;