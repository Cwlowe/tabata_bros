import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BallotIcon from '@material-ui/icons/Ballot';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
    textAlign:"left",
    fontWeight:"bold",
    fontSize:"25ox"
  },
});

const Navbar = ()=>{
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => {
    let list = [
      {
        name: 'Sessions',
        href: '/workouts',
        icon: <BallotIcon color="primary"/>
      },
      {
        name: 'Create Workout',
        href: '/createWorkout',
        icon: <AddBoxIcon color="primary"/>
      },
    ]
    return(
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {list.map((ob, index) => (
          <ListItem href={ob.href} component="a" key={index}>
            <ListItemIcon>{ob.icon}</ListItemIcon>
            <ListItemText primary={ob.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
    return (
        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor:"#97D8C4"}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)}/>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </IconButton>
              <Link href="/" color="inherit" className={classes.title} >
                Tabata Bros
              </Link>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
}


export default Navbar;