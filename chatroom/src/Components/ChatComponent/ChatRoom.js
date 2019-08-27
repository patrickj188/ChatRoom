import React from 'react';
import styled from 'styled-components';
import db from '../../services/db.service'

export default class ChatRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      test: [],
      message: '',
    }
  }

  fetchData = () => {
    db.readTestData()
    .then(data => {
      this.setState({ test: data })
    })
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.fetchData();
  }

  onSubmit = () => {
    // write state message to db
    console.log(this.state.message)
    db.writeToTestCollection(this.state.message).then(result => {
      console.log('done', result)
      this.fetchData();
    }).catch(err => {
      console.error('whooops', err)
    })
  }

  onChange = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit();
      return event.target.value = ''
    }
    this.setState({ message: event.target.value })
  }

  render() {
    const renderTest = this.state.test.map((x, i) => {
      return <p key={i}>{x.foo}</p>
    })
    
    return (
      <div>
        {renderTest}

        <input placeholder="say something" onKeyUp={this.onChange} />
      </div>
    )
  }
}
