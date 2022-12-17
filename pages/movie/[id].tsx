import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function MovieDetails() {
  const router = useRouter();
  const movieId = router.query.id as string | undefined;
  // const query = useQuery(["movie", movieId], {
  //   enabled: movieId !== undefined,
  // });
  console.log("movie details", movieId);
  return (
    <div className="h-[1000px] bg-blue-900">
      <div
        // layout
        // layoutId={`movie_${movieId}`}

        className="p-10 bg-green-800 rounded"
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
    </div>
  );
}
