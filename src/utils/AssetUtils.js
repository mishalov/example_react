/****************************** ЗА КОД НИЖЕ НЕ ОТВЕЧАЮ. ЖЕСТОЧАЙШЕЕ ЛЕГАСИ */

export default {
  //   MovementStage: {
  //     AT_FIELD_OR_IDLE: 0,
  //     IN_TRANSIT_TO_SHOP: 1,
  //     IN_SHOP: 2,
  //     MAINTENANCE_COMPLETE: 3,
  //     IN_TRANSIT_TO_FIELD: 4
  //   },

  //   // DOM node - warning icon for empty value
  //   getWarning: function(value) {
  //     if (value != null) return null;
  //     var icon = $('<span class="fa fa-warning text-warning"></span>').attr(
  //       "title",
  //       "Missing value"
  //     );

  //     return icon.get(0);
  //   },

  //   // Used
  //   buildWarningIcon: function(warning) {
  //     var icon = $('<span class="fa fa-warning text-warning"></span>');
  //     if (!warning) return null;

  //     if (typeof warning === "string") {
  //       icon.attr("title", warning);
  //       return icon.get(0);
  //     }
  //     if (typeof warning === "object") {
  //       if (warning instanceof Array) {
  //         icon.tooltipList({ items: warning });
  //       } else {
  //         var keys = Object.keys(warning);
  //         if (keys.length === 0) return null;

  //         var messages = keys.map(function(key) {
  //           return warning[key];
  //         });
  //         icon.tooltipList({ items: messages });
  //       }
  //       return icon.get(0);
  //     }
  //   },

  //   // Used
  //   getWarnings: function(asset) {
  //     var warnings = {};
  //     if (!asset.maximoTag) {
  //       warnings.maximoTag = "Maximo Tag is missing";
  //     }
  //     if (!asset.maximoStatus) {
  //       warnings.maximoStatus = "Maximo Status is missing";
  //     }
  //     if (!asset.stem2) {
  //       warnings.stem2 = "Stem II is missing";
  //     }
  //     if (!asset.stem3) {
  //       warnings.stem3 = "Stem III is missing";
  //     }

  //     if (!asset.currentLocation) {
  //       warnings.currentLocation = "Current Location is missing";
  //     }
  //     if (!asset.assignedLocation) {
  //       warnings.assignedLocation = "Assigned Location is missing";
  //     }

  //     function daysBetween(date1, date2) {
  //       var timeDiff = date1.getTime() - date2.getTime();
  //       return Math.ceil(timeDiff / (1000 * 3600 * 24));
  //     }

  //     if (daysBetween(new Date(asset.stem2), new Date()) > 183) {
  //       warnings.stem2 = "Stem II is potentially invalid";
  //     }
  //     if (daysBetween(new Date(asset.stem3), new Date()) > 365) {
  //       warnings.stem3 = "Stem III is potentially invalid";
  //     }

  //     if (
  //       asset.assignedFleet &&
  //       asset.maximoStatus &&
  //       asset.maximoStatus !== "ACTIVE"
  //     ) {
  //       warnings.maximoStatus = "Status is " + asset.maximoStatus;
  //     }
  //     return warnings;
  //   },

  //   tagToClass: function(tag) {
  //     var suffix;
  //     switch (tag) {
  //       case "R":
  //         suffix = "red";
  //         break;
  //       case "G":
  //         suffix = "green";
  //         break;
  //       case "Y":
  //         suffix = "yellow";
  //         break;
  //     }
  //     if (!suffix) return "";
  //     return "asset-tag-" + suffix;
  //   },

  //   // DOM node - tag icon
  //   tagToIcon: function(tag, addTitle) {
  //     var tagClass = AssetUtils.tagToClass(tag);
  //     var icon = $('<div class="tag-icon"></div>').addClass(tagClass);

  //     if (addTitle === true) {
  //       icon.attr("title", tagClass.substring(10));
  //     }

  //     return icon.get(0);
  //   },

  //   // Calculate Asset's overall tag
  //   overallTag: function(args) {
  //     function tagToInt(tag) {
  //       switch (tag) {
  //         case "R":
  //           return 1000;
  //         case "Y":
  //           return 100;
  //         case "G":
  //           return 10;
  //         case undefined:
  //           return 1;
  //         case null:
  //           return 1;
  //       }
  //     }
  //     function intToTag(intValue) {
  //       switch (intValue) {
  //         case 1:
  //           return undefined;
  //         case 10:
  //           return "G";
  //         case 100:
  //           return "Y";
  //         case 1000:
  //           return "R";
  //       }
  //     }

  //     var tagsList;

  //     if (arguments.length === 0) {
  //       return null;
  //     }
  //     if (arguments.length === 1 && args.tags) {
  //       var tempArgs = [];
  //       for (var prop in args.tags) {
  //         tempArgs.push(args.tags[prop]);
  //       }
  //       tagsList = tempArgs;
  //     } else {
  //       tagsList = Array.prototype.slice.call(arguments);
  //     }

  //     var intTags = tagsList.map(function(item) {
  //       return tagToInt(item);
  //     });

  //     var overallTagInt = Math.max.apply(null, intTags);
  //     return intToTag(overallTagInt);
  //   },

  //   // DOM node - movement stage icon
  //   movementStageToIcon: function(stage, addTitle) {
  //     var giSuffix = "";
  //     var textClass = "";
  //     var tooltip = "";

  //     switch (stage) {
  //       case AssetUtils.MovementStage.AT_LOCATION:
  //         giSuffix = "flag";
  //         textClass = "text-success";
  //         tooltip = "At Location";
  //         break;
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_SHOP:
  //         giSuffix = "transfer";
  //         textClass = "text-danger";
  //         tooltip = "In transit to Shop";
  //         break;
  //       case AssetUtils.MovementStage.IN_SHOP:
  //         giSuffix = "wrench";
  //         textClass = "text-danger";
  //         tooltip = "In Shop";
  //         break;
  //       case AssetUtils.MovementStage.MAINTENANCE_COMPLETE:
  //         giSuffix = "wrench";
  //         textClass = "text-success";
  //         tooltip = "Ready to go";
  //         break;
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_FIELD:
  //         giSuffix = "transfer";
  //         textClass = "text-success";
  //         tooltip = "In transit to Field";
  //         break;
  //     }

  //     var icon = $('<span class="glyphicon"></span>')
  //       .addClass("glyphicon-" + giSuffix)
  //       .addClass(textClass);

  //     if (addTitle) {
  //       icon.attr("title", tooltip);
  //     }

  //     return icon.get(0);
  //   },

  //   // Used
  //   movementStageToClasses: function(stage) {
  //     let iconClass;
  //     let actionText, stageText;

  //     switch (stage) {
  //       case AssetUtils.MovementStage.AT_FIELD_OR_IDLE:
  //         iconClass = "fa fa-flag text-success";
  //         stageText = "At Field / Idle";
  //         actionText = "Arrive at Field";
  //         break;
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_SHOP:
  //         iconClass = "fa fa-exchange text-danger";
  //         stageText = "In transit to Shop";
  //         actionText = "Send to Shop";
  //         break;
  //       case AssetUtils.MovementStage.IN_SHOP:
  //         iconClass = "fa fa-wrench text-danger";
  //         stageText = "In Shop";
  //         actionText = "[TLM] Accept";
  //         break;
  //       case AssetUtils.MovementStage.MAINTENANCE_COMPLETE:
  //         iconClass = "fa fa-wrench text-success";
  //         stageText = "Ready to go";
  //         actionText = "[TLM] Work Complete";
  //         break;
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_FIELD:
  //         iconClass = "fa fa-exchange text-success";
  //         stageText = "In transit to Field";
  //         actionText = "Send to Field";
  //         break;
  //     }

  //     return {
  //       iconClass: iconClass,
  //       actionText: actionText,
  //       stageText: stageText
  //     };
  //   },

  //   // Action text for movement stage
  //   movementStageToText: function(stage) {
  //     switch (stage) {
  //       case AssetUtils.MovementStage.AT_LOCATION:
  //         return "Arrive at Location";
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_SHOP:
  //         return "Send to Shop";
  //       case AssetUtils.MovementStage.IN_SHOP:
  //         return "[TLM] Accept";
  //       case AssetUtils.MovementStage.MAINTENANCE_COMPLETE:
  //         return "[TLM] Work complete";
  //       case AssetUtils.MovementStage.IN_TRANSIT_TO_FIELD:
  //         return "Send to Field";
  //     }
  //   },

  //   // next movement stage
  //   // Used
  //   nextMovementStage: function(stage) {
  //     if (stage === AssetUtils.MovementStage.IN_TRANSIT_TO_FIELD) {
  //       return 0;
  //     }
  //     return stage + 1;
  //   },

  //   // Asset Comments
  //   buildAssetCommentsControl: function(asset, textareaClass) {
  //     var $tarea = $("<textarea></textarea>")
  //       .css("height", "100px")
  //       .css("min-height", "100px")
  //       .css("min-width", "100%");

  //     if (textareaClass) $tarea.addClass(textareaClass);

  //     var assetId = asset.assetId;

  //     // Wrapper
  //     var wrp = $tarea
  //       .wrap("<div></div>")
  //       .parent()
  //       .css("position", "relative");

  //     $tarea.val(asset.comments);

  //     var saveBtn = $(
  //       '<button type="button" class="btn btn-success btn-sm"></button>'
  //     )
  //       .append('<span class="glyphicon glyphicon-ok"></span>')
  //       .click(function() {
  //         var data = {
  //           assetId: assetId,
  //           comments: $tarea.val()
  //         };

  //         TOPapi.updateAssetComments(data, function(response) {
  //           if (response.status === "ok") {
  //             asset.comments = data.comments;
  //             showFeedbackPopup({
  //               message: "<b>Comments updated</b>",
  //               alertClass: "alert-success"
  //             });
  //             removeButtons();
  //           }
  //         });
  //       });

  //     // Reset
  //     var resetBtn = $(
  //       '<button type="button" class="btn btn-danger btn-sm"></button>'
  //     )
  //       .append('<span class="glyphicon glyphicon-remove"></span>')
  //       .click(function() {
  //         $tarea.val(asset.comments);
  //         removeButtons();
  //       });

  //     var refreshBtn = $(
  //       '<button type="button" class="btn btn-primary btn-sm"></button>'
  //     )
  //       .append('<span class="glyphicon glyphicon-refresh"></span>')
  //       .click(function() {
  //         TOPapi.getAssetComments(assetId, function(response) {
  //           if (response.status === "ok") {
  //             showFeedbackPopup({
  //               message: "<b>Comments updated</b>",
  //               alertClass: "alert-info"
  //             });
  //             asset.comments = response.comments;
  //             $tarea.val(asset.comments);
  //             removeButtons();
  //           }
  //         });
  //       });

  //     var toolbar = $('<div class="btn-toolbar"></div>')
  //       .append(refreshBtn)
  //       .css({
  //         position: "absolute",
  //         right: "10px",
  //         bottom: "10px"
  //       });

  //     $tarea.on("input", function() {
  //       var value = $tarea.val();
  //       if (asset.comments !== value) {
  //         toolbar.prepend(saveBtn, resetBtn);
  //       } else {
  //         removeButtons();
  //       }
  //     });

  //     $tarea.resize(function() {
  //       console.log("resize");
  //     });

  //     // Remove Save and Reset buttons
  //     function removeButtons() {
  //       setTimeout(function() {
  //         saveBtn.detach();
  //         resetBtn.detach();
  //       }, 0);
  //     }

  //     wrp.append(toolbar);

  //     return wrp;
  //   },

  // Preprocess received Asset json
  parseResponse: function(asset) {
    var res = JSON.parse(JSON.stringify(asset));

    // Stem Date objects
    if (asset.stem2) {
      res.stem2 = new Date(asset.stem2);
    }
    if (asset.stem3) {
      res.stem3 = new Date(asset.stem3);
    }

    // Custom attributes
    if (asset.customAttributes || asset.customAttributes.length > 0) {
      var customAttrs = {};
      asset.customAttributes.forEach(attr => {
        let value;
        switch (attr.valueType) {
          case "Number":
            value = parseFloat(attr.value) || 0;
            break;
          case "Text":
            value = attr.value;
            break;
          default:
            value = attr.value;
        }
        customAttrs[attr.attrName] = value;
      });
      res[asset.assetType.typeName] = customAttrs;
    }

    return res;
  }

  // tagToClasses: function(tag) {
  //   let bg;
  //   let text;
  //   let icon;
  //   switch (tag) {
  //     case "R":
  //       bg = "danger";
  //       text = "white";
  //       icon = "red";
  //       break;
  //     case "G":
  //       bg = "success";
  //       text = "white";
  //       icon = "green";
  //       break;
  //     case "Y":
  //       bg = "warning";
  //       text = "dark";
  //       icon = "yellow";
  //       break;
  //     default  :
  //       bg=
  //   }
  //   return {
  //     bg: "bg-" + bg,
  //     text: "text-" + text,
  //     icon: "asset-tag-" + icon
  //   };
  //}
};
