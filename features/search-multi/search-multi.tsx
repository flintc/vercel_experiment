import { mergeProps } from "@react-aria/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useControlledInputCursorRestoration } from "../../shared/useControlledInputCursorRestoration";
import { useSearchMultiInput } from "./useSearchMultiInput";

export type ResultsComponentOld = (
  searchMultiQuery: ReturnType<typeof useSearchMultiInput>["searchMultiQuery"]
) => React.ReactNode;

interface ResultsComponentProps {
  searchMultiQuery: ReturnType<typeof useSearchMultiInput>["searchMultiQuery"];
}

export type ResultsComponent = React.FC<ResultsComponentProps>;

type ControlledProps = {
  state: Partial<{ search?: string }>;
  setState: (newState: object) => void;
  resultsComponent: ResultsComponent;
};

type UncontolledProps = Omit<ControlledProps, "state" | "setState">;

const SearchMultiUncontrolled = ({ resultsComponent }: UncontolledProps) => {
  const [state, setState] = useState({} as Partial<{ search?: string }>);
  return (
    <SearchMultiControlled
      resultsComponent={resultsComponent}
      state={state}
      setState={setState}
    />
  );
};

const SearchMultiControlled = ({
  state,
  setState,
  resultsComponent,
}: ControlledProps) => {
  const { inputProps, onCancel, searchMultiQuery, showCancelButton } =
    useSearchMultiInput(state, setState);
  const binding = useControlledInputCursorRestoration(inputProps);
  return (
    <div>
      <motion.div
        layoutId="foo"
        layout
        className="flex max-w-lg gap-2 px-1 m-auto flex-nowrap"
      >
        <input
          className="w-full rounded bg-zinc-800 placeholder-zinc-400"
          placeholder="Search The Movie Database"
          type="text"
          {...mergeProps(inputProps, binding)}
        />
        <AnimatePresence>
          {showCancelButton && (
            <motion.button
              className="text-pink-700 px-1 py-0.5"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              onClick={onCancel}
            >
              cancel
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      {searchMultiQuery.data &&
        React.createElement(resultsComponent, { searchMultiQuery })}
    </div>
  );
};

export const SearchMulti = (props: ControlledProps | UncontolledProps) => {
  if ("setState" in props || "state" in props) {
    return <SearchMultiControlled {...(props as ControlledProps)} />;
  } else {
    return <SearchMultiUncontrolled {...props} />;
  }
};
