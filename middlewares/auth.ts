const bcrypt = require('bcrypt');

export const verifyToken: Function = (req: any, res: any, next: any) => {
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(process.env.AUTH_TOKEN, salt, (err: any, hash: any) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log("hash");

  //       console.log(hash);
  //     });
  //   });

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer: Array<string> = bearerHeader.split(' ');
    const bearerToken: string = bearer[1];

    bcrypt.compare(process.env.AUTH_TOKEN, bearerToken, (err: any, result: boolean) => {
      if (err) {
        console.error(err);
        res.sendStatus(403);
      } else {
        result ? next() : res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(403);
  }
};
