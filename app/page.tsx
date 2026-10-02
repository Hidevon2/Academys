import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';
export default function Home() {
  return (<><h1>Learn the code behind Herbal-Ai</h1><p className="sub">Step through real lines from your capstone, then prove it with a quick challenge.</p>
    {courses.map(c => <CourseCard key={c.id} id={c.id} e={c.e} t={c.t} d={c.d} total={c.L.length} />)}</>);
}
