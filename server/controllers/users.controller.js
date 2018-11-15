const Users = require('mongoose').model('Users')

const create = (req, res) => {
    const { body: { user: { email, password } } } = req

    if (!email)    res.json( { errors: { email: 'Is required' } } )
    if (!password) res.json( { errors: { password: 'Is required' } } )

    Users
        .findOne( { email } )
        .then( user => {
            if ( user ) res.json( { errors: { email: 'Is already registered.' } } )
        })
        .catch( e => console.log(e) )

    const finalUser = new Users( { email, password } )
    finalUser.setPassword(password)

    return finalUser
            .save()
            .then( () => res.json( { user: finalUser.toAuthJSON() } ))
}

const login = (req, res) => {
    const { body: { user: { email, password } } } = req

    if (!email)     res.json( { errors: { email: 'Is required' } } )
    if (!password)  res.json( { errors: { password: 'Is required' } } )

    Users
        .findOne( { email } )
        .then( user => {
            if (!user) res.json( { errors: { email: 'Not registered' } } )
            else user.validatePassword( password ) ?
                 res.json( { user: user.toAuthJSON() } ) :
                 res.json( { errors: { password: 'Is incorrect' } } )
        })
        .catch( e => console.log(e) )
}

module.exports = { create, login }
