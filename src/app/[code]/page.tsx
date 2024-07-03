import { redirect } from "next/navigation";
import { env } from "~/env";

interface IParams {
  code: string;
}

async function getData(context: IParams) {
  const code = context.code;

  if (!code) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(`${env.DOMAIN}/api/resolve/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const data = await response.json() as { url: string };

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default async function Page({
  params: { code },
}: {
  params: { code: string }
}) {
  const data = await getData({ code });

  redirect(data.props?.data.url ?? "/");
  return (
    <></>
  );
}
