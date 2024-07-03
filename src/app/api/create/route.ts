import { Redis } from "@upstash/redis";
import { env } from "~/env";
export const maxDuration = 55;

interface ICreate {
    url: string;
}

const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
});

export async function POST(request: Request) {
    const body = await request.json() as ICreate;

    let length = 4;
    let key = generateKey(length);
    while (await redis.exists(key)) {
        length++;
        key = generateKey(4);
    }

    const data = await redis.set(key, body.url);

    return new Response(JSON.stringify({ key, data }), {
        headers: {
            'content-type': 'application/json',
        },
    });
}

const generateKey = (length: number) => {
    return Math.random().toString(36).substring(2, length) + Math.random().toString(36).substring(2, length);
}