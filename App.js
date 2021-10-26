import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';

import Display from './src/components/Display';
import Button from './src/components/Button';

export default class App extends Component {

  state = {
    displayValue: '0'
  }

  //evento quando apertar nos numberos
  addDigit = n => {
    this.setState ({ displayValue : n})
  }
  //limpar memoria
  cleaMemory = () => {
    this.setState ({ displayValue : '0'})
  }
  //evento quando apertar nos operadores
  setOperation = operation => {

  }

  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick = {this.cleaMemory} />
          <Button label='/' operation onClick= {() => this.setOperation('/')} />
          <Button label='7' onClick= { this.addDigit} />
          <Button label='8' onClick= { this.addDigit}/>
          <Button label='9' onClick= { this.addDigit}/>
          <Button label='*' operation onClick= {() => this.setOperation('*')}/>
          <Button label='4' onClick= { this.addDigit} />
          <Button label='5' onClick= {this.addDigit} />
          <Button label='6' onClick= { this.addDigit} />
          <Button label='-' operation onClick= {() => this.setOperation('-')} />
          <Button label='1' onClick= { this.addDigit}/>
          <Button label='2' onClick= { this.addDigit}/>
          <Button label='3' onClick= {this.addDigit}/>
          <Button label='+' operation onClick= {() => this.setOperation('+')}/>
          <Button label='0' double onClick= { this.addDigit}/>
          <Button label='.' onClick= {this.addDigit} />
          <Button label='=' operation onClick= {() => this.setOperation('=')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  buttons:{
    flexDirection: 'row',
    flexWrap:'wrap'
  }
})
