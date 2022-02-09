import React from 'react'

const Alerts = ({msg,type}) => {
    return (
        <div class={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alerts;
