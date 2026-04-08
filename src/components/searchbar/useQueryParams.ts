import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useQueryParams(queryKey: string) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { push } = useRouter();
  const [value, setValue] = useState(searchParams.get(queryKey) ?? "");

  useEffect(() => {
    const currentValue = searchParams.get(queryKey) ?? "";
    setValue(currentValue);
  }, [searchParams, queryKey]);

  const setQueryString = (nextValue: string) => {
    const params = new URLSearchParams(searchParams);
    const trimmedValue = nextValue.trim();
    if (!trimmedValue) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, trimmedValue);
    }
    push(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return { value, setValue, setQueryString };
}
