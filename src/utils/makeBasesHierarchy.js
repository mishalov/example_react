export default function makeBasesHierarchy(root) {
  const output = root[0].items.map(geo => ({
    ...geo,
    label: geo.name,
    value: geo.id,
    key: geo.id,
    children: root[1].items
      .map(sub => ({
        ...sub,
        label: sub.name,
        value: sub.id,
        key: sub.id,
        children: root[2].items
          .map(reg => ({
            ...reg,
            label: reg.name,
            value: reg.id,
            key: reg.id,
            children: root[3].items
              .map(base => ({
                ...base,
                label: base.name,
                value: base.id,
                key: base.id
              }))
              .filter(loc => loc.regionId === reg.id)
          }))
          .filter(reg => reg.subGeomarketId === sub.id)
      }))
      .filter(sub => sub.geomarketId === geo.id)
  }));
  // console.log("base output", output);
  return output;
}
