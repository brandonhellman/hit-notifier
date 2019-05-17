import React, { useState } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getPostedAtOn } from '../functions';

function Previous({ hits }) {
  const [expanded, setExpanded] = useState(null);

  function handleChange(id) {
    setExpanded(expanded !== id ? id : null);
  }

  return hits.length ? (
    <>
      {hits.map((hit) => (
        <ExpansionPanel key={hit.id} expanded={expanded === hit.id} onChange={() => handleChange(hit.id)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>{getPostedAtOn(hit)}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="div">{renderHTML(hit.html)}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  ) : null;
}

function mapStateToProps(state) {
  return {
    hits: state.hits.filter((hit) => !hit.filter),
  };
}

export default connect(
  mapStateToProps,
  null,
)(Previous);
