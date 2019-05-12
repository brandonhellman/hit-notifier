import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  right: {
    marginLeft: `auto`,
  },
};

function Header({ classes, connected }) {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          HIT Notifier
        </Typography>

        <Typography className={classes.right} color="inherit">
          Turkers Connected: {connected}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function mapStateToProps(state) {
  return {
    connected: state.connected,
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(Header),
);
