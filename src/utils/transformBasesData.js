/*
LEGACY !!!!!!!!!!!!!!!!! GOVNOKOD DETEKTED
*/

export default function transformBasesData(requestData) {
  const bases = requestData.data;
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
      name: "Base",
      items: bases,
      parentId: "regionId"
    }
  ];

  return hierselData;
}
