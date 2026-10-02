import Link from 'next/link';
import { notFound } from 'next/navigation';
import LessonList from '@/components/LessonList';
import { courses } from '@/lib/data';
export const generateStaticParams = () => courses.map(c => ({ id: c.id }));
export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const c = courses.find(x => x.id === id); if (!c) notFound();
  return (<><Link href="/" className="crumb">← All courses</Link><h1>{c.e} {c.t}</h1><p className="sub">{c.d}</p>
    <LessonList id={c.id} lessons={c.L.map(({ t, f, g }) => ({ t, f, g }))} /></>);
}
