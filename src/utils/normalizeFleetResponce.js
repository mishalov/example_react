import AssetUtils from "./AssetUtils";

export default function normalizeFleetResponse(responseBody) {
  try {
    let fleet = responseBody;
    fleet.assignedAssets = fleet.assignedAssets.map(x =>
      AssetUtils.parseResponse(x)
    );

    // Group and sort Assets by Asset Type
    // All met types
    let types = [];
    let groups = {};

    // Group assigned assets by AssetType
    fleet.assignedAssets.forEach(cur => {
      var typeId = cur.assetType.typeId;
      if (!groups[typeId]) {
        groups[typeId] = {
          assetType: cur.assetType,
          assignedAssets: [],
          numberAssetsRequired: 0
        };
        types.push(cur.assetType);
      }
      groups[typeId].assignedAssets.push(cur);
    });

    // Set requirements
    fleet.requirements.forEach(req => {
      var typeId = req.assetType.typeId;
      if (!groups[typeId]) {
        groups[typeId] = {
          assetType: req.assetType,
          assignedAssets: [],
          numberAssetsRequired: 0
        };
        types.push(req.assetType);
      }
      groups[typeId].numberAssetsRequired = req.numberAssetsRequired;
    });

    let pl = fleet.productLine;

    // Sort Asset Types
    let sortedTypes = types.sort((a, b) => {
      let pla = a.subSegmentMappings.filter(map => {
        return map.productLine === pl;
      });
      let plb = b.subSegmentMappings.filter(map => {
        return map.productLine === pl;
      });

      // Only one assigned to Fleet's Product Line
      let plOrder = plb.length - pla.length;
      if (plOrder !== 0) return plOrder;

      // Both assigned to Fleet's Product Line
      if (pla.length > 0) return pla[0].order - plb[0].order;

      // None assigned to Fleet's Product Line
      pla = a.subSegmentMappings.filter(map => {
        return map.productLine !== pl;
      });

      plb = a.subSegmentMappings.filter(map => {
        return map.productLine !== pl;
      });

      // !!! Only two Product Lines
      return plb[0].order - pla[0].order;
    });

    // let sortedGroups = sortedTypes.map(type => groups[type.typeId]);

    delete fleet.assignedAssets;

    fleet.groupsOrder = sortedTypes.map(type => type.typeId);
    fleet.assetTypeGroups = groups;
    // fleet.assetTypeGroups = sortedGroups.reduce((map, group) => {
    //    map[group.assetType.typeId] = group;
    //    return map;
    // }, {});
    return fleet;
  } catch (e) {}
}
