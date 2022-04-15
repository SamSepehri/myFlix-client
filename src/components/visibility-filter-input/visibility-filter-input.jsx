import React from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
    return <FormControl
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search for a movie'
    />;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);