export function fit(val, arr) {
  const b = arr.filter((item) => item.login === val);

  return { raw: b };
}

export function Gen(min = 60, max = 190) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function Data(filtered, type) {
  let e, b, t;
  e = [];
  b = [];
  t = [];

  filtered.forEach((item) => {
    e.push(+item.equity);
    b.push(+item.balance);
    t.push(new Date(item.time));
  });

  const data = [
    {
      x: t,
      y: e,
      type: type,
      name: "equity",
      mode: "lines",
    },
    {
      type: type,
      x: t,
      y: b,
      name: "balance",
      mode: "lines",
    },
  ];
  return data;
}
