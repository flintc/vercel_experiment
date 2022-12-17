import { useLayoutEffect, useRef, useState } from "react";

export function useControlledInputCursorRestoration<
  E extends HTMLInputElement
>({ value }: { value?: string }) {
  const [cursor, setCursor] = useState<null | number>(null);
  const ref = useRef<E>(null);

  useLayoutEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(e.target.selectionStart);
  };

  return {
    ref,
    value,
    onChange: handleChange,
  };
}
