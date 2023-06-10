import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function Blog() {
  return (
    <main>
      <h1>About us</h1>
      <p>We are a social media company that wants to bring people together!</p>
    </main>
  );
}
