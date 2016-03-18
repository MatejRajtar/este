import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import Immutable from 'immutable';

class Table extends React.Component {

  constructor(props, context) {
    super(props, context);
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
            <tr style={this.constructor.styles.tr}>{
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
            <th style={this.constructor.styles.th} key={i}>
              {key}
              <div></div>
              <input id={key} type="text" style={this.constructor.styles.input} />
            </th>

          );
        })
      }</tr>
      </thead>
    );
  }

  renderTd(keys, i) {
    return (
      <tr >{
        keys.map((key, i) => {
          return (
            <td style={this.constructor.styles.td} key={i}>
              {key}
            </td>
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

Table.styles = {
  td: {
    border: "1px solid #cccccc",
    padding: "6px 13px"
  },
  th: {
    backgroundColor: "#4CAF50",
    color : "white",
    padding: "6px",
    fontWeight: "bold",
    border: "1px solid #cccccc",
    width: "100%"
  },
  input: {
    width: "100%",
    color: "black"
  }
};

export default Table;
