import React, { Component } from 'react'
import Form from '../components/Form'
import validator from 'validator'

// TODO: Make inputs clear after successful logging.

const initState = {
    invalidEmail: '',
    invalidPassword: ''
}

class LoginContainer extends Component {
    constructor(props) {
        super(props)

        this.state = { ...initState }
        this.login = this.login.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    login (credentials) {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const body = JSON.stringify({ user: credentials })

        const options = {
            method: "POST",
            headers: headers,
            body: body
        }

        const request = new Request('http://localhost:3000/api/users/login', options)
        fetch(request)
            .then( response => response.json() )
            .then( data => {
                const errors = data.errors
                if (errors) {
                    const { email, password } = errors
                    this.setState({
                        invalidEmail: email,
                        invalidPassword: password
                    })
                } else {
                    alert("Welcome!")
                    this.props.toggleState() //To make all app know that user is logged in now.
                }
            })
    }

    isValidForm(form) {
        const email = form.email.value
        const password = form.password.value
        const err = { ...initState }

        if(!validator.isEmail(email)) {
            err.invalidEmail = 'Invalid email.'
        }
        if(!validator.isAlphanumeric( password ) ) {
            err.invalidPassword = 'Invalid password.'
        }
        this.setState({
            ...err
        })

        return Object.keys(err).every( key => !err[key] )
    }

    handleSubmit (e) {
        e.preventDefault()
        const form = e.target
        if( this.isValidForm(form) ) {
            this.login({
                email:    form.email.value,
                password: form.password.value
            })
            form.reset()
        }
    }

    render() {
        const { invalidEmail, invalidPassword } = this.state

        return (
            < Form
                title={"Login form."}
                handleSubmit={ this.handleSubmit }
                invalidEmail={ invalidEmail }
                invalidPassword={ invalidPassword } />
        )
    }
}

export default LoginContainer