import React, {Component, PropTypes} from 'react';
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap/lib/'


export default class SearchBar extends Component {

  static propTypes = {
    searchList: PropTypes.func,
  }

  render() {
    return (
      <Form inline style={{margin: '8px 3px 1px 1px'}}>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Search: </ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Searching..." onChange={this.props.searchList}/>
        </FormGroup>
      </Form>
    )
  };

}
