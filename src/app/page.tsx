"use client";

import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Toaster } from "~/components/ui/sonner"

interface ICreateResponse {
  key: string;
  data: string;
}

export default function HomePage() {
  return (
    <main className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <Toaster />
      <h1 className="text-4xl font-bold"></h1>
      <form className="flex flex-col md:flex-row items-center gap-2" onSubmit={async (e) => {
        e.preventDefault();

        const url = (document.getElementById("url") as HTMLInputElement).value;
        if (!url || url === "") return;

        const response = await fetch("/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          toast("Error", {
            description: "An error occurred while shortening the url",
          });
          return;
        }

        const data = await response.json() as ICreateResponse;

        toast(`${window.location.origin}/${data.key}`, {
          description: `Your link has been created.`,
          action: {
            label: "Copy",
            onClick: () => {
              navigator.clipboard.writeText(`${window.location.origin}/${data.key}`).catch(() => {
                toast("Failed to copy to clipboard");
              });
              toast("Copied to clipboard");
            }
          },
        })
      }}>
        <Input type="url" placeholder="Paste url here" id="url" />
        <Button type="submit" className="w-full md:w-12">➔</Button>
      </form>
    </main>
  );
}
