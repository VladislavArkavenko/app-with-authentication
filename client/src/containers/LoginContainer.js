import Form from '../components/Form'
import React, { Component } from 'react'
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
                    console.log(this.props , "Props")
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
        if( this.isValidForm(e.target) ) {
            this.login({
                email:    e.target.email.value,
                password: e.target.password.value
            })
            e.target.reset()
        }
    }

    render() {
        return (
            < Form
                title={"Login form."}
                handleSubmit={this.handleSubmit}
                invalidEmail={this.state.invalidEmail}
                invalidPassword={this.state.invalidPassword} />
        )
    }
}

export default LoginContainer