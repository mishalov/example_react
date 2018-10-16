export default (hierarchy, id) => {
  if (!id) return [];
  let proj = [];

  for (let i = 0; i < hierarchy.length; i++) {
    const h0 = hierarchy[i].children;

    for (let j = 0; j < h0.length; j++) {
      const h1 = h0[j].children;

      for (let k = 0; k < h1.length; k++) {
        const h2 = h1[k].children;

        for (let l = 0; l < h2.length; l++) {
          if (h2[l].value === id) {
            proj.push(h2[l].value);
            break;
          }
        }
        if (proj.length === 1) {
          proj.push(h1[k].value);
          break;
        }
      }
      if (proj.length === 2) {
        proj.push(h0[j].value);
        break;
      }
    }
    if (proj.length === 3) {
      proj.push(hierarchy[i].value);
      break;
    }
  }
  proj.reverse();
  return proj;
};
