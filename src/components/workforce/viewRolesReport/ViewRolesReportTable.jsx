import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-fresh.css";

const makeCountRoles = arr => {
  let obj = {};
  arr.forEach(el => {
    obj[el.personRoleId] = el.vacantPositionsCount;
  });
  return obj;
};
class ViewRolesReportTable extends React.Component {
  state = {
    gridOptions: {
      getRowStyle: params => {
        if (params.node.rowPinned) {
          return { "font-weight": "bold" };
        }
      }
    },
    pinnedTopRowData: createTotal(1, "Top")
  };
  render() {
    const { roles, fleets, demand } = this.props;

    const WPSCols = roles
      .filter(el => el.roleGroup === "WPS")
      .map((el, ind) => ({
        headerName: el.roleName,
        field: el.roleId.toString(),
        headerTooltip: el.roleName,
        headerClass: " ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: " ag-cell-hover-highlight",
        width: 25
      }));

    WPSCols[WPSCols.length - 1].cellClass += " ag-cell-border-right-black";

    const WISCols = roles
      .filter(el => el.roleGroup === "WIS")
      .map((el, ind) => ({
        headerName: el.roleName,
        field: el.roleId.toString(),
        headerTooltip: el.roleName,
        headerClass: " ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: " ag-cell-hover-highlight",
        width: 25
      }));

    WISCols[WISCols.length - 1].cellClass += " ag-cell-border-right-black";

    const SHAREDCols = roles
      .filter(el => el.roleGroup === "Shared")
      .map((el, ind) => ({
        headerName: el.roleName,
        field: el.roleId.toString(),
        headerTooltip: el.roleName,
        headerClass: " ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: " ag-cell-hover-highlight",
        width: 25
      }));

    SHAREDCols[SHAREDCols.length - 1].cellClass +=
      " ag-cell-border-right-black";

    const fleetsToTable = demand.map(el => ({
      fleetId: el.fleetId,
      ...makeCountRoles(el.roles),
      fleetName: fleets.find(fleet => fleet.id === el.fleetId.toString()).name
    }));


    const columnDefs = [
      {
        headerName: "Fleet",
        field: "fleetName",
        cellClass: ".ag-cell-border-right-black locked-col",
        pinned: "left",
        lockPosition: true,
        suppressSorting: true
      },
      {
        headerName: "Roles",
        children: [
          {
            headerName: "Total",
            headerClass:
              "ag-header-cell-vertical ag-header-cell-hover-highlight",
            cellClass: "ag-cell-hover-highlight ag-cell-border-right-black",
            width: 40
          },
          {
            headerName: "WPS",
            headerClass: "ag-header-cell-hover-highlight",
            cellClass: "ag-cell-hover-highlight ag-cell-border-right-black",
            width: 100,
            children: WPSCols
          },
          {
            headerName: "WIS",
            headerClass: "ag-header-cell-hover-highlight",
            cellClass: "ag-cell-hover-highlight ag-cell-border-right-black",
            width: 100,
            children: WISCols
          },
          {
            headerName: "Shared",
            headerClass: "ag-header-cell-hover-highlight",
            cellClass: "ag-cell-hover-highlight ag-cell-border-right-black",
            width: 100,
            children: SHAREDCols
          }
        ]
      }
    ];

    return (
      <div
        className="ag-theme-fresh"
        style={{
          height: "700px",
          width: "100%"
        }}
      >
        <AgGridReact
          groupHeaderHeight="25"
          headerHeight="150"
          gridOptions={this.state.gridOptions}
          columnDefs={columnDefs}
          rowData={fleetsToTable}
          autoSizePadding
          suppressAutoSize
          pinnedTopRowData={this.state.pinnedTopRowData}
        />
      </div>
    );
  }
}
const createTotal = () => {
  let result = [];
  result.push({
    fleet: "Total"
  });
  return result;
};
export default ViewRolesReportTable;
