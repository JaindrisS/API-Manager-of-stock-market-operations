import Jwt from "jsonwebtoken";

export const generateJwt = (uid: String) => {
  return new Promise((resolver, reject) => {
    let payload = { uid };
    if (process.env.JWTPRIVATEKEY) {
      Jwt.sign(
        payload,
        process.env.JWTPRIVATEKEY,
        { expiresIn: "12h" },
        (error, token) => {
          if (error) {
            console.log(error);
            reject("could not generate jwt");
          } else {
            resolver(token);
          }
        }
      );
    } else {
      reject("JWTPRIVATEKEY is not defined");
    }
  });
};
