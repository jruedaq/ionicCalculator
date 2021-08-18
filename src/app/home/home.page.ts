import {Component} from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  displayL1: string;
  displayL2: string;
  displayL3: string;
  memory: Array<string> = [];
  openParenthesis = true;

  constructor() {
  }

  displayControl(x: string, openParenthesis: boolean = false) {
    if (openParenthesis) {
      this.openParenthesis = false;
    }
    this.memory.push(x);
    this.updateDisplay();
  }

  calculate() {
    if (this.memory[0] === '/' || this.memory[0] === '×') {
      this.syntaxError();
      return;
    }
    const operation = this.memory.join('').replace('×', '*');
    let r;
    try {
      r = math.evaluate(operation);
    } catch (x) {
      console.log(x);
      this.syntaxError(x.message);
      return;
    }

    this.displayL3 = new Intl.NumberFormat().format(r).toString();
  }

  parenthesisController() {
    if (this.openParenthesis) {
      this.memory.push('(');
      this.openParenthesis = !this.openParenthesis;
    } else {
      this.memory.push(')');
      this.openParenthesis = !this.openParenthesis;
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayL1 = this.memory.join('');
    this.displayL2 = '';
    this.displayL3 = '';
  }

  syntaxError(details: string = '[<-][->] : Goto') {
    this.displayL1 = 'Syntax ERROR';
    this.displayL2 = details;
    this.displayL3 = '[AC] : Cancel';
  }

  clear(allClear: boolean) {
    if (allClear) {
      this.memory = [];
    } else {
      this.memory.pop();
    }
    this.updateDisplay();
  }
}
