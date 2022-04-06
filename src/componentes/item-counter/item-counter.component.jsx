import React, { useRef } from "react";

import "./item-counter.style.css";

const ItemCounter = (props) => {

    const intervalRef = useRef(null);

    const increase = () => {
        if(props.count >= 999){
            props.countFunc(999);
        }else{
            props.countFunc(prev => prev + 1);
        }
    };

    const decrease = () => {
        if (props.count <= 1){
            props.countFunc(1);
        }else{
            props.countFunc(prev => prev - 1);
        };
    };

    const startCounter = (func) => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            func();
        }, 100);
    };

    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };


    const handleChange = (event) => {
    
        const { value } = event.target;
        if (value == ""){
            props.countFunc(1);
        }else if(value < 1){
            props.countFunc(1);
        }else if(value >= 999){
            props.countFunc(999);
        }else{
            if (/^\d+$/.test(value)){
                props.countFunc(value);
            }else{
                props.countFunc(1);
            }   
        };
        
    };

    const testValue = () => {
        
        if (props.count == ""){
            props.countFunc(1);
        }else{
            // convert the number to be considerd as a number and not as a string 
            props.countFunc(prev => prev - 0);
        }
    }

    return(
        <div className="qty mt-5">
            <span className="plus bg-dark" onClick={increase} onMouseDown={() => startCounter(increase)} onMouseUp={stopCounter}>+</span>
            <input value={props.count} onChange={handleChange} onBlur={testValue} className="input-count"/>
            <span className="minus bg-dark" onClick={decrease} onMouseDown={() => startCounter(decrease)} onMouseUp={stopCounter}>-</span>
            <h5 className="counter-text">:כמות</h5>
        </div>
    )

};

export default ItemCounter;