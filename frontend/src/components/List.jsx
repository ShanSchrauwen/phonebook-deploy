import { Header } from "./Header";

export const List = ({ persons, handleDelete }) => {
  return (
    <>
      <Header text={"People"} level={"h2"} />

      <ul>
        {persons.map((person, id) => (
          <li key={id}>
            <span>{person.name}</span>
            <span> </span>
            <span>{person.number}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(person.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
