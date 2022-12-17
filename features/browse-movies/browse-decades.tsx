import Link from "next/link";

const decades = [
  {
    title: "The 1960s",
    years: ["1960", "1969"],
    // className: "from-teal-9 to-brown-9",
  },
  {
    title: "The 1970s",
    years: ["1970", "1979"],
    // className: "from-grass-9 to-red-9",
  },
  {
    title: "The 1980s",
    years: ["1980", "1989"],
    // className: "from-tomato-9 to-plum-9",
  },
  {
    title: "The 1990s",
    years: ["1990", "1999"],
    // className: "from-crimson-9 to-violet-9",
  },
  {
    title: "The 2000s",
    years: ["2000", "2009"],
    // className: "from-plum-9 to-blue-9",
  },
  {
    title: "The 2010s",
    years: ["2010", "2019"],
    // className: "from-violet-9 to-teal-9",
  },
  {
    title: "The 2020s",
    years: ["2020", "2029"],
    // className: "from-blue-9 to-grass-9",
  },
];

export const BrowseDecades = () => {
  return (
    <>
      {decades.map((decade) => {
        return (
          <Link
            legacyBehavior
            key={decade.title}
            href={{
              query: {
                withReleaseType: 3, // 3 = release
                primaryReleaseDateGte: `${decade.years[0]}-01-01`,
                primaryReleaseDateLte: `${decade.years[1]}-12-31`,
              },
            }}
          >
            <a
              className={`w-32 h-32 text-white shadow-md rounded-lg flex justify-start p-2 items-end text-3xl  bg-gradient-to-br`}
            >
              {decade.title}
            </a>
          </Link>
        );
      })}
    </>
  );
};
