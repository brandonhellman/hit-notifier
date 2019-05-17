import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { dispatchPanda } from '../functions';

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

function PandaButtons({ classes, hit, hitCatcher, pandaCrazy }) {
  return (
    <>
      {hitCatcher && (
        <>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => dispatchPanda(hit, `hitCatcher`, true)}
            size="small"
            variant="contained"
          >
            HC Once
          </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => dispatchPanda(hit, `hitCatcher`)}
            size="small"
            variant="contained"
          >
            HC Many
          </Button>
        </>
      )}

      {pandaCrazy && (
        <>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => dispatchPanda(hit, `pandaCrazy`, true)}
            size="small"
            variant="contained"
          >
            PC Once
          </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => dispatchPanda(hit, `pandaCrazy`)}
            size="small"
            variant="contained"
          >
            PC Many
          </Button>
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    hitCatcher: state.settings.hitCatcher,
    pandaCrazy: state.settings.pandaCrazy,
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(PandaButtons),
);
