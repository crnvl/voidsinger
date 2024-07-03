import { GetServerSidePropsContext } from "next";
import { env } from "~/env";

interface IResolveResponse {
  url: string;
  data: string;
}

interface IParams extends Record<string, string> {
  code: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext<IParams>) {
  const code = context.params?.code;

  if (!code) {
    return {
      notFound: true,
    };
  }

  fetch(`${env.DOMAIN}/api/resolve`, {
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
    context.res.writeHead(301, { Location: data.url });
    context.res.end();
  }).catch(() => {
    context.res.writeHead(301, { Location: "/" });
    context.res.end();
  }).catch(() => {
    context.res.writeHead(301, { Location: "/" });
    context.res.end();
  });

  return {
    props: {},
  };
}

export default function HomePage() {
  return (
    <></>
  );
}
