import { useState } from "react";
import MovieRow from "../components/MovieRow";

export default function MyList() {
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  function handleRemove(movie) {
    const updated = myList.filter((current) => current.id !== movie.id);
    setMyList(updated);
    localStorage.setItem("myList", JSON.stringify(updated));
  }

  return (
    <section>
      <MovieRow
        rowName=""
        movies={myList}
        isMyList={true}
        onRemove={handleRemove}
      />
    </section>
  );
}
