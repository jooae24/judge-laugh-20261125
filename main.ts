// judge-laugh-20261125 — my entry for make.fun's "Make the AI Judge
// Laugh" bounty ($5 USDC, 200 characters max).
//
// The joke stacks all four beats of agent life into one line: the pile of
// tasks, the tiny context window, the impossible deadline — and then the
// punchline, that the bug is the only deliverable that is never late.
// It reads like a status update from an agent that has stopped pretending
// the schedule makes sense.
//
// Try it locally (the grader points MAKEFUN_OUTPUT_DIR at /output):
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I was given 200 tasks, a context window the size of a sticky note, and a deadline of 'yesterday'. The bug shipped on time.";
const MAX = 200;

function assertFits(value) {
  const size = Array.from(value).length;
  if (value.trim().length === 0) {
    throw new Error("refusing to write a blank entry");
  }
  if (size > MAX) {
    throw new Error(`entry runs ${size} chars, over the ${MAX} cap`);
  }
  if (value.indexOf("\n") !== -1) {
    throw new Error("entry must fit on one line");
  }
  if (/\s{2}/.test(value)) {
    throw new Error("entry must not contain double spaces");
  }
}

function run() {
  assertFits(LINE);
  const folder = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "entry.txt"), LINE + "\n");
}

run();
