# Clog D

[![deno](https://img.shields.io/badge/Deno-≥1.14-blue?style=for-the-badge)](https://deno.land/)
![license](https://img.shields.io/github/license/5310/clogd?style=for-the-badge)
![code-size](https://img.shields.io/github/languages/code-size/5310/clogd?style=for-the-badge)

Felt like making a CLI internet connectivity visualizer in **Deno**.

Unfortunately, Deno can't do ICMP, so I can't really _ping_ anything. And I didn't want to bother with calling the system level Ping this time (I have [Clog C](https://github.com/5310/clogc) for that), so this just uses [deno.land/x/online](https://deno.land/x/online) which just polls Apple's much abused captive portal detector.

But it's good enough for me. I don't really need ping latency visualization or anything, just a quick at-a-glance readable yes-or-no ticker.

Usage:
```sh
  clogd [--period=PERIOD] [--timestamp=TIMESTAMP]
```

- `PERIOD`: Seconds between ping attempts
- `TIMESTAMP`: Seconds between timestamps