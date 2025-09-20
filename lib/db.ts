import { promises as fs } from 'fs';import path from 'path';import { randomUUID } from 'crypto';
const dataDir=path.join(process.cwd(),'data'); const dbPath=path.join(dataDir,'db.json');
export async function ensureDB(){ await fs.mkdir(dataDir,{recursive:true}); try{await fs.access(dbPath);}catch{ await fs.writeFile(dbPath, JSON.stringify({users:[],missions:[{id:'m1',title:'Phishing: Email Review',category:'Phishing',base_points:100,time_limit_seconds:180,hint_cost:10},{id:'m2',title:'Malware: Behavior Log',category:'Malware',base_points:120,time_limit_seconds:240,hint_cost:15}],attempts:[]},null,2),'utf-8'); } }
export async function readDB(){ await ensureDB(); const raw=await fs.readFile(dbPath,'utf-8'); return JSON.parse(raw); }
export async function writeDB(data:any){ await fs.writeFile(dbPath, JSON.stringify(data,null,2),'utf-8'); }
export function uid(){ return randomUUID(); }
