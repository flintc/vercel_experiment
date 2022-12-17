import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BrowseMovies } from "../../features/browse-movies";
import {
  ResultsComponent,
  SearchMulti,
} from "../../features/search-multi/search-multi";

const ResultsComponentFoo: ResultsComponent = ({ searchMultiQuery }) => {
  if (searchMultiQuery.isInitialLoading) {
    return <div>Loading...</div>;
  }
  const results = searchMultiQuery?.data?.pages.map((x) => x.results).flat();
  return (
    <ul className="space-y-2 max-w-lg m-auto mt-4">
      {results?.map((result) => {
        return (
          <li
            className="rounded p-10 bg-indigo-800 text-white"
            key={result?.id}
          >
            {result?.media_type === "movie"
              ? result.title
              : result?.media_type === "tv"
              ? result.name
              : result?.media_type === "person"
              ? result.name
              : result}
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
  const router = useRouter();
  console.log("movie index", router.query);
  const [state, setState] = useRouterState({});
  // if (router.query.id) {
  //   return (
  //     <motion.div
  //       layout
  //       layoutId={`movie_${router.query.id}`}
  //       className="p-10 bg-green-800 rounded fixed left-0 top-0"
  //     >
  //       {/* {query?.data?.title} */}
  //       blah
  //     </motion.div>
  //   );
  // }
  return (
    <div>
      <SearchMulti
        state={state}
        setState={setState}
        resultsComponent={ResultsComponentFoo}
      />
      {/* {state.search === undefined && <BrowseMovies />} */}

      {state.search === undefined && (
        <>
          {router.query.id && (
            <div
              // layout
              // layoutId={`movie_${router.query.id}`}
              className="p-10 bg-green-800 rounded fixed left-0 top-0"
            >
              {/* {query?.data?.title} */}
              blah
              <button
                onClick={() => {
                  router.back();
                }}
              >
                go back
              </button>
            </div>
          )}
          <BrowseMovies />
        </>
      )}
    </div>
  );
}

// export default withApollo()(Home);
export default Home;
