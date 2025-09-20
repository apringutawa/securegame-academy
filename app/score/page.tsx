'use client';
import React from 'react';
export default function ScorePage(){
  const [rows,setRows]=React.useState<any[]>([]);
  React.useEffect(()=>{fetch('/api/attempts').then(r=>r.json()).then(setRows).catch(()=>setRows([]));},[]);
  return (<div className='min-h-screen bg-gray-50 p-6'>
    <header className='max-w-7xl mx-auto flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'>
        <a href='/' className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold'>SG</a>
        <div><h1 className='text-2xl font-semibold'>Scoring Detail</h1><p className='text-sm text-gray-500'>Detail perhitungan skor & riwayat percobaan</p></div>
      </div>
      <a href='/' className='px-3 py-2 rounded bg-white border text-sm'>Kembali</a>
    </header>
    <main className='max-w-7xl mx-auto'>
      <div className='bg-white p-4 rounded-lg shadow-sm'>
        <h3 className='font-semibold mb-2'>Riwayat Percobaan</h3>
        <table className='w-full text-sm'><thead><tr className='text-left text-gray-500'>
          <th className='py-2'>Tanggal</th><th>User</th><th>Mission</th><th>Final</th><th>Akurasi</th><th>Waktu</th><th>Hints</th>
        </tr></thead><tbody>
          {rows.map((a:any)=>(<tr key={a.id} className='border-t'>
            <td className='py-2'>{a.created_at}</td><td>{a.user_email}</td><td>{a.mission_id}</td>
            <td className='font-medium'>{a.finalScore}</td><td>{Math.round(a.accuracy*100)}%</td><td>{a.timeTakenSeconds}s</td><td>{a.hintsUsed}</td>
          </tr>))}
        </tbody></table>
      </div>
    </main>
  </div>);
}
