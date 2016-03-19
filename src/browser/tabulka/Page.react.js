import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

class Table extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {},
      filters: {}
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://www.json-generator.com/api/json/get/cikrApwlgy?indent=2',
      dataType: 'json',
      success: (data) => {
        this.setState({
          data: data,
          heading: data[1]
        });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
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
              <input
                id={i}
                type="text"
                onChange={
                  this.filterData.bind(this)
                  }
                style={this.constructor.styles.input}
              />
            </th>
          );
        })
      }</tr>
      </thead>
    );
  }

  filterData(phrase) {
    event.preventDefault();
    if (phrase.target.value != "") {
      this.state.filters[phrase.target.id] = phrase.target.value;
    }
    else {
      delete this.state.filters[phrase.target.id];
    }
    this.forceUpdate()
  }

  objToTable(obj) {
    return (
      <tbody>{
        Object.keys(obj).map((key, i) => {
          var j = 0;
          console.log(key);
          /*Filter only if there are filters in the dictionary this.state.filters*/
          if (Object.keys(this.state.filters).length > 0) {
            for (j=0; j < Object.keys(this.state.filters).length; j++) {
              if (!(((Object.values(obj[i])[j]).toString()).indexOf((Object.values(this.state.filters)[j]).toString()))) {
                return this.renderTd(Object.values(obj[i]), i);
              }
            }
          }
          else {
            return this.renderTd(Object.values(obj[i]), i);
          }
        })
      }</tbody>
    );
  }

  renderTd(keys, i) {
    return (
      <tr style={this.constructor.styles.tr}>{
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
    if (this.state.heading) {
      return (
        <div>
          <table>
            {this.renderHeaderByKeys(Object.keys(this.state.heading))}
            {this.objToTable(this.state.data)}
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
  td: {
    border: "1px solid #cccccc",
    padding: "6px 13px"
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "6px",
    fontWeight: "bold",
    border: "1px solid #cccccc",
  },
  input: {
    width: "100%",
    color: "#4CAF50"
  }
};

export default Table;
