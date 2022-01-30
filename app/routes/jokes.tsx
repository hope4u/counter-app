import { Outlet, Link, useLoaderData } from "remix";
import stylesUrl from "~/styles/jokes.css";
import { JokesDurable, seedJokes } from "~/durables/jokesDurable";

// types
import type { LinksFunction, LoaderFunction } from "remix";
import type { Joke } from "~/durables/jokesDurable";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async (args) => {
  const data = { jokes: seedJokes };



  console.log(args.context.env);

  let id = JOKES.idFromName("A");
  let obj = JOKES.get(id);

  let body = {
    query: {},
    function: "getJokes",
  };

  let resp = await obj.fetch("https://", { body: JSON.stringify(body) });

  console.log(resp)

  return resp;
};

export default function JokesRoute() {
  let data = useLoaderData();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokes.map((joke: Joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
