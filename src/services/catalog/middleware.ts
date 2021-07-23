import { json, Request, Response } from "express";
import jwt from "jsonwebtoken"


export const middlewares = {
	jwt_verifier: (req: Request, res: Response, next: any) => {
		const token = req.headers['authorization']?.replace('Bearer' , '').trim();

		if (token) {
			jwt.verify(token as string, process.env.JWT_SECRET as string, (err, decoded) => {
				if (err) {
					return res.json({ mensaje: 'Invalid token' });
				} else {
					req.body.decoded = decoded;
					next();
				}
			});
		} else {
			res.send({
				msg: 'Token not provided'
			});
		}
	}

}