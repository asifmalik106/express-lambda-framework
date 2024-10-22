function langToken(req, res, next)
{
    let lang = req.headers["lang"];

    if(lang!="bn")
    {
        return res.status(401).json({ status: "error", msg: "Unauthorized" })
    }
    else
    {
        next();
    }
}

module.exports = langToken;