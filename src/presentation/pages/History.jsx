import MovieRow from "../components/MovieRow";

export default function MyList() {
  const saved = localStorage.getItem("watched");
  const historyList = saved ? JSON.parse(saved) : [];

  return (
    <section>
      <MovieRow rowName="" movies={historyList} isHistory={true} />
    </section>
  );
}
