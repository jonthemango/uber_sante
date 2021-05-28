const jwt = require("jsonwebtoken")
const superSecret = "This string is used to sign the json web token"
const logger = require('../logs')
const persist = require('../persistence')

class AuthService {

    static async AuthenticateUser({ email, password, type }) {

        const getUser = async ({ email, password, type }) => {

            // type is either doctor, nurse, or patient
            // the collections are doctors, patients, nurses (with 's')
            type = type.toLowerCase() + "s"

            const user = await persist( async (db) => {
                const res =  await db.collection(type).findOne({ email, password })
                return res
            })
            if (!user) {
                return { success: false, message: `${type} does not exist` }
            }
            user.type = type
            delete user.password
            return { success: true, user }
        }


        const result = await getUser({ email, password, type })
        if (result.success) {
            const token = jwt.sign({
                _id: result.user._id,
                firstname: result.firstname,
                lastname: result.user.lastname,
                type: result.user.type
            },
                superSecret,
                { expiresIn: 60 * 60 * 24 * 7 }
            )
            return { success: result.success, token, user: result.user}
        }

        return {
            success: false,
            message: `User of type ${type} provided a wrong email/password combination`
        }
    }

    static AuthorizeUser(token) {
        let decoded = null;
        if (token == null || token == undefined) {
            return { isAuthorized: false }
        }
        try {
            decoded = jwt.verify(token, superSecret)
        } catch (error) {
            return { isAuthorized: false }
        }
        return { isAuthorized: true, token: decoded }
    }



    static async login(req, res) {
        logger(req.url)
        const { email, password, type } = req.body

        if (email == "" || email == undefined) {
            const example =
                "{email: 'example@mail.com',password: 'examplePassword',type: 'doctor, patient, or nurse',}"
            const success = false
            const message =
                "wrong request body, please send the following: " + example
            res.json({ success, message })
        } else {
            const result = await AuthService.AuthenticateUser({ email, password, type })
            res.json(result)
        }
    }
}
module.exports = AuthService
