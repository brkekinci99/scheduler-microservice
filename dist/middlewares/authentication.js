"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const bcrypt = require("bcrypt");
const verifyToken = (req, res, next) => {
    //   bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(process.env.AUTH_TOKEN, salt, (err: any, hash: any) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       console.log("hash");
    //       console.log(hash);
    //     });
    //   });
    const bearerHeader = req.headers["authorization"];
    console.log("bearer header");
    console.log(bearerHeader);
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        console.log(process.env.AUTH_TOKEN);
        console.log(bearerToken);
        bcrypt.compare(process.env.AUTH_TOKEN, bearerToken, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(403);
            }
            else {
                console.log(result);
                result ? next() : res.sendStatus(403);
            }
        });
        // if (process.env.AUTH_TOKEN == bearerToken) {
        //   next();
        // } else {
        //   res.sendStatus(403);
        // }
    }
    else {
        res.sendStatus(403);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authentication.js.map