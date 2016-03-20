import React, { Component, PropTypes } from 'react';
import Fetch from 'react-fetch';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filters: {},
      complies: true
    };
  }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/cikrApwlgy?indent=2')
      .then((responseData) => responseData.text())
      .then((responseData) => {
        this.setState({
          data: JSON.parse(responseData)
        });
        this.setState({
          heading: Object.keys(this.state.data[1])
        });
      });
  }

  renderHeader(keys) {
    return (
      <thead>
      <tr>{
        keys.map((key, i) => {
          return (
            <th style={this.constructor.styles.th}>
              {key}
              <div></div>
              <input
                id={i}
                type="text"
                onChange={
                  this.filtersChanged.bind(this)
                  }
                placeholder="set filter"
                style={this.constructor.styles.input}
              />
            </th>
          );
        })
      }</tr>
      </thead>
    );
  }

  filtersChanged(phrase) {
    event.preventDefault();
    if (phrase.target.value != "") {
      this.state.filters[phrase.target.id] = phrase.target.value;
    }
    else {
      delete this.state.filters[phrase.target.id];
    }
    this.forceUpdate()
  }

  renderData(obj) {
    return (
      <tbody>{
        Object.keys(obj).map((key, i) => {
          /*Filter only if there are filters in the dictionary this.state.filters*/
          if (Object.keys(this.state.filters).length > 0) {
            this.state.complies = true;
            for (var j = 0; j < Object.keys(this.state.filters).length; j++) {
              if ((((Object.values(obj[i])[Object.keys(this.state.filters)[j]]).toString()).toLowerCase()
                  .indexOf((Object.values(this.state.filters)[j]).toString().toLowerCase())) > -1) {
              }
              else {
                this.state.complies = false
              }
            }
            if (this.state.complies) {
              return this.renderRows(Object.values(obj[i]));
            }
          }
          else {
            return this.renderRows(Object.values(obj[i]));
          }
        })
      }</tbody>
    );
  }

  renderRows(keys) {
    return (
      <tr>{
        keys.map((key) => {
          return (
            <td style={this.constructor.styles.td} >
              {key}
            </td>
          );
        })
      }</tr>
    );
  }

  render() {
    if (this.state.heading) {
      return (
        <div>
          <table style={this.constructor.styles.table}>
            {this.renderHeader(this.state.heading)}
            {this.renderData(this.state.data)}
          </table>
        </div>
      );
    }
    else {
      return (<div>Loading data...</div>)
    }
  }

}

Table.styles = {
  table: {
    width: "100%",
    tableLayout: "fixed"
  },
  td: {
    wordWrap: "break-word",
    border: "1px solid #cccccc",
    padding: "6px 13px"
  },
  th: {
    wordWrap: "break-word",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "6px",
    fontWeight: "bold",
    border: "1px solid #cccccc"
  },
  input: {
    width: "100%",
    color: "#4CAF50",
    textAlign: "center"
  }
};

export default Table;
