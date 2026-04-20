"use client";

import { useEffect, useState } from "react";
import { FOUNDING_SPOTS_TOTAL } from "@/config";

export type CounterState = {
  total: number;
  remaining: number;
  closed: boolean;
  loading: boolean;
};

type CounterResponse = {
  total: number;
  remaining: number;
  closed: boolean;
};

export function useCounter(): CounterState {
  const [state, setState] = useState<CounterState>({
    total: FOUNDING_SPOTS_TOTAL,
    remaining: FOUNDING_SPOTS_TOTAL,
    closed: false,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/counter", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<CounterResponse>) : null))
      .then((data) => {
        if (cancelled || !data) {
          if (!cancelled) setState((s) => ({ ...s, loading: false }));
          return;
        }
        setState({
          total: data.total,
          remaining: data.remaining,
          closed: data.closed,
          loading: false,
        });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
