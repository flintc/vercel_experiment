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
    <ul className="max-w-lg m-auto mt-4 space-y-2">
      {results?.map((result) => {
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
  const [state, setState] = useRouterState();
  // if (router.query.id) {
  //   return (
  //     <motion.div
  //       layout
  //       layoutId={`movie_${router.query.id}`}
  //       className="fixed top-0 left-0 p-10 bg-green-800 rounded"
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
              className="fixed top-0 left-0 p-10 bg-green-800 rounded"
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
