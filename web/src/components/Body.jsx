import React, { useState } from 'react';

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
  flex: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  flexItem: {
    marginTop: 5,
    width: `100%`,
    maxWidth: 800,
  },
  tabsContainer: {
    padding: 5,
  },
};

function Body({ classes }) {
  const [tab, setTab] = useState(0);

  function handleTab(event, value) {
    setTab(value);
  }

  return (
    <div className={classes.root}>
      <base target="_blank" />

      <Tabs value={tab} onChange={handleTab} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Latest" />
        <Tab label="Previous" />
        <Tab label="Settings" />
      </Tabs>

      <div className={classes.flex}>
        <div className={classes.flexItem}>
          <div className={classes.tabsContainer}>
            {tab === 0 && <Latest />}
            {tab === 1 && <Previous />}
            {tab === 2 && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Body);
