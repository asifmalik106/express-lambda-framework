function authenticateToken(req, res, next)
{
    next();
    // let token = req.headers["authorization-token"];

    // firebaseAdmin.getAuth().verifyIdToken(token).then((decodedToken) => {
    //     next();
    // })
    // .catch((error) => {
    //     res.status(500).json("User not authenticated. "+error);
    // });

}

module.exports = authenticateToken;