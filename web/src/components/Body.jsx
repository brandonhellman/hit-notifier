import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

import Latest from '../tabs/Latest';
import Previous from '../tabs/Previous';
import Settings from '../tabs/Settings';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
};

function Body({ classes }) {
  const [tab, setTab] = useState(0);

  function handleTab(event, value) {
    setTab(value);
  }

  return (
    <Paper className={classes.root}>
      <Tabs value={tab} onChange={handleTab} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Latest" />
        <Tab label="Previous" />
        <Tab label="Options" />
      </Tabs>

      {tab === 0 && <Latest />}
      {tab === 1 && <Previous />}
      {tab === 2 && <Settings />}
    </Paper>
  );
}

export default withStyles(styles)(Body);
