export const Convert_to = (data) => {
  return data.map((elem) => {
    return { value: elem, label: elem };
  });
};

export const Convert_from = (data) => {
  console.log(data);
  return data == null
    ? []
    : data.map((elem) => {
        return elem.value;
      });
};
