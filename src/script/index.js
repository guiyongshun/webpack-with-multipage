import _ from 'lodash';
import Words from './words.js';
import printMe from './print.js';
import {name} from './two.js';

function test(){
    let element = document.createElement('div');
    let btn = document.createElement('button');
    let text = _.join(['hello','webpack! '],' ');

    element.innerHTML = text + Words();

    console.log(name);

    btn.innerHTML = `${name()} 点我点我！`;
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(test());