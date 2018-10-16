import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-fresh.css";
import "./viewAllPeople.css";
import findInProjectHierarchy from "../../../utils/findInProjectHierarchy";
import PersonModalAdd from "./PersonModalAdd";
import * as R from "ramda";
import { Icon } from "antd";

class ViewAllPeopleTable extends React.Component {
  state = {
    modalVisible: false
  };
  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  handleOk = () => {
    this.setState({ modalVisible: false });
  };
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };
  render() {
    const { competencies, fleets, projects, filter } = this.props;
    const workforce = this.props.workforce
      .filter(
        worker =>
          worker.fullName.indexOf(filter.fullName) !== -1 || !filter.fullName
      )
      .filter(
        worker =>
          filter.productLine.length === 0 ||
          filter.productLine.indexOf(worker.productLine) !== -1
      )
      .filter(
        worker =>
          (worker.gin || " ").toString().indexOf(filter.gin) !== -1 ||
          !filter.gin
      )
      .filter(
        worker =>
          filter.fleet.length === 0 ||
          (filter.fleet.indexOf("Not assigned") !== -1 &&
            worker.fleetAssignments.length === 0) ||
          (worker.fleetAssignments.length > 0 &&
            filter.fleet.indexOf(
              worker.fleetAssignments[0].fleetId.toString()
            ) !== -1)
      )
      .filter(
        worker =>
          filter.competencies.length === 0 ||
          R.intersection(worker.competencyIds, filter.competencies).length !== 0
      )
      .filter(
        worker =>
          filter.certifications.length === 0 ||
          R.intersection(worker.competencyIds, filter.certifications).length !==
            0
      )
      .filter(
        worker =>
          filter.passes.length === 0 ||
          R.intersection(worker.competencyIds, filter.passes).length !== 0
      );

    let riskColDefs = [
      {
        headerName: `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Medkit_font_awesome-red.svg/2000px-Medkit_font_awesome-red.svg.png" class="img-header-cell"></img>`,
        headerTooltip: "Injured or med leave",
        field: "injuredOrMedLeave",
        cellRenderer: data => (data.value ? "✔" : "")
      },
      {
        headerName: `<img src="https://cdn.iconscout.com/public/images/icon/free/png-512/swap-3c8fc6afe6817918-512x512.png" class="img-header-cell"></img>`,
        headerTooltip: "Retired or transfered soon",
        field: "retiredOrTransferedSoon",
        cellRenderer: data => (data.value ? "✔" : "")
      },
      {
        headerName: `<img src="http://dallascontinentalbridge.com/wp-content/uploads/2014/05/icon-car1.png" class="img-header-cell"></img>`,
        headerTooltip: "Driving restrictions",
        field: "drivingRestrictions",
        cellRenderer: data => (data.value ? "✔" : "")
      },
      {
        headerName: `<img src="https://cdn3.iconfinder.com/data/icons/picons-weather/57/53_warning-512.png" class="img-header-cell"></img>`,
        headerTooltip: "Human error history",
        field: "humanErrorHistory",
        cellClass: "ag-cell-border-right-black",
        cellRenderer: data => (data.value ? "✔" : "")
      }
    ];
    riskColDefs.forEach(columnDefs => {
      columnDefs.cellClass += " text-danger ag-cell-hover-highlight";
      columnDefs.width = 25;
    });
    //Competencies fields
    const competenciesColDefs = competencies
      .filter(el => el.competencyGroup === "Competencies")
      .map(el => ({
        headerName: el.competencyName,
        field: el.competencyId.toString(),
        headerTooltip: el.competencyName,
        headerClass: "ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: "ag-cell-hover-highlight",
        width: 25,
        cellRenderer: data => (data.value ? "✔" : "")
      }));

    const certificationsColDefs = competencies
      .filter(el => el.competencyGroup === "Certifications")
      .map(el => ({
        headerName: el.competencyName,
        field: el.competencyId.toString(),
        headerTooltip: el.competencyName,
        headerClass: "ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: "ag-cell-hover-highlight",
        width: 25,
        cellRenderer: data => (data.value ? "✔" : "")
      }));

    const passesColDefs = competencies
      .filter(el => el.competencyGroup === "Passes")
      .map(el => ({
        headerName: el.competencyName,
        field: el.competencyId.toString(),
        headerTooltip: el.competencyName,
        headerClass: "ag-header-cell-vertical ag-header-cell-hover-highlight",
        cellClass: "ag-cell-hover-highlight",
        width: 25,
        cellRenderer: data => (data.value ? "✔" : "")
      }));

    const editButton = params => (
      <Icon
        type="edit"
        onClick={() => {
          this.props.handleShowEdit(params.data.personId);
        }}
        theme="twoTone"
      />
    );

    const columnDefs = [
      {
        headerName: "Links",
        marryChildren: true,
        children: [
          {
            headerName: "TOP",
            headerTooltip: "TOP link",
            headerClass: "ag-header-cell-vertical",
            cellClass: "text-center",
            cellRendererFramework: editButton,
            width: 25,
            suppressResize: true,
            suppressSorting: true
          },
          {
            headerName: "LDAP",
            headerTooltip: "LDAP link",
            headerClass: "ag-header-cell-vertical",
            cellClass: "text-center",
            cellRendererFramework: params => (
              <a
                href={
                  "https://directory.slb.com/query.cgi?alias=" +
                  params.data.alias
                }
                target="_blank"
              >
                <img
                  alt="img"
                  src="https://directory.slb.com/images/small-globe7.gif"
                  className="ldap"
                />
              </a>
            ),
            width: 30,
            suppressResize: true,
            suppressSorting: true
          },
          {
            headerName: "QUEST",
            headerTooltip: "LDAP report",
            headerClass: "ag-header-cell-vertical",
            cellClass: "text-center",
            cellRendererFramework: params => (
              <a
                href={
                  "https://quest.slb.com/quest/Certifications/Rpts/MyTrainingRpt.asp?GinNo=" +
                  params.data.GIN
                }
                target="_blank"
              >
                <img
                  alt="img"
                  src="https://quest.slb.com/quest/images/Quest_Logo_Top_LOWSRC.jpg"
                  className="quest"
                />
              </a>
            ),
            width: 30,
            suppressResize: true,
            suppressSorting: true
          }
        ]
      },
      {
        field: "alias",
        hide: true
      },
      {
        field: "personId",
        hide: true
      },

      {
        headerName: "#",
        cellClass: "ag-cell-bold locked-col",
        colId: "#",
        valueGetter: params => {
          return params.node.rowIndex + 1;
        },
        width: 30,
        suppressSorting: true,
        pinned: "left",
        lockPosition: true
      },
      {
        colId: "fullName",
        headerName: "Full name",
        field: "fullName",
        pinned: "left",
        lockPosition: true,
        cellClass: "locked-col"
      },

      {
        colId: "gin",
        headerName: "GIN",
        field: "GIN",
        pinned: "left",
        width: 80,
        lockPosition: true,
        cellClass: "locked-col"
      },
      { headerName: "Grade", field: "grade", width: 70 },
      {
        headerName: "Product Line",
        field: "productLine",
        width: 75,
        headerClass: "ag-header-cell-wrap",
        cellClass: "ag-cell-border-right-black"
      },
      {
        headerName: "Assign project",
        field: "assignedProject",
        headerClass: "ag-header-cell-wrap",
        cellClass: "ag-cell-border-right-black text-success",
        width: 100,
        suppressSorting: true
      },
      {
        colId: "fleet",
        headerName: "Fleet",
        headerClass: "ag-header-cell-wrap",

        field: "fleet",
        cellClass: "ag-cell-border-right-black",
        width: 80,
        suppressSorting: true
      },
      {
        headerName: `<img src="http://www.clker.com/cliparts/V/W/k/j/k/r/solid-green-heart-md.png" class="img-header-cell"></img>`,
        headerTooltip: "Likes overtime",
        field: "likesOvertime",
        width: 30,
        cellClass: "ag-cell-border-right-black text-success",
        cellRenderer: data => {
          return data.value ? "✔" : "";
        }
      },
      {
        headerName: "Risks",
        marryChildren: true,
        children: riskColDefs
      },
      {
        headerName: "Competencies",
        marryChildren: true,
        children: competenciesColDefs
      },
      {
        headerName: "Certifications",
        width: 0,
        children: certificationsColDefs
      },
      {
        headerName: "Passes",
        width: 0,
        children: passesColDefs
      }
    ];

    const toPlain = arr => {
      let obj = {};
      arr.forEach(el => {
        obj[el] = true;
      });
      return obj;
    };

    // Rows
    const rowData = workforce.map(el => ({
      personId: el.personId,
      alias: el.ldapAlias,
      fullName: el.fullName,
      GIN: el.gin,
      grade: el.grade,
      productLine: el.productLine,
      assignedProject: projects
        ? findInProjectHierarchy(projects.hierarchy, el.assignedProjectId)[5]
        : [],
      assignedProjectId: el.assignedProjectId,
      fleet:
        el.fleetAssignments.length > 0
          ? fleets.find(
              fleet => fleet.id === el.fleetAssignments[0].fleetId.toString()
            ).name
          : "",
      injuredOrMedLeave: el.injuredOrMedLeave,
      likesOvertime: el.likesOvertime,
      drivingRestrictions: el.drivingRestrictions,
      retiredOrTransferedSoon: el.retiredOrTransferedSoon,
      humanErrorHistory: el.humanErrorHistory,
      ...toPlain(el.competencyIds)
    }));

    // [
    //   {
    //     fullName: "Abdullah Habib",
    //     GIN: 456123,
    //     grade: "G06",
    //     productLine: "WPS",
    //     assignProject: "Lukoil WS",
    //     fleet: "CTF #9",
    //     likesOvertime: "X"
    //   },
    //   {
    //     fullName: "Abdullah Habib",
    //     GIN: 456123,
    //     grade: "G06",
    //     productLine: "WPS",
    //     assignProject: "Lukoil WS",
    //     fleet: "CTF #9",
    //     likesOvertime: "X"
    //   },
    //   {
    //     fullName: "Abdullah Habib",
    //     GIN: 456123,
    //     grade: "G06",
    //     productLine: "WPS",
    //     assignProject: "Lukoil WS",
    //     fleet: "CTF #9",
    //     likesOvertime: "X"
    //   }
    // ];

    return [
      <div
        key="aggrid"
        className="ag-theme-fresh mt-12"
        style={{
          height: "700px",
          width: "100%"
        }}
      >
        <AgGridReact
          key="table"
          groupHeaderHeight="25"
          headerHeight="130"
          columnDefs={columnDefs}
          rowData={rowData}
          enableColResize
          enableSorting
          paginationPageSize={25}
          pagination={true}
          paginationAutoPageSize={true}
          suppressMovableColumns="true"
          // rowSelection="multiple"
          // rowDeselection="true"
          cacheBlockSize="50"
          maxBlocksInCache="4"
          // enableServerSideFilter="false"
          // enableServerSideSorting="true"
        />
      </div>,
      <PersonModalAdd
        key="person"
        modalVisible={this.state.modalVisible}
        handleCancel={this.handleCancel}
        handleOk={this.handleOk}
      />
    ];
  }
}

export default ViewAllPeopleTable;
