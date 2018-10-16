export default function makeProjectHierarchy(root) {
  console.log("base input", root);
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
              .map(loc => ({
                ...loc,
                label: loc.name,
                value: loc.id,
                key: loc.id,
                children: root[4].items
                  .map(proj => ({
                    ...proj,
                    label: proj.name + ` (${proj.accountingUnit})`,
                    value: proj.id,
                    key: proj.id
                  }))
                  .filter(proj => proj.locationId === loc.id)
              }))
              .filter(loc => loc.regionId === reg.id)
          }))
          .filter(reg => reg.subGeomarketId === sub.id)
      }))
      .filter(sub => sub.geomarketId === geo.id)
  }));
  return output;
}
