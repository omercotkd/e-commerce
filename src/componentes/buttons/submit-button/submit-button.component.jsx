import React from "react";
import { Button } from "react-bootstrap";

const SubmitButton = (props) => {
    return (
        <Button
            variant="primary"
            size="lg"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
};

export default SubmitButton;