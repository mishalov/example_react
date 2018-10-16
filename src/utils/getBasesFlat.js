export default hierarchy => {
  let proj = [];

  for (let i = 0; i < hierarchy.length; i++) {
    const h0 = hierarchy[i].children;

    for (let j = 0; j < h0.length; j++) {
      const h1 = h0[j].children;

      for (let k = 0; k < h1.length; k++) {
        const h2 = h1[k].children;

        for (let l = 0; l < h2.length; l++) {
          proj.push({ value: h2[l].value, title: h2[l].label });
        }
      }
    }
  }
  return proj;
};
