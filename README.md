# Next.js 13 - The Next Generation of React

## App Router

You can route inside the server component using `Link` which is work just like a normal `<a> tag`
but supports soft navigation where it only changes what it needs to be changed while on the client component you should use `useRouter` hook from `next/navigation`

```tsx
import { useRouter } from "next/navigation";

router.push("/blog");
```

### Route types

- `route `-> _Normal route link_
- `[id]` -> _Dynamic Routing ex: blog/:id_

Server component

```tsx
interface Props {
  params: {
    id: string;
  };
}

// you can also access the params id as Props
export default async function blog({ params }: Props) {
  const response = await fetch(`https://.../api/${params.id}`);

  return <main></main>;
}
```

Client Component

```tsx
import { useParams } from "next/navigation";

const { id } = useParams();
```

- `[...id]` -> for catching nested routes _ex: blog/text/test/id_
- `(group)` -> doesn't effect the routing instead making your code organized into related features.
- `@pro` -> parallel routes allowing you to render more pages in the same page with different slots

```tsx
export default function Layour({ children, prop, basic }) {
  return (
    <>
      {children}
      {pro}
      {basic}
    </>
  );
}
```

- `(..)cart` intercepting routes

  `You should always keep your routing as simple as possible.`

## Route Handlers

```tsx
export async function GET(){
  return new Response('Hello')
}

export async fucntion POST(request: Request){
  const data = await request.json();

  return new Response('hurrayyy')
}
```

```tsx
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const url = request.nextUrl;
  return NextResponse.json({ message: "Easy peasy" });
}
```

```yml
- app
	- page.tsx
	- list-items
		- route.ts -> where the you write your endpoints
```

`you can change the runtime from nodejs(default) into an edge function`.

## Layout

## Rendering and SEO

There is different types of rendering for pages in `Next13` which is differs from `Next12` way to handle different side of rendering here is the demo for migration.

```tsx
export const dynamic = "auto"; //by default

// Equivalent to getServerSideProps (SSR) which is ideal for the pages that changes very often
export const dynamic = "force-dynamic";

// Equivalent to getStaticProps (SSG) which is ideal for pages that doesn't change quite often
export const dynamic = "force-static";

// Equivalent to (ISR) its a revalidate option which allows you to regenerate a static page after a certain number of seconds.
export const revalidate = 6900;
```

| Data Fetching | Dynamic Functions | Rendering |
| ------------- | ----------------- | --------- |
| Cached        | No                | Static    |
| Cached        | Yes               | Dynamic   |
| Not Cached    | No                | Dynamic   |
| Not Cached    | Yes               | Dynamic   |

When it comes to SEO you can export a meta data variable that contains information like the title and description of the page this can be done in any page or layout file and the values will automatically be added to the head of the document.

```tsx
export const metadata = {
  title: "Hello world",
  description:
    "I am trying to improve myself by constantly learning new stuff!",
};
```

and if the data is dynamic

```tsx
// don't use type any everywhere in typescript it is just for explanation
export async function generateMetadata({ params }: any) {
  return {
    title: "...",
  };
}
```

## Data Fetching

you don't need `getServersideProps() or getStaticProps()` anymore server components can also be async allowing you to use `async await` just like a regular function which is make it pretty simple.

```tsx
export default async function Home() {
  const res1 = await prisma.getMany({});
  const res2 = await firebase.getDoc();
  const res3 = await fetch("...");
}
```

you don't have to worry about fetching the same data multiple times because Next handles everything for you `Automatic Deduping` and you can check documentation for further information
[Building Your Application: Data Fetching | Next.js ](https://nextjs.org/docs/app/building-your-application/data-fetching)

you can also control your caching strategy when fetching data

```tsx
const staticData = await fetch("things", { cache: "force-cache" });
const dynamicData = await fetch("things", { cache: "no-store" });

const revalidateData = await fetch("things", { next: { revalidate: 420 } });
```

## Streaming and Suspense

You don't need a client component to handle the loading UI you could only add the `loading.tsx` page in you route and it will handle loading data automatically for you and it uses `React.Suspense` under the hood.

```yml
- blogs
	- page.tsx
	- loading.tsx -> where you can handle the loading state
```

![Streaming and Suspense | 500](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-ui.png&w=3840&q=75&dpl=dpl_D3xw4qGQxUxVjVbKQoy1MVX3DPRZ)

## Build an Application

There are two important questions you should be wondering about right now

1. Where do we put UI components?
2. When should I use Server or Client Components?

For the first question you can put the components directory any where in your folder structure but what **Vercel** recommends is to put your app directory and components directory inside of the `src` folder. Doing that will give a pretty cool feature which is absolute imports.

```tsx
// before
import { Button } from "../../../components/button";

// after
import { Button } from "@/components/button";
```

make sure to check the docs for more info [Building Your Application: Configuring | Next.js ](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases)

for the second question you want to use the server components as much as possible and only add interactivity when needed because that will keep your JavaScript bundle as small as possible and thus improve the performance of your application.

![When should you use Server and Client comopnents](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*M2HXYaFMhZMtTfNK.png)

## Software Architecture

you should think about your application this way:

1. Which pages have static data and doesn't need to be changed.
2. Which pages should be constantly changing data or staying up to date.
3. Which pages should be statically regenerated after a fixed period of time.

by answering these questions you will have a clear vision about which strategy you should use for each application whether `SSG, SSR, or ISR`
