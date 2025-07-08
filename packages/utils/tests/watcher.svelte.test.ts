import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import { Watcher } from "../src/lib/watcher/watcher.svelte.ts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Watcher", () => {
  it("calling set should not call onupdate", () => {
    // delay finishing the test until every expect is called
    const { promise, resolve } = Promise.withResolvers<"ok">();

    $effect.root(() => {
      const onupdate = vi.fn();
      let value = $state("foo");
      const watcher = new Watcher(
        () => value,
        (v) => {
          value = v;
        },
      );
      watcher.onupdate = onupdate;

      // calling `set` should not call onupdate
      watcher.set("bar");
      watcher.set("qux");
      expect(value).toBe("qux");
      tick().then(async () => {
        await sleep(50);
        expect(onupdate).not.toHaveBeenCalled();
        resolve("ok");
      });
    });

    return promise.then((val) => {
      expect(val).toBe("ok");
    });
  });

  it("external change should call onupdate", () => {
    // delay finishing the test until every expect is called
    const { promise, resolve } = Promise.withResolvers<"ok">();

    $effect.root(() => {
      const onupdate = vi.fn();
      let value = $state("foo");
      const watcher = new Watcher(
        () => value,
        (v) => {
          value = v;
        },
      );
      watcher.onupdate = onupdate;

      // external change should call onupdate
      value = "baz";
      tick().then(async () => {
        await sleep(50);
        expect(value).toBe("baz");
        expect(onupdate).toHaveBeenCalledWith("baz");
        resolve("ok");
      });
    });

    return promise.then((val) => {
      expect(val).toBe("ok");
    });
  });
});
