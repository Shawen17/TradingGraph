export function fit(val, arr) {
  const b = arr.filter((item) => item.login === val);

  return { raw: b };
}

export function extractData(filtered, type) {
  let e, b, t, user;
  e = [];
  b = [];
  t = [];

  filtered.forEach((item) => {
    e.push(+item.equity);
    b.push(+item.balance);
    t.push(new Date(item.time));
    user = item.login;
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
  return { user, data };
}

export function Gen(min = 60, max = 190) {
  return Math.floor(Math.random() * (max - min)) + min;
}
