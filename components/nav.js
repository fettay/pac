  
import React from 'react';
/* eslint react/prop-types: 0 */
import styles from '../styles/Nav.module.css';

const Nav = (props) => {
    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        dots.push((
            <span
                key={`step-${i}`}
                className={`${styles.dot} ${isActive ? styles.active : ''}`}
            >&bull;</span>
        ));
    }

    return (
        <div className={styles.nav}>{dots}</div>
    );
};

export default Nav;