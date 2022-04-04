import React, { useState } from "react";
import { Container, Previous, Current, Screen, Button } from "./Styled";

export default function Calculator() {

    const [previus, setPrevius] = useState('');
    const [current, setCurrent] = useState('');
    const [operation, setOperation] = useState('');

    const appendValue = (el) => {
        const value = el.target.getAttribute('data');
        if (value === '.' && current.includes('.')) return;
        setCurrent(current + value); // Concatenar los numeros juntos
    }

    const handleDelete = () => {
        setCurrent(String(current).slice(0, -1));
    }

    const handleAllClear = () => {
        setCurrent('');
        setPrevius('');
        setOperation('');
    }

    const chooseOperation = (el) => {
        if (current === '') return;
        if (previus !== '') {
            let value = compute();
            setPrevius(value);
        } else {
            setPrevius(current);
        }

        setCurrent('');
        setOperation(el.target.getAttribute('data'));
    }

    const equals = () => {
        let value = compute();
        if (value == undefined || value == null) return;
        setCurrent(value)
        setPrevius('');
        setOperation('');
    }

    const compute = () => {
        let result;
        let previusNumber = parseFloat(previus);
        let currentNumber = parseFloat(current);
        if (isNaN(previusNumber) || isNaN(currentNumber)) return;
        switch (operation) {
            case '÷':
                result = previusNumber / currentNumber;
                break;
            case 'x':
                result = previusNumber * currentNumber;
                break;
            case '+':
                result = previusNumber + currentNumber;
                break;
            case '-':
                result = previusNumber - currentNumber;
                break;
            default:
                return;
        }
        return result;
    }

    return (
        <Container>
            <Screen>
                <Previous>{previus} {operation}</Previous>
                <Current>{current}</Current>
            </Screen>
            <Button onClick={handleAllClear} gridSpan={2} control>AC</Button>
            <Button onClick={handleDelete} control>DEL</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'x'} onClick={chooseOperation} operation>x</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={chooseOperation} operation>-</Button>
            <Button data={'.'} onClick={appendValue} period>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} onClick={equals} equals>=</Button>
        </Container>
    )
}