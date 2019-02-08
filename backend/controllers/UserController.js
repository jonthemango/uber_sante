

class UserController {


    static get (){
        console.log(1)
        return (req, res, next) => {
            res.json({"message": "ok"})
        }
    }
}

module.exports = UserController;