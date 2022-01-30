import { useLoaderData } from "remix";
import { seedJokes } from "~/durables/jokesDurable";

import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = ({ params }) => {
  const jokeId = params.jokeId;
  const joke = seedJokes.find(({ id }) => id === params.jokeId);
  return joke;
};

export default function JokeRoute() {
  let joke = useLoaderData();
  return (
    <div>
      <p>{joke.name}</p>
      <p>{joke.content}</p>
    </div>
  );
}
