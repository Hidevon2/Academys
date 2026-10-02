'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Lesson } from '@/lib/data';
import { complete } from '@/lib/progress';
export default function LessonView({ cid, idx, total, lesson: l, live, courseTitle }: { cid: string; idx: number; total: number; lesson: Lesson; live: string; courseTitle: string }) {
  const [step, setStep] = useState(0); const [ans, setAns] = useState<string[]>([]); const [pick, setPick] = useState<number | null>(null);
  const [fill, setFill] = useState(''); const [res, setRes] = useState<boolean | null>(null); const [tried, setTried] = useState(0);
  const n = l.c.length, quiz = step >= n, q = l.q;
  const reset = () => setRes(null);
  const check = () => {
    const ok = q.k === 'mc' ? pick === q.a : q.k === 'fill' ? fill.trim().toLowerCase() === String(q.a).toLowerCase() : JSON.stringify(ans) === JSON.stringify(q.l);
    setRes(ok); if (!ok) setTried(t => t + 1); else complete(`${cid}-${idx}`, tried === 0);
  };
  const bank = q.k === 'arr' ? q.l!.map((_, i, a) => a[(i + 1) % a.length]).filter(x => !ans.includes(x)) : [];
  const next = idx + 1 < total ? `/course/${cid}/${idx + 2}` : `/course/${cid}`;
  return (<>
    <Link href={`/course/${cid}`} className="crumb">← {courseTitle}</Link><h2>{l.t}</h2><div className="file">{l.f}</div>
    {l.g ? <div className="file" style={{ fontFamily: 'inherit' }}>Auto-generated notes from the real code</div> : null}
    <p style={{ margin: '8px 0' }}><a className="live" href={live} target="_blank" rel="noopener noreferrer">🌐 See it live</a></p>
    <div className="code">{l.c.map((x, i) => <div key={i} className={`ln ${quiz || i < step ? 'seen' : ''} ${!quiz && i === step ? 'on' : ''}`}><s>{i + 1}</s>{x}</div>)}</div>
    {!quiz ? (<><div className="card note"><small>Line {step + 1} of {n}</small><p style={{ margin: '6px 0 0' }}>{l.n[step]}</p></div>
      <div className="row">{step > 0 && <button className="btn alt" onClick={() => setStep(step - 1)}>← Back</button>}
      <button className="btn" onClick={() => setStep(step + 1)}>{step === n - 1 ? 'Take the challenge ✨' : 'Next line →'}</button></div></>) : (<>
      <div className="card"><small style={{ color: 'var(--acc)', fontWeight: 700 }}>CHALLENGE</small>
        <p><b dangerouslySetInnerHTML={{ __html: q.p }} /></p>
        {q.k === 'mc' && q.o!.map((o, i) => <button key={i} className={`opt ${res === true && i === q.a ? 'right' : ''} ${pick === i && res === false ? 'wrong' : ''} ${pick === i && res === null ? 'sel' : ''}`} onClick={() => { setPick(i); reset(); }}>{o}</button>)}
        {q.k === 'fill' && <div className="code" style={{ padding: '12px 14px', whiteSpace: 'pre' }}>{q.pre}<input className="fill" style={{ width: `${String(q.a).length + 3}ch` }} value={fill} onChange={e => { setFill(e.target.value); reset(); }} autoComplete="off" autoCapitalize="off" spellCheck={false} />{q.post}</div>}
        {q.k === 'arr' && <><div className="slot">{ans.map((x, i) => <button key={i} className="chip" onClick={() => { setAns(ans.filter((_, j) => j !== i)); reset(); }}>{i + 1}. {x}</button>)}</div>
          {bank.map(x => <button key={x} className="chip" onClick={() => { setAns([...ans, x]); reset(); }}>{x}</button>)}</>}
        {res === true && <div className="fb ok">✔ Correct! +{tried ? 15 : 30} XP</div>}{res === false && <div className="fb no">✘ Not quite. Try again!</div>}</div>
      <div className="row">{res === true ? <Link className="btn" href={next}>Continue →</Link> : <button className="btn" onClick={check}>Check</button>}</div></>)}
  </>);
}
