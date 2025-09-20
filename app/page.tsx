'use client';
import React from 'react';
export default function Page(){
  const sampleMissions=[
    {id:'m1',title:'Phishing: Email Review',category:'Phishing',points:100,timeLimit:180,hintCost:10},
    {id:'m2',title:'Malware: Behavior Log',category:'Malware',points:120,timeLimit:240,hintCost:15},
  ];
  return (<div className='min-h-screen bg-gray-50 p-6'>
    <header className='max-w-7xl mx-auto flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold'>SG</div>
        <div><h1 className='text-2xl font-semibold'>SecureGame Academy</h1><p className='text-sm text-gray-500'>Belajar keamanan siber lewat permainan — Phishing, Malware, Forensik</p></div>
      </div>
      <div className='flex items-center gap-3'>
        <a href='/score' className='px-3 py-2 rounded bg-white border text-sm'>Scoring Detail</a>
        <a href='/admin' className='px-3 py-2 rounded bg-white border text-sm'>Admin Panel</a>
      </div>
    </header>
    <main className='max-w-7xl mx-auto grid grid-cols-12 gap-6'>
      <section className='col-span-7'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Mission Hub</h2>
          <div className='text-sm text-gray-500'>Progress: <span className='font-medium text-indigo-600'>65%</span></div>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {sampleMissions.map(m=> (
            <article key={m.id} className='bg-white p-4 rounded-lg shadow-sm flex items-center justify-between'>
              <div>
                <div className='text-sm text-gray-400'>{m.category}</div>
                <h3 className='text-lg font-semibold'>{m.title}</h3>
                <p className='text-sm text-gray-500 mt-1'>Base {m.points} pts • Time {m.timeLimit}s • Hint {m.hintCost} pts</p>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <button onClick={async()=>{
                  const res=await fetch('/api/attempts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({missionId:m.id,correctCount:4,totalItems:5,timeTakenSeconds:120,hintsUsed:1})});
                  const data=await res.json();
                  alert('Final Score: '+data.finalScore);
                }} className='px-3 py-1 rounded bg-indigo-600 text-white text-sm'>Submit Attempt (Demo)</button>
                <a href='/score' className='px-3 py-1 rounded border text-sm'>Lihat Skor</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className='col-span-5 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm'><h3 className='font-semibold mb-2'>Export Laporan</h3>
          <div className='flex gap-2'>
            <a className='px-3 py-2 rounded bg-white border text-sm' href='/api/attempts/export.csv' target='_blank'>Export CSV</a>
            <a className='px-3 py-2 rounded bg-white border text-sm' href='/api/attempts/export.pdf' target='_blank'>Export PDF</a>
          </div></div>
      </aside>
    </main>
  </div>);
}
