export const dynamic = 'force-dynamic';
 
export function GET() {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}