import { Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Form from '../components/Form'
import validator from 'validator'

const initState = {
    invalidEmail: '',
    invalidPassword: '',
    redirect: false
}

class RegisterContainer extends Component {
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

        const request = new Request('http://localhost:3000/api/users/create', options)
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
                    alert("You are registered now. Welcome! Please log in.")
                    this.setState({
                        redirect: true
                    })
                }
            })
            .catch( e => console.log(e) )
    }

    isValidForm(form) {
        const email = form.email.value
        const password = form.password.value
        const err = { ...initState }

        if(!validator.isEmail(email)) {
            err.invalidEmail = 'Invalid email.'
        }
        if(!validator.isLength( password , {min: 8, max: 16}) ) {
            err.invalidPassword = 'Password have to contain 8-16 characters.'
        }
        this.setState({
            ...err
        })

        return Object.keys(err).every( key => !err[key] ) //Returns true only if there is no err.
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
        const { redirect, invalidEmail, invalidPassword } = this.state

        if (redirect)  <Redirect to={ this.props.redirectPath } />

        return (
            < Form
                title={ "Register form." }
                handleSubmit={ this.handleSubmit }
                invalidEmail={ invalidEmail }
                invalidPassword={ invalidPassword } />
        )
    }
}

export default RegisterContainer