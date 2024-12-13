"use client";

import AppPage from "@/app/[appid]/app/page";

export default function HomePage({ params }: { params: { appid: string } }) {
  return <AppPage params={params} />;
}
