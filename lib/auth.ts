import jwt from 'jsonwebtoken';import bcrypt from 'bcryptjs';
export type JWTPayload={uid:string;email:string;role:'user'|'admin'};
export function signToken(payload:JWTPayload){const secret=process.env.JWT_SECRET||'dev-secret-change-me'; return jwt.sign(payload, secret, {algorithm:'HS256',expiresIn:'7d'});}
export function verifyToken(token:string){try{const secret=process.env.JWT_SECRET||'dev-secret-change-me'; return jwt.verify(token, secret) as JWTPayload;}catch{return null;}}
export async function hashPassword(pw:string){const salt=await bcrypt.genSalt(10); return bcrypt.hash(pw, salt);}
export async function comparePassword(pw:string, hash:string){return bcrypt.compare(pw, hash);}
