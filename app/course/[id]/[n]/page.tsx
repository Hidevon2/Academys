import { notFound } from 'next/navigation';
import LessonView from '@/components/LessonView';
import { courses, liveUrl } from '@/lib/data';
export const generateStaticParams = () => courses.flatMap(c => c.L.map((_, i) => ({ id: c.id, n: String(i + 1) })));
export default async function LessonPage({ params }: { params: Promise<{ id: string; n: string }> }) {
  const { id, n } = await params; const ci = courses.findIndex(x => x.id === id), idx = Number(n) - 1;
  const c = courses[ci]; if (!c || !c.L[idx]) notFound(); const l = c.L[idx];
  return <LessonView key={`${id}-${n}`} cid={id} idx={idx} total={c.L.length} lesson={l} live={liveUrl(l.f, ci)} courseTitle={c.t} />;
}
