import React from 'react';


export function LoggedIn(props) {
    return (
        <div>
            {props.show && <h2>Logged in</h2>}
        </div>
    );
}