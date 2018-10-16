import requests from "../actionTypes";

const { FLEETS } = requests;

export default (
  state = {
    fleets: { data: [] },
    metaData: { data: { types: [], roles: [] } }
  },
  action
) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    /*
    Получение списка флотов без какой либо доп. информации
    */
    case FLEETS.GET.REQUEST:
      return {
        ...state,
        fleets: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };

    case FLEETS.GET.ERROR:
      return {
        ...state,
        fleets: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };

    case FLEETS.GET.SUCCESS:
      return {
        ...state,
        fleets: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    /*
    Получение баз (где стоят) ассетов
    */
    case FLEETS.BASES.GET.REQUEST:
      return {
        ...state,
        bases: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case FLEETS.BASES.GET.ERROR:
      return {
        ...state,
        bases: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case FLEETS.BASES.GET.SUCCESS:
      return {
        ...state,
        bases: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    /*
    Получение только типов ассетов
    */
    case FLEETS.META_DATA.ASSETS.GET.REQUEST:
      return {
        ...state,
        metaData: {
          loading: true,
          data: { ...state.metaData.data },
          error: null,
          assetsSolved: false,
          rolesSolved: state.metaData.rolesSolved,
          solved: false
        }
      };

    case FLEETS.META_DATA.ASSETS.GET.ERROR:
      return {
        ...state,
        metaData: {
          loading: false,
          data: { ...state.metaData.data, types: [] },
          error: payload,
          assetsSolved: false,
          rolesSolved: state.metaData.rolesSolved,
          solved: false
        }
      };

    case FLEETS.META_DATA.ASSETS.GET.SUCCESS:
      return {
        ...state,
        metaData: {
          loading: false,
          data: { ...state.metaData.data, types: payload },
          error: null,
          assetsSolved: true,
          rolesSolved: state.metaData.rolesSolved,
          solved: false
        }
      };

    /*
    Получение только ролей
    */
    case FLEETS.META_DATA.ROLES.GET.REQUEST:
      return {
        ...state,
        metaData: {
          loading: true,
          data: { ...state.metaData.data },
          error: null,
          assetsSolved: state.metaData.assetsSolved,
          rolesSolved: false,
          solved: false
        }
      };

    case FLEETS.META_DATA.ROLES.GET.ERROR:
      return {
        ...state,
        metaData: {
          loading: false,
          data: null,
          error: payload,
          assetsSolved: state.metaData.assetsSolved,
          rolesSolved: false,
          solved: false
        }
      };

    case FLEETS.META_DATA.ROLES.GET.SUCCESS:
      return {
        ...state,
        metaData: {
          loading: false,
          data: { ...state.metaData.data, roles: payload },
          error: null,
          assetsSolved: state.metaData.assetsSolved,
          rolesSolved: true,
          solved: false
        }
      };

    /*
    Получение типов ассетов и ролей персонала
    */
    case FLEETS.META_DATA.GET.REQUEST:
      return {
        ...state,
        metaData: {
          loading: true,
          data: { roles: [], types: [] },
          rolesSolved: false,
          assetsSolved: false,
          error: null,
          solved: false
        }
      };

    case FLEETS.META_DATA.GET.ERROR:
      return {
        ...state,
        metaData: {
          loading: false,
          data: { roles: [], types: [] },
          rolesSolved: false,
          assetsSolved: false,
          error: payload,
          solved: false
        }
      };

    case FLEETS.META_DATA.GET.SUCCESS:
      return {
        ...state,
        metaData: {
          loading: false,
          data: payload,
          rolesSolved: true,
          assetsSolved: true,
          error: null,
          solved: true
        }
      };

    /*
    Получение проектов данного продуктлайна
    */
    case FLEETS.PROJECTS.GET.REQUEST:
      return {
        ...state,
        projects: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case FLEETS.PROJECTS.GET.ERROR:
      return {
        ...state,
        projects: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case FLEETS.PROJECTS.GET.SUCCESS:
      return {
        ...state,
        projects: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    /*
    Добавление флота
    */
    case FLEETS.POST.REQUEST:
      return {
        ...state,
        fleetAdded: {
          loading: true,
          data: payload,
          error: null,
          solved: false
        }
      };

    case FLEETS.POST.SUCCESS:
      return {
        ...state,
        fleetAdded: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case FLEETS.POST.ERROR:
      return {
        ...state,
        fleetAdded: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };
    /*
    изменение флота
    */
    case FLEETS.PUT.REQUEST:
      return {
        ...state,
        fleetChanged: {
          loading: true,
          data: payload,
          error: null,
          solved: false
        }
      };

    case FLEETS.PUT.SUCCESS:
      return {
        ...state,
        fleetChanged: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case FLEETS.PUT.ERROR:
      return {
        ...state,
        fleetChanged: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };
    /*
    Получение людей и ассетов необходимых ОДНОМУ флоту
    */
    case FLEETS.REQUIREMENTS.GET.REQUEST:
      return {
        ...state,
        fleetRequirements: {
          loading: true,
          data: payload,
          error: null,
          solved: false
        }
      };

    case FLEETS.REQUIREMENTS.GET.SUCCESS:
      return {
        ...state,
        fleetRequirements: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case FLEETS.REQUIREMENTS.GET.ERROR:
      return {
        ...state,
        fleetRequirements: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    /*
    Удаление флотов
    */

    case FLEETS.DELETE.REQUEST:
      return {
        ...state,
        delete: {
          loading: true,
          data: payload,
          error: null,
          solved: false
        }
      };

    case FLEETS.DELETE.SUCCESS:
      return {
        ...state,
        delete: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case FLEETS.DELETE.ERROR:
      return {
        ...state,
        delete: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };
    /* Добавление АССЕТА во флот */
    case FLEETS.ASSIGN.ASSETS.REQUEST: {
      return {
        ...state,
        assignAsset: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };
    }

    case FLEETS.ASSIGN.ASSETS.SUCCESS: {
      return {
        ...state,
        assignAsset: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case FLEETS.ASSIGN.ASSETS.ERRORR: {
      return {
        ...state,
        assignAsset: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };
    }

    /* Открепление АССЕТА из флота на базу */
    case FLEETS.UNASSIGN.ASSETS.REQUEST: {
      return {
        ...state,
        unassignAsset: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };
    }

    case FLEETS.UNASSIGN.ASSETS.SUCCESS: {
      return {
        ...state,
        unassignAsset: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case FLEETS.UNASSIGN.ASSETS.ERRORR: {
      return {
        ...state,
        unassignAsset: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};
