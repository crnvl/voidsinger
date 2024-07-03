import { Redis } from "@upstash/redis";
import { env } from "~/env";
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface IResolve {
    code: string;
}

const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
});

export async function POST(request: Request) {
    const body = await request.json() as IResolve;

    const data = await redis.get(body.code);

    if (!data) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
            headers: {
                'content-type': 'application/json',
            },
            status: 404,
        });
    }

    return new Response(JSON.stringify({ url: data }), {
        headers: {
            'content-type': 'application/json',
        },
    });
}