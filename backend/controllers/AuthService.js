const jwt = require("jsonwebtoken")
const superSecret = "This string is used to sign the json web token"
const logger = require('../logs')

class AuthService {

    static async AuthenticateUser({ email, password, type }) {

        const getUser = async ({ email, password, type }) => {

            // type is either doctor, nurse, or patient
            // the collections are doctors, patients, nurses (with 's')
            type = type.toLowerCase() + "s"

            console.log(`searching for ${email} from database`)
            const user = await persist(async (db) => {
                return await db.collection(type).findOne({ email, password })
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
            return { success: result.success, token }
        }

        return {
            success: false,
            message: `User of type ${type} provided a wrong email/password combination`
        }
    }

    static async AuthorizeUser(req, res) {
        const token = req.body

    }


    static async login(req, res) {
        console.log(req.url)
        logger(req.url)
        const { email, password, type } = req.body
        console.log('body', req.body)

        if (email == "" || email == undefined) {
            const example =
                "{email: 'example@mail.com',password: 'examplePassword',type: 'doctor, patient, or nurse',}"
            const success = false
            const message =
                "wrong request body, please send the following: " + example
            res.json({ success, message })
        } else {

            const result = await AuthService.AuthenticateUser({ email, password, type })
            console.log(result)
            res.json(result)
        }
    }
}
module.exports = AuthService