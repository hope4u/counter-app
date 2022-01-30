const seedJokes = [
  {
    id: "1",
    name: "Road worker",
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`
  },
  {
    id: "2",
    name: "Frisbee",
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`
  },
  {
    id: "3",
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`
  },
  {
    id: "4",
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`
  },
  {
    id: "5",
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`
  },
  {
    id: "6",
    name: "Dinner",
    content: `What did one plate say to the other plate? Dinner is on me!`
  },
  {
    id: "7",
    name: "Elevator",
    content: `My first time using an elevator was an uplifting experience. The second time let me down.`
  }
];
export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (e) {
      return new Response(`${e}`);
    }
  }
};
async function handleRequest(request, env) {
  let id = env.JOKES.idFromName("A");
  let obj = env.JOKES.get(id);
  let body = {
    query: {},
    function: "getJokes"
  };
  let resp = await obj.fetch("https://", { body: JSON.stringify(body) });
  return new Response(resp.body);
}
export class JokesDurable {
  constructor(state, env) {
    this.state = state;
    this.jokes = seedJokes;
  }
  async fetch(request) {
    let url = new URL(request.url);
    let query = {};
    let body = await request.json();
    if ((body == null ? void 0 : body.function) === "getJokes") {
      return new Response(JSON.stringify(seedJokes));
    }
    return new Response("Woops", { status: 404 });
  }
}
