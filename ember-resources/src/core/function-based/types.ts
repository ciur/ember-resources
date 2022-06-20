export const INTERMEDIATE_VALUE = '__Intermediate_Value__';
export const INTERNAL = '__INTERNAL__';

/**
 * Secret args to allow `resource` to be used without
 * a decorator
 */
export interface InternalIntermediate<Value> {
  [INTERNAL]: true;
  [INTERMEDIATE_VALUE]: ResourceFunction<Value>;
}

export type Hooks = {
  on: {
    /**
     * Optionally a function-resource can provide a cleanup function.
     *
     *
     *  Example:
     *  ```js
     *  import { resource } from 'ember-resources/util/function-resource';
     *  import { TrackedObject } from 'tracked-built-ins';
     *
     *  const load = resource(({ on }) => {
     *    let state = new TrackedObject({});
     *    let controller = new AbortController();
     *
     *    on.cleanup(() => controller.abort());
     *
     *    fetch(this.url, { signal: controller.signal })
     *      // ...
     *
     *    return state;
     *  })
     */
    cleanup: (destroyer: Destructor) => void;
  };
};

/**
 * Type of the callback passed to `resource`
 */
export type ResourceFunction<Value = unknown> = (hooks: Hooks) => Value | (() => Value);

/**
 * The perceived return value of `resource`
 * This is a lie to TypeScript, because the effective value of
 * of the resource is the result of the collapsed functions
 * passed to `resource`
 */
export type ResourceFn<Value = unknown> = (hooks: Hooks) => Value;

export type Destructor = () => void;
export type Cache = object;
