import { ref, computed } from "vue";

export const useSort = (data, orderBy, desc) => {
  const sorted = computed(() => {
    const cloned = JSON.parse(JSON.stringify(data.value));
    return cloned.sort((a, b) => {
      return desc.value
        ? b[orderBy.value] - a[orderBy.value]
        : a[orderBy.value] - b[orderBy.value];
    });
  });

  return { sorted };
};
