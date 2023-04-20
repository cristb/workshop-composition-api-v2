import { isRef, ref, computed, watch } from "vue";
export const useFetch = (url) => {
  const loading = ref(true);
  const data = ref(null);
  const finalUrl = computed(() => isRef(url) ? url.value : url);

  console.log(finalUrl.value);

  function makeRequest() {
    loading.value = true;
    fetch(finalUrl.value).then(async (res) => {
      data.value = await res.json();
      loading.value = false;
    });
  }

  makeRequest();

  watch(finalUrl, makeRequest);
  return { data, loading };
};
