#!/usr/bin/env -S deno run --allow-net

import { parse } from "https://deno.land/std@0.109.0/flags/mod.ts";
import {
  external,
  fromTimer,
  map,
  merge,
  subscribe,
} from "https://deno.land/x/stream_observables@v1.2/mod.ts";
import { isOnline } from "https://deno.land/x/is_online@v0.1.0/mod.ts";
import { colorize } from "https://deno.land/x/ink@1.3/mod.ts";
import { writeAll } from "https://deno.land/std@0.109.0/io/util.ts";

const args = parse(Deno.args);

const period = (args?.period ?? 5) * 1000;
const timestamp = (args?.timestamp ?? 10) * 60 * 1000;

merge(
  // Timestamps
  (() => {
    const { next, observable } = external<string>();
    const dateToTimestamp = (date: Date) => `
    ${date.toTimeString().slice(0, 8)} 
    `;
    const now = new Date();
    next(
      dateToTimestamp(now) + " ".repeat(now.valueOf() % timestamp / (period)),
    );
    setTimeout(() => {
      next(dateToTimestamp(new Date()));
      setInterval(() => next(dateToTimestamp(new Date())), timestamp);
    }, timestamp - (now.valueOf() % timestamp));
    return observable;
  })(),
  // Periodic "pings"
  fromTimer(period)
    .pipeThrough(map(() => isOnline({ timeout: period * 0.9 })))
    .pipeThrough(
      map((status) =>
        status
          ? colorize("<bg-black><white>·</white></bg-black>")
          : colorize("<bg-red><red>X</red></bg-red>")
      ),
    ),
)
  .pipeTo(
    subscribe((status) =>
      writeAll(Deno.stdout, new TextEncoder().encode(status))
    ),
  );
