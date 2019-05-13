import React from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paper: {
    padding: `10px 5px`,
    lineHeight: 1.5,
  },
};

function Latest({ classes, hit }) {
  return hit ? (
    <Paper className={classes.paper}>
      <Typography component="div">{renderHTML(hit.html)}</Typography>
    </Paper>
  ) : (
    <div>No latest HITs found =(</div>
  );
}

function mapStateToProps(state) {
  return {
    hit: state.hits[0],
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(Latest),
);
