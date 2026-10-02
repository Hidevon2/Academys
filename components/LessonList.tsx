'use client';
import Link from 'next/link';
import { useProgress } from '@/lib/progress';
export default function LessonList({ id, lessons }: { id: string; lessons: { t: string; f: string; g?: number }[] }) {
  const p = useProgress();
  return <>{lessons.map((l, i) => { const d = p.done[`${id}-${i}`];
    return (<Link key={i} href={`/course/${id}/${i + 1}`} className="card les"><div className={`num ${d ? 'done' : ''}`}>{d ? '✓' : i + 1}</div>
      <div><b>{l.t}</b><div className="file">{l.f.split('/').pop()}</div></div></Link>); })}</>;
}
