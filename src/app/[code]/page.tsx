"use client";

import { useParams, useRouter } from "next/navigation";

interface IResolveResponse {
  url: string;
  data: string;
}

export default function HomePage() {
  const { code } = useParams();
  const router = useRouter();

  console.log(code);

  fetch(`/api/resolve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  }).then(async (response) => {
    if (!response.ok) {
      return;
    }

    const data = await response.json() as IResolveResponse;
    router.replace(data.url);
  }).catch(() => {
    router.replace("/");
  });

  return (
    <></>
  );
}
