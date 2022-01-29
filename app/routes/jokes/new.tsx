export default function NewJokeRoute() {
  return (
    <form action="post">
      <div>
        <label htmlFor="new-joke-name">
          Name: <input type="text" name="name" id="new-joke-name" />
        </label>
      </div>
      <div>
        <label htmlFor="new-joke-content">
          Content: <textarea name="content" id="new-joke-content" />
        </label>
      </div>
      <div>
        <button type="submit" className="button">
          Add
        </button>
      </div>
    </form>
  );
}
