import requests from "../actionTypes";

const { WORKFORCE } = requests;

export default (
  state = {
    workforce: { data: [] },
    fleets: { data: [] },
    competencies: { data: [] },
    assigned: { data: [] }
  },
  action
) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    /*Получение флотов со списком необходимых ролей, метаданными*/

    case WORKFORCE.FLEETS.GET.REQUEST: {
      return {
        ...state,
        fleets: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.FLEETS.GET.SUCCESS: {
      return {
        ...state,
        fleets: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.FLEETS.GET.ERROR: {
      return {
        ...state,
        fleets: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }

    /*Запрос списка всех людей */

    case WORKFORCE.GET.REQUEST: {
      return {
        ...state,
        workforce: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.GET.SUCCESS: {
      return {
        ...state,
        workforce: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.GET.ERROR: {
      return {
        ...state,
        workforce: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }
    /*Добавление человека во флот */

    case WORKFORCE.ASSIGNED.POST.REQUEST: {
      return {
        ...state,
        assignmentProcess: { loading: true }
      };
    }

    case WORKFORCE.ASSIGNED.POST.SUCCESS: {
      return {
        ...state,
        assignmentProcess: { loading: false },
        fleets: {
          data: payload
        }
      };
    }

    case WORKFORCE.ASSIGNED.POST.ERROR: {
      return {
        ...state,
        assignmentProcess: { loading: false },
        assigned: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }
    /*
    Получаем компетенции воркфорсов
    */
    case WORKFORCE.COMPETENCIES.GET.REQUEST: {
      return {
        ...state,
        competencies: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.COMPETENCIES.GET.SUCCESS: {
      return {
        ...state,
        competencies: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.COMPETENCIES.GET.ERROR: {
      return {
        ...state,
        competencies: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }

    /* Получаем списки, кто в какой команде и кто в каком шифте*/
    case WORKFORCE.ASSIGNED.GET.REQUEST: {
      return {
        ...state,
        assigned: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.ASSIGNED.GET.SUCCESS: {
      return {
        ...state,
        assigned: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.ASSIGNED.GET.ERROR: {
      return {
        ...state,
        notRequired: {
          loading: false
        }
      };
    }

    /* Сделать даную роль NOT REQUIRED*/

    case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.REQUEST: {
      return {
        ...state,
        notRequired: {
          assignId: payload.assignId,
          crew: payload.crew,
          fleetId: payload.fleetId,
          personRoleId: payload.personRoleId,
          position: payload.position,
          shift: payload.shift,
          loading: true
        }
      };
    }

    case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.SUCCESS: {
      return {
        ...state,
        notRequired: {
          loading: false
        },
        fleets: {
          data: payload
        }
      };
    }

    case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.ERROR: {
      return {
        ...state,
        assigned: {
          loading: false,
          data: [],
          error: payload,
          solved: false
        }
      };
    }

    /* Сделать даную роль REQUIRED*/

    // case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.REQUEST: {
    //   return {
    //     ...state
    //   };
    // }

    // case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.SUCCESS: {
    //   return {
    //     ...state,
    //     fleets: {
    //       data: payload
    //     }
    //   };
    // }

    // case WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.ERROR: {
    //   return {
    //     ...state,
    //     assigned: {
    //       loading: false,
    //       data: [],
    //       error: payload,
    //       solved: false
    //     }
    //   };
    // }

    /* Добавление (создание) работника */

    case WORKFORCE.POST.REQUEST: {
      return {
        ...state
      };
    }

    case WORKFORCE.POST.SUCCESS: {
      return {
        ...state
      };
    }

    case WORKFORCE.POST.ERROR: {
      return {
        ...state
      };
    }
    /* Получение единственного сотрудника */

    case WORKFORCE.SINGLE.GET.REQUEST: {
      return {
        ...state,
        single: {
          loading: true,
          data: {},
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.SINGLE.GET.SUCCESS: {
      return {
        ...state,
        single: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.SINGLE.GET.ERROR: {
      return {
        ...state,
        single: {
          loading: false,
          data: {},
          error: payload,
          solved: false
        }
      };
    }

    /* ТРЕБУЮТСЯ ПО ФЛОТАМ РОЛИ */

    case WORKFORCE.DEMAND.GET.REQUEST: {
      return {
        ...state,
        demand: {
          loading: true,
          data: {},
          error: null,
          solved: false
        }
      };
    }

    case WORKFORCE.DEMAND.GET.SUCCESS: {
      return {
        ...state,
        demand: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    }

    case WORKFORCE.DEMAND.GET.ERROR: {
      return {
        ...state,
        demand: {
          loading: false,
          data: {},
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
