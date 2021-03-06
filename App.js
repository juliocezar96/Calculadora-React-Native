import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';

import Display from './src/components/Display';
import Button from './src/components/Button';


const initialState = {
  displayValue: '0',
  clearDisplay : false,
  operation: null,
  values: [0,0],
  current: 0,
}

export default class App extends Component {

  state = {... initialState }

  //evento quando apertar nos numberos
  addDigit = num => {
    
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    
    if(num === '.' && !clearDisplay && this.state.displayValue.includes('.')){ //nao pode inserir 2x o ponto (.)
      return;
    }
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + num; // concat de string
    this.setState({displayValue, clearDisplay: false});

    if(num !== ''){
      const newValue = parseFloat(displayValue);
      const values = [... this.state.values];
      values[this.state.current] = newValue;
      this.setState({values});
    }

  }
  //limpar memoria
  cleaMemory = () => {
    this.setState ({... initialState});
  }
  //evento quando apertar nos operadores
  setOperation = operation => {
    if(this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`) //faz as operações
      } catch (error) {
        values[0] = this.state.values[0];
      }
      values[1]= 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
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
