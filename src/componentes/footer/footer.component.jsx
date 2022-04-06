import React from "react";

import "./footer.style.css";

const Footer = () => {


    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy; Copyright {currentYear} Omer Cohen </p>
        </footer>
    )
};

export default Footer;
