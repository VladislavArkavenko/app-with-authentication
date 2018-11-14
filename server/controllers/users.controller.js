const Users = require('mongoose').model('Users')

const create = (req, res) => {
    const { body: { user } } = req

    if(!user.email) {
        return res.json( { errors: { email: 'Is required' } } )
    }

    if(!user.password) {
        return res.json( { errors: { password: 'Is required' } } )
    }

    Users
        .findOne({ email: user.email })
        .then( user => {
            if ( user ) {
                res.json( { errors: { email: 'Is already registered.' } } )
            }
        })
        .catch( err => console.log(err) )

        const finalUser = new Users(user)
        finalUser.setPassword(user.password)
        return finalUser.save()
            .then(() => res.json( { user: finalUser.toAuthJSON() } ))

}
module.exports.create = create

const login = (req, res) => {
    const { body: { user } } = req

    if(!user.email) {
        return res.json( { errors: { email: 'Is required' } } )
    }

    if(!user.password) {
        return res.json( { errors: { password: 'Is required' } } )
    }

    Users
        .findOne( { email: user.email } )
        .then( usr => {
            if (!usr) {
                return res.json( { errors: { email: 'Not registered' } } )
            }
            usr.validatePassword( user.password )
                .then( isValid => isValid ?
                    res.json( { user: usr.toAuthJSON() } ) :
                    res.json( { errors: { password: 'Is incorrect' } } )
                )
        })
        .catch( err => console.log(err) )
}
module.exports.login = login
