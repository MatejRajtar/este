import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  loadFromServer() {
    $.ajax({
      url: 'http://www.json-generator.com/api/json/get/cikrApwlgy?indent=2',
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  objToTable(obj) {
    if (obj[0]) {
      return (
        <table>
          {this.renderHeaderByKeys(Object.keys(obj[0]))}
          <tbody>
            <tr>{
              Object.keys(obj).map((key, i) => {
                return this.renderTd(Object.values(obj[i]), i);
              })
            }</tr>
          </tbody>
        </table>
      );
    }
  }

  renderHeaderByKeys(keys) {
    return (
      <thead>
      <tr>{
        keys.map((key, i) => {
          return (
            <th key={i}>
              {key}
            </th>
          );
        })
      }</tr>
      </thead>
    );
  }

  renderTd(keys, i) {
    return (
      <tr>{
        keys.map((key, i) => {
          return (
            <th key={i}>
              {key}
            </th>
          );
        })
      }</tr>
    );
  }

  render() {
    return (
      <div>
        {this.objToTable(this.state.data)}
      </div>
    );
  }

}

export default Table;
