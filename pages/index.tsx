import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../entities/user/useUser";
import { BrowseMovies } from "../features/browse-movies";
import {
  ResultsComponent,
  SearchMulti,
} from "../features/search-multi/search-multi";

const ResultsComponentFoo: ResultsComponent = ({ searchMultiQuery }) => {
  if (searchMultiQuery.isInitialLoading) {
    return <div>Loading...</div>;
  }
  const results = searchMultiQuery?.data?.pages.map((x) => x.results).flat();
  return (
    <ul className="max-w-lg m-auto mt-4 space-y-2">
      {results?.map((result) => {
        console.log("result", result);
        return (
          <li
            className="p-10 text-white bg-indigo-800 rounded"
            key={result?.id}
          >
            {result?.mediaType === "movie"
              ? result.title
              : result?.mediaType === "tv"
              ? result.name
              : result?.mediaType === "person"
              ? result.name
              : "foo"}
          </li>
        );
      })}
    </ul>
  );
};

const useRouterState = () => {
  const router = useRouter();
  const set = (value: Partial<{ search?: string }>) => {
    router.replace(
      {
        query: value,
      },
      undefined,
      { shallow: true }
    );
  };
  return [router.query, set] as [Partial<{ search?: string }>, any];
};

function Home() {
  const [state, setState] = useRouterState();
  const user = useUser();
  return (
    <div>
      <button
        onClick={() => {
          console.log("user.data selectQuestion", user.data);
          // if (user.data?.room) {
          //   fetch(`/api/selectQuestion/?roomId=${user.data.room.id}`);
          // }
          fetch(`/api/selectQuestion/?roomId=AAA`);
        }}
      >
        Test
      </button>
      <button
        onClick={() => {
          console.log("user.data", user.data);
          if (user.data) {
            fetch(`/api/createRoom/?userId=${user.data.id}`);
          }
        }}
      >
        Create Room
      </button>
      <SearchMulti
        state={state}
        setState={setState}
        resultsComponent={ResultsComponentFoo}
      />
      {state.search === undefined && <BrowseMovies />}
    </div>
  );
}

export default Home;
