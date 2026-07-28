export type ActiveIdType = 0 | 1 | 2;
export const key = "active-catogory-todo-vue" as string;

export const getInitialActiveId = (): ActiveIdType => {
  const val = localStorage.getItem(key);
  if (val && val !== null) {
    const num = Number.parseInt(val[val.length - 1] as string);
    if ([0, 1, 2].includes(num)) {
      return num as ActiveIdType;
    }
  }

  return 0;
};
