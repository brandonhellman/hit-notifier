import React from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

function Latest({ hit }) {
  return hit ? <div>{renderHTML(hit.html)}</div> : <div>No latest HITs found =(</div>;
}

function mapStateToProps(state) {
  return {
    hit: state.hits[0],
  };
}

export default connect(mapStateToProps)(Latest);
