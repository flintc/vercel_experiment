import { useDebouncedValue, useDebouncedState } from "@mantine/hooks";
import _ from "lodash";
import {
  SearchMultiData,
  useSearchMultiInfinite,
} from "../../shared/api/useSearchMulti";
import { useInfinteScroll } from "../../shared/useInfiniteScroll";

export const useSearchMultiInput = (state, setState) => {
  const [debounced] = useDebouncedValue(state, 300);
  // const [debounced, setDebounced] = useDebouncedState(state, 300);
  const searchMultiQuery = useSearchMultiInfinite(debounced);
  const { hasNextPage, fetchNextPage } = searchMultiQuery;
  useInfinteScroll<SearchMultiData>({ hasNextPage, fetchNextPage });

  const onCancel = () => {
    setState(_.omit(state, ["search"]));
  };

  const onFocus = () => {
    if (state.search === undefined) {
      setState({ search: "" });
    }
  };

  return {
    searchMultiQuery,
    onCancel,
    showCancelButton: state.search !== undefined,
    inputProps: {
      // trigger a rerender when use clicks cancel
      // key: state.search !== undefined && state.search !== "" ? "foo" : "bar",
      // need to use defaultValue instead of value to prevent
      // cursor jumps when trying to type in the middle of the input
      // defaultValue: state.search || "",

      // ref: (input) =>
      //   input &&
      //   (input.input.selectionStart = input.input.selectionEnd = this.cursor),

      value: state.search || "",
      onChange: (event) => {
        event.preventDefault();
        setState({ search: event.currentTarget.value });
        // setDebounced({ search: event.currentTarget.value });
      },
      onFocus,
    },
  };
};
