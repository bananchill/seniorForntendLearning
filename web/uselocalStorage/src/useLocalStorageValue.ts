import {
  ref,
  shallowRef,
  type Ref,
  watchEffect,
  toValue,
  type MaybeRefOrGetter,
  onBeforeMount,
  onUnmounted,
} from "vue";

type UseLocalStorageValueOptions = {
  syncTabs?: boolean;
};

export function useLocalStorageValue<ValueType>(
  key: MaybeRefOrGetter<string>,
  initialValue: MaybeRefOrGetter<ValueType>,
  options: MaybeRefOrGetter<UseLocalStorageValueOptions> = { syncTabs: false }
): {
  value: Ref<ValueType>;
} {
  const abortController = new AbortController();
  const value = shallowRef(toValue(initialValue));

  onBeforeMount(() => {
    watchEffect(() => {
      const hasValue = window.localStorage.getItem(toValue(key)) !== null;
      if (!hasValue) {
        return;
      }

      const storedValue = JSON.parse(window.localStorage.getItem(toValue(key)));

      if (storedValue.options?.syncTabs) {
        value.value = storedValue.value;
      }

      toValue(options).syncTabs = storedValue.options.syncTabs;
    });

    watchEffect(() => {
      const serializedValue = JSON.stringify({
        value: value.value,
        options: toValue(options),
      });
      // const serializedValue = JSON.stringify(value.value);
      window.localStorage.setItem(toValue(key), serializedValue);
    });

    window.addEventListener(
      "storage",
      (event) => {
        if (event.key === toValue(key)) {
          const storedValue = JSON.parse(event.newValue ?? "null");
          toValue(options).syncTabs = storedValue.options.syncTabs;
          if (toValue(options).syncTabs) {
            value.value = storedValue.value;
          }
        }
      },
      { signal: abortController.signal }
    );
  });

  onUnmounted(() => {
    abortController.abort();
  });

  return { value };
}
