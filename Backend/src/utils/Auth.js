const jwt=require("jsonwebtoken");

const Auth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    console.log(req.cookies.accessToken)
    if (!accessToken) {
        return res.status(401).json({ msg: "You are not logged in!" });
    } else {
        jwt.verify(accessToken, process.env.AccessTokenPassword, (err, payload) => {
            if (err) {
                return res.status(403).json({ msg: "Authentication failed" });
            } else {
                req.user = payload;  //this will be available for all the routes that follow this middleware
                next();
            }
        })
    }


}

module.exports=Auth;