import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main>
      <h1>Welcome to NextSpace!</h1>
      <p>
        A next-gen social media app to connect with frens inspired by MySpace
      </p>
      <p>To get started, sign up for an account</p>
    </main>
  );
}
