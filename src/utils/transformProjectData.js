/*
LEGACY !!!!!!!!!!!!!!!!! GOVNOKOD DETEKTED
*/

export default function transformProjectData(requestData) {
  const projects = requestData.data.filter(x => x.type === "project");
  const locations = requestData.included.filter(x => x.type === "location");
  const regions = requestData.included.filter(x => x.type === "region");
  const subGeomarkets = requestData.included.filter(
    x => x.type === "subgeomarket"
  );
  const geomarkets = requestData.included.filter(x => x.type === "geomarket");

  const hierselData = [
    {
      name: "GeoMarket",
      items: geomarkets
    },
    {
      name: "Sub-GeoMarket",
      items: subGeomarkets,
      parentId: "geomarketId"
    },
    {
      name: "Region",
      items: regions,
      parentId: "subGeomarketId"
    },
    {
      name: "Location",
      items: locations,
      parentId: "regionId"
    },
    {
      name: "Project",
      items: projects,
      parentId: "locationId"
    }
  ];

  return hierselData;
}
