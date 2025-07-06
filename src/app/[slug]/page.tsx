"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <section>
      Sample Slug <button onClick={() => router.push("/")}>Click</button>
    </section>
  );
}
