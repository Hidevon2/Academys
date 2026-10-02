import raw from '@/data/lessons.json';
export type Q = { k: 'mc' | 'fill' | 'arr'; p: string; o?: string[]; a?: number | string; pre?: string; post?: string; l?: string[] };
export type Lesson = { t: string; f: string; c: string[]; n: string[]; q: Q; g?: number };
export type Course = { id: string; e: string; t: string; d: string; L: Lesson[] };
export const courses = raw as unknown as Course[];
export const SITE = 'https://herbalaiph.vercel.app';
const map: [RegExp, string][] = [[/forum|community/i, '/community'], [/message|messenger/i, '/messenger'], [/suggest/i, '/suggest'], [/chat|ai\/|gemini|drAi|dr-ai|knowledge/i, '/chat'], [/herb/i, '/library'], [/auth|jwt|password|token|session|user|signin|AuthContext/i, '/signin']];
export function liveUrl(file: string, courseIndex: number) {
  for (const [r, u] of map) if (r.test(file)) return SITE + u;
  return SITE + ['/signin', '/library', '/library', '/chat'][courseIndex];
}
