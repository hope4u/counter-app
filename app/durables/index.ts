export type Joke = {
  jokee?: string;
  name: string;
  content: string;
};

export const seedJokes = [
  {
    name: "Road worker",
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  },
  {
    name: "Frisbee",
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  },
  {
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  {
    name: "Dinner",
    content: `What did one plate say to the other plate? Dinner is on me!`,
  },
  {
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
    query: {},
    function: "getJokes",
  };

  let resp = await obj.fetch("https://", { body: JSON.stringify(body) });

  return new Response(resp.body);
}

export class JokeDurable {
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
    let query = {};
    let body = await request.json();

    if (body?.function === "getJokes") {
      return new Response(JSON.stringify(seedJokes));
    }

    return new Response("Woops", { status: 404 });
  }
}

interface Env {
  JOKES: DurableObjectNamespace;
}
