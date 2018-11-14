import React from 'react'

const Form = (props) => {
    const { title, handleSubmit, invalidEmail, invalidPassword } = props
    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Email" name="email" />
                {invalidEmail}
                <input type="text" placeholder="Password" name="password" />
                {invalidPassword}
                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default Form;

