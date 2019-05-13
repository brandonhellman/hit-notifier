import React from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { getFoundAtOn } from '../functions';

const styles = {
  flex: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  paper: {
    padding: `10px 5px`,
    lineHeight: 1.5,
  },
};

function Latest({ classes, hit }) {
  return hit ? (
    <>
      <div className={classes.flex}>
        <Typography gutterBottom>
          <Link href={hit.url}>{getFoundAtOn(hit)}</Link>
        </Typography>
      </div>
      <Paper className={classes.paper}>
        <Typography component="div">{renderHTML(hit.html)}</Typography>
      </Paper>
    </>
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
