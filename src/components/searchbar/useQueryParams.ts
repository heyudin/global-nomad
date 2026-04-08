import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useQueryParams(queryKey: string) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState(searchParams.get(queryKey) ?? "");

  const setQueryString = (nextValue: string) => {
    const params = new URLSearchParams(searchParams);
    const trimmedValue = nextValue.trim();
    if (!trimmedValue) {
      params.delete("search");
    } else {
      params.set("search", trimmedValue);
    }
    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return { value, setValue, setQueryString };
}
