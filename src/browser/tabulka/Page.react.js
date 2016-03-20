import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Fetch from 'react-fetch';

class Table extends React.Component {

  /*Initializes the variables*/
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filters: {},
      complies: true
    };
  }

  /*Loads the data in JSON format using fetch command, right after the component mounts*/
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

  /*@returns the header of the table*/
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
                  /*Everytime filters change, sends the change to filtersChanged function*/
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

  /*Reads the values from the input fields and saves them to a dictionary this.state.filters*/
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

  /*@returns the table data part of the table complying with the filters*/
  renderData(obj) {
    return (
      <tbody>{
        Object.keys(obj).map((key, i) => {
          /*Filters only if there are filters in the dictionary this.state.filters*/
          if (Object.keys(this.state.filters).length > 0) {
            this.state.complies = true;
            /*Checks against all the filters in this.state.filters*/
            for (var j = 0; j < Object.keys(this.state.filters).length; j++) {
              /*Return if the row[i]'s value in column j in lower case is a substring of a filter[j] in lower case*/
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

  /*@returns row of the table*/
  renderRows(keys) {
    return (
      <tr>{
        keys.map((key) => {
          /*@returns cell value of the table*/
          return (
            <td style={this.constructor.styles.td}>
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
          <Helmet title='Tabulka' />
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

/*CSS styling of the Table component*/
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
