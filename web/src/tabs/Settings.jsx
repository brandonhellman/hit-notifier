import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { settingsToggleTheme } from '../redux/actions';

function Settings({ dark, handleDark }) {
  return (
    <div>
      <Card raised>
        <CardHeader title="General" />
        <CardContent>
          <FormControlLabel control={<Checkbox checked={dark} onChange={handleDark} />} label="Dark Mode" />
        </CardContent>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dark: state.settings.dark,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleDark(event) {
      dispatch(settingsToggleTheme(event.target.checked));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
