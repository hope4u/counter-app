import { DataFunctionArgs } from "@remix-run/server-runtime";

export type Joke = {
  jokee?: string;
  id: string;
  name: string;
  content: string;
};

export type JokeRequest = {
  query: Object;
  operationName: String;
  variables: Object;
};

export const seedJokes = [
  {
    id: "1",
    name: "Road worker",
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  },
  {
    id: "2",
    name: "Frisbee",
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  },
  {
    id: "3",
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    id: "4",
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    id: "5",
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  {
    id: "6",
    name: "Dinner",
    content: `What did one plate say to the other plate? Dinner is on me!`,
  },
  {
    id: "7",
    name: "Elevator",
    content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
  },
];

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env);
    } catch (e) {
      return new Response(`${e}`);
    }
  },
};

async function handleRequest(request: Request, env: Env) {
  let id = env.JOKES.idFromName("A");
  let obj = env.JOKES.get(id);

  let body = {
    query: "",
    operationName: "getJokes",
  };
  let resp = await fetchDurable(env, body);
  return new Response(resp.body);
}

function fetchDurable(env: Env, body = {}) {
  const init =  { method: "POST", body: JSON.stringify(body) };

  if (env.JOKES) {
    const id = env.JOKES.idFromName("A");
    const obj = env.JOKES.get(id);
    return obj.fetch("https://graphql", init);
  } else {
    return fetch("https://jokes_durable.hope4u.workers.dev", init);
  }
}

export const getJokes = async ({ context: { env } }: DataFunctionArgs) => {
  let body = {
    query: "",
    operationName: "getJokes",
  };

  const resp = await fetchDurable(env, body);
  const { jokes } = await resp.json();
  return jokes;
};

export class JokesDurable {
  jokee?: string;
  jokes?: Array<Joke>;
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.jokes = seedJokes;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // Apply requested action.
    let url = new URL(request.url);
    let { operationName } = await request.json();

    if (operationName === "getJokes") {
      return new Response(JSON.stringify({ jokes: seedJokes }));
    }

    return new Response("Woops", { status: 404 });
  }
}

interface Env {
  JOKES: DurableObjectNamespace;
}
