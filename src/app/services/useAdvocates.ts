import { useEffect, useMemo, useState } from "react";
import { IAdvocate } from "../types/IAdvocate";

interface Params {
  query: string; // search query
  page: number; // page number (1-based)
  perPage: number; // items per page
  // sort: string; // field to sort by
  // dir: "asc" | "desc"; // sort direction
}

export const useAdvocates = (params: Params) => {
  const [data, setData] = useState<IAdvocate[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only fire when debounced/normalized params change
  const normalized = useMemo(
    () => ({
      q: params.query.trim(),
      page: Math.max(1, params.page),
      perPage: Math.max(5, params.perPage),
      // sort: params.sort,
      // dir: params.dir,
    }),
    [params.page, params.perPage, params.query]
  );

  useEffect(() => {
    const { q, page, perPage } = normalized;
    const search = new URLSearchParams({
      q,
      page: String(page),
      perPage: String(perPage),
    });

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/advocates?${search.toString()}`);
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = await res.json();

        setData(json.data ?? []);
        setTotal(json.total ?? 0);
      } catch (e: any) {
        setError("Failed to load advocates.");
      } finally {
        setLoading(false);
      }
    })();
  }, [normalized]);

  return { data, total, loading, error };
};
