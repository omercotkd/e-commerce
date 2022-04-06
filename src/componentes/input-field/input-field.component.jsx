import React, { useRef } from "react";

import "./input-field.style.css";

const InputField = (props) => {

    const inputRef = useRef(null);


    return (
        <div className="form__group">
            <input
                type={props.object.fieldType}
                className="form__field"
                placeholder={props.object.placeholder}
                name={props.object.name}
                value={props.object.value}
                onChange={props.object.onChange}
                ref={inputRef}
            />

            {
                props.object.require
                    ?
                    <label
                        htmlFor={props.object.name}
                        className="form__label"
                        onClick={() => inputRef.current.focus()}
                    ><mark className="red-mark">*</mark>{props.object.placeholder}
                    </label>
                    :
                    <label
                        htmlFor={props.object.name}
                        className="form__label"
                        onClick={() => inputRef.current.focus()}
                    >{props.object.placeholder}
                    </label>
            }
        </div>
    )
};

export default InputField;