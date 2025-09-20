'use client';
import React from 'react';
export default function AdminPage(){
  const [missions,setMissions]=React.useState<any[]>([]);
  const [form,setForm]=React.useState<any>({title:'',category:'Phishing',base_points:100,time_limit_seconds:180,hint_cost:10});
  React.useEffect(()=>{fetch('/api/missions').then(r=>r.json()).then(setMissions).catch(()=>setMissions([]));},[]);
  const create=async()=>{
    const res=await fetch('/api/missions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    const m=await res.json(); setMissions((p:any)=>[...p,m]);
  };
  return (<div className='min-h-screen bg-gray-50 p-6'>
    <header className='max-w-7xl mx-auto flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'><a href='/' className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold'>SG</a>
      <div><h1 className='text-2xl font-semibold'>Admin Panel</h1><p className='text-sm text-gray-500'>Kelola misi & wizard buat misi</p></div></div>
      <a href='/' className='px-3 py-2 rounded bg-white border text-sm'>Kembali</a>
    </header>
    <main className='max-w-7xl mx-auto grid grid-cols-12 gap-6'>
      <section className='col-span-8 bg-white p-4 rounded-lg shadow-sm'>
        <h2 className='text-lg font-semibold mb-2'>Manage Missions</h2>
        <table className='w-full text-sm'><thead><tr className='text-left text-gray-500'>
          <th className='py-2'>Judul</th><th>Kategori</th><th>Base</th><th>Waktu</th><th>Hint</th>
        </tr></thead><tbody>
          {missions.map((m:any)=>(<tr key={m.id} className='border-t'><td className='py-2'>{m.title}</td><td>{m.category}</td><td>{m.base_points}</td><td>{m.time_limit_seconds}s</td><td>{m.hint_cost}</td></tr>))}
        </tbody></table>
        <div className='mt-6 p-4 bg-gray-50 border rounded'><h3 className='font-semibold'>Wizard: Buat Misi</h3>
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <input className='border rounded px-3 py-2 text-sm' placeholder='Judul' value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            <select className='border rounded px-3 py-2 text-sm' value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              <option>Phishing</option><option>Malware</option><option>Forensik</option><option>Secure Coding</option><option>CTF</option>
            </select>
            <input className='border rounded px-3 py-2 text-sm' type='number' placeholder='Base Points' value={form.base_points} onChange={e=>setForm({...form,base_points:+e.target.value})}/>
            <input className='border rounded px-3 py-2 text-sm' type='number' placeholder='Time Limit (seconds)' value={form.time_limit_seconds} onChange={e=>setForm({...form,time_limit_seconds:+e.target.value})}/>
            <input className='border rounded px-3 py-2 text-sm' type='number' placeholder='Hint Cost' value={form.hint_cost} onChange={e=>setForm({...form,hint_cost:+e.target.value})}/>
          </div>
          <div className='mt-3 flex gap-2'><button onClick={create} className='px-3 py-2 rounded bg-indigo-600 text-white text-sm'>Simpan</button>
          <button onClick={()=>setForm({title:'',category:'Phishing',base_points:100,time_limit_seconds:180,hint_cost:10})} className='px-3 py-2 rounded border text-sm'>Reset</button></div>
        </div>
      </section>
      <aside className='col-span-4 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm'><h4 className='font-semibold mb-2'>Export</h4>
          <div className='flex gap-2'><a className='px-3 py-2 rounded bg-white border text-sm' href='/api/attempts/export.csv' target='_blank'>Export CSV</a>
            <a className='px-3 py-2 rounded bg-white border text-sm' href='/api/attempts/export.pdf' target='_blank'>Export PDF</a></div>
        </div>
      </aside>
    </main>
  </div>);
}
