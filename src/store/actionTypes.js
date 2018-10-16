export default {
  ACCOUNT: {
    GET: {
      REQUEST: "ACCOUNT_GET_REQUEST",
      SUCCESS: "ACCOUNT_GET_SUCCESS",
      ERROR: "ACCOUNT_GET_ERROR"
    },
    POST: {
      REQUEST: "ACCOUNT_POST_REQUEST",
      SUCCESS: "ACCOUNT_POST_SUCCESS",
      ERROR: "ACCOUNT_POST_ERROR"
    },
    LOGOUT: {
      REQUEST: "ACCOUNT_LOGOUT_REQUEST",
      SUCCESS: "ACCOUNT_LOGOUT_SUCCESS",
      ERROR: "ACCOUNT_LOGOUT_ERROR"
    },
    KEEP: {
      REQUEST: "ACCOUNT_KEEP_REQUEST",
      SUCCESS: "ACCOUNT_KEEP_SUCCESS"
    }
  },
  NOTIFICATION: {
    SHOW: "NOTIFICATION_SHOW"
  },
  FLEETS: {
    GET: {
      REQUEST: "FLEETS_GET_REQUEST",
      SUCCESS: "FLEETS_GET_SUCCESS",
      ERROR: "FLEETS_GET_ERROR"
    },
    META_DATA: {
      ASSETS: {
        GET: {
          REQUEST: "FLEETS_META_DATA_ASSETS_GET_REQUEST",
          SUCCESS: "FLEETS_META_DATA_ASSETS_GET_SUCCESS",
          ERROR: "FLEETS_META_DATA_ASSETS_GET_ERROR"
        }
      },
      ROLES: {
        GET: {
          REQUEST: "FLEETS_META_DATA_ROLES_GET_REQUEST",
          SUCCESS: "FLEETS_META_DATA_ROLES_GET_SUCCESS",
          ERROR: "FLEETS_META_DATA_ROLES_GET_ERROR"
        }
      },
      GET: {
        REQUEST: "GET_FLEETS_META_DATA",
        ERROR: "ERROR_FLEETS_META_DATA",
        SUCCESS: "SUCCES_FLEETS_META_DATA"
      }
    },
    ASSIGN: {
      ASSETS: {
        REQUEST: "FLEETS_ASSIGN_ASSETS_REQUEST",
        SUCCESS: "FLEETS_ASSIGN_ASSETS_SUCCESS",
        ERRORR: "FLEETS_ASSIGN_ASSETS_ERRORR"
      }
    },
    UNASSIGN: {
      ASSETS: {
        REQUEST: "FLEETS_UNASSIGN_ASSETS_REQUEST",
        SUCCESS: "FLEETS_UNASSIGN_ASSETS_SUCCESS",
        ERRORR: "FLEETS_UNASSIGN_ASSETS_ERRORR"
      }
    },
    PROJECTS: {
      GET: {
        REQUEST: "FLEETS_GET_PROJECTS_REQUEST",
        SUCCESS: "FLEETS_GET_PROJECTS_SUCCESS",
        ERROR: "FLEETS_GET_PROJECTS_ERROR"
      }
    },
    BASES: {
      GET: {
        REQUEST: "FLEETS_GET_BASES_REQUEST",
        SUCCESS: "FLEETS_GET_BASES_SUCCESS",
        ERROR: "FLEETS_GET_BASES_ERROR"
      }
    },
    REQUIREMENTS: {
      GET: {
        REQUEST: "FLEETS_REQUIREMENTS_GET_REQUEST",
        SUCCESS: "FLEETS_REQUIREMENTS_GET_SUCCESS",
        ERROR: "FLEETS_REQUIREMENTS_GET_ERROR"
      },
      PERSON: {
        GET: {
          REQUEST: "REQUIREMENTS_PERSON_GET_REQUEST",
          SUCCESS: "REQUIREMENTS_PERSON_GET_SUCCESS",
          ERROR: "REQUIREMENTS_PERSON_GET_ERROR"
        }
      }
    },

    POST: {
      REQUEST: "FLEETS_POST_REQUEST",
      SUCCESS: "FLEETS_POST_SUCCESS",
      ERROR: "FLEETS_POST_ERROR"
    },
    PUT: {
      REQUEST: "FLEETS_PUT_REQUEST",
      SUCCESS: "FLEETS_PUT_SUCCESS",
      ERROR: "FLEETS_PUT_ERROR"
    },
    DELETE: {
      REQUEST: "FLEETS_DELETE_REQUEST",
      SUCCESS: "FLEETS_DELETE_SUCCESS",
      ERROR: "FLEETS_DELETE_ERROR"
    }
  },
  ASSETS: {
    SEND: {
      POST: {
        REQUEST: "ASSETS_SEND_POST_REQUEST",
        SUCCESS: "ASSETS_SEND_POST_SUCCESS",
        ERROR: "ASSETS_SEND_POST_ERROR"
      },
      DELETE: {
        REQUEST: "ASSETS_SEND_DELETE_REQUEST",
        SUCCESS: "ASSETS_SEND_DELETE_SUCCESS",
        ERROR: "ASSETS_SEND_DELETE_ERROR"
      }
    },
    CODES: {
      GET: {
        REQUEST: "ASSETS_CODES_GET_REQUEST",
        SUCCESS: "ASSETS_CODES_GET_SUCCESS",
        ERROR: "ASSETS_CODES_GET_ERROR"
      }
    },
    GET: {
      REQUEST: "ASSETS_GET_REQUEST",
      SUCCESS: "ASSETS_GET_SUCCESS",
      ERROR: "ASSETS_GET_ERROR"
    },
    POST: {
      REQUEST: "ASSETS_POST_REQUEST",
      SUCCESS: "ASSETS_POST_SUCCESS",
      ERROR: "ASSETS_POST_ERROR"
    },
    PUT: {
      REQUEST: "ASSETS_PUT_REQUEST",
      SUCCESS: "ASSETS_PUT_SUCCESS",
      ERROR: "ASSETS_PUT_ERROR"
    },
    FLEETS: {
      SINGLE: {
        GET: {
          REQUEST: "ASSETS_FLEETS_SINGLE_GET_REQUEST",
          SUCCESS: "ASSETS_FLEETS_SINGLE_GET_SUCCESS",
          ERROR: "ASSETS_FLEETS_SINGLE_GET_ERROR"
        }
      },
      GET: {
        REQUEST: "ASSETS_FLEETS_GET_REQUEST",
        SUCCESS: "ASSETS_FLEETS_GET_SUCCESS",
        ERROR: "ASSETS_FLEETS_GET_ERROR"
      },
      POST: {
        REQUEST: "ASSETS_FLEETS_POST_REQUEST",
        SUCCESS: "ASSETS_FLEETS_POST_SUCCESS",
        ERROR: "ASSETS_FLEETS_POST_ERROR"
      },
      PUT: {
        REQUEST: "ASSETS_FLEETS_PUT_REQUEST",
        SUCCESS: "ASSETS_FLEETS_PUT_SUCCESS",
        ERROR: "ASSETS_FLEETS_PUT_ERROR"
      }
    },
    DOWNLOAD: {
      REQUEST: "ASSETS_DOWNLOAD_REQUEST",
      SUCCESS: "ASSETS_DOWNLOAD_SUCCESS",
      ERROR: "ASSETS_DOWNLOAD_ERROR"
    },
    COMMENTS: {
      PUT: {
        REQUEST: "COMMENTS_PUT_REQUEST",
        SUCCESS: "COMMENTS_PUT_SUCCESS",
        ERROR: "COMMENTS_PUT_ERROR"
      }
    },
    UPDATE_MAXIMO: {
      REQUEST: "ASSETS_UPDATEMAXIMO_REQUEST",
      SUCCESS: "ASSETS_UPDATEMAXIMO_SUCCESS",
      ERROR: "ASSETS_UPDATEMAXIMO_ERROR",
      DATE: {
        REQUEST: "ASSETS_UPDATEMAXIMO_DATE_REQUEST",
        SUCCESS: "ASSETS_UPDATEMAXIMO_DATE_SUCCESS",
        ERROR: "ASSETS_UPDATEMAXIMO_DATE_ERROR"
      }
    },
    FIXED_ASSETS: {
      GET: {
        REQUEST: "ASSETS_FIXED_GET_REQUEST",
        SUCCESS: "ASSETS_FIXED_GET_SUCCESS",
        ERROR: "ASSETS_UFIXED_GET_ERROR"
      }
    }
  },
  SETTINGS: {
    POST: {
      REQUEST: "SETTINGS_POST_REQUEST",
      ERROR: "SETTINGS_POST_ERROR",
      SUCCESS: "SETTINGS_POST_SUCCESS"
    },
    GET: {
      REQUEST: "SETTINGS_GET_REQUEST",
      ERROR: "SETTINGS_GET_ERROR",
      SUCCESS: "SETTINGS_GET_SUCCESS"
    },
    DEFAULT: {
      REQUEST: "SETTINGS_DEFAULT_REQUEST"
    }
  },
  WORKFORCE: {
    COMPETENCIES: {
      GET: {
        REQUEST: "WORKFORCE_COMPETENCIES_GET_REQUEST",
        SUCCESS: "WORKFORCE_COMPETENCIES_GET_SUCCESS",
        ERROR: "WORKFORCE_COMPETENCIES_GET_ERROR"
      }
    },
    SINGLE: {
      GET: {
        REQUEST: "WORKFORCE_SINGLE_GET_REQUEST",
        SUCCESS: "WORKFORCE_SINGLE_GET_SUCCESS",
        ERROR: "WORKFORCE_SINGLE_GET_ERROR"
      }
    },
    FLEETS: {
      GET: {
        REQUEST: "WORKFORCE_FLEETS_GET_REQUEST",
        SUCCESS: "WORKFORCE_FLEETS_GET_SUCCESS",
        ERROR: "WORKFORCE_FLEETS_GET_ERROR"
      }
    },
    ASSIGNED: {
      GET: {
        REQUEST: "WORKFORCE_ASSIGNED_GET_REQUEST",
        SUCCESS: "WORKFORCE_ASSIGNED_GET_SUCCESS",
        ERROR: "WORKFORCE_ASSIGNED_GET_ERROR"
      },
      POST: {
        REQUEST: "WORKFORCE_ASSIGNED_POST_REQUEST",
        SUCCESS: "WORKFORCE_ASSIGNED_POST_SUCCESS",
        ERROR: "WORKFORCE_ASSIGNED_POSTT_ERROR"
      },
      MAKE_NOT_REQUIRED: {
        REQUEST: "WORKFORCE_ASSIGNED_MAKE_NOT_REQUIRED_REQUEST",
        SUCCESS: "WORKFORCE_ASSIGNED_MAKE_NOT_REQUIRED_SUCCESS",
        ERROR: "WORKFORCE_ASSIGNED_MAKE_NOT_REQUIRED_ERROR"
      },
      MAKE_REQUIRED: {
        REQUEST: "WORKFORCE_ASSIGNED_MAKE_REQUIRED_REQUEST",
        SUCCESS: "WORKFORCE_ASSIGNED_MAKE_REQUIRED_SUCCESS",
        ERROR: "WORKFORCE_ASSIGNED_MAKE_REQUIRED_ERROR"
      },
      ASSIGN: {
        REQUEST: "WORKFORCE_ASSIGNED_ASSIGN_REQUEST",
        SUCCESS: "WORKFORCE_ASSIGNED_ASSIGN_SUCCESS",
        ERROR: "WORKFORCE_ASSIGNED_ASSIGN_ERROR"
      }
    },
    GET: {
      REQUEST: "WORKFORCE_GET_REQUEST",
      SUCCESS: "WORKFORCE_GET_SUCCEESS",
      ERROR: "WORKFORCE_GET_ERROR"
    },
    DEMAND: {
      GET: {
        REQUEST: "WORKFORCE_DEMAND_GET_REQUEST",
        SUCCESS: "WORKFORCE_DEMAND_GET_SUCCEESS",
        ERROR: "WORKFORCE_DEMAND_GET_ERROR"
      }
    },
    POST: {
      REQUEST: "WORKFORCE_POST_REQUEST",
      SUCCESS: "WORKFORCE_POST_SUCCESS",
      ERROR: "WORKFORCE_POST_ERROR"
    },
    PUT: {
      REQUEST: "WORKFORCE_PUT_REQUEST",
      SUCCESS: "WORKFORCE_PUT_SUCCESS",
      ERROR: "WORKFORCE_PUT_ERROR"
    },
    ACTIVATE: {
      REQUEST: "WORKFORCE_ACTIVATE_REQUEST",
      SUCCESS: "WORKFORCE_ACTIVATE_SUCCESS",
      ERROR: "WORKFORCE_ACTIVATE_ERROR"
    },
    TERMINATE: {
      REQUEST: "WORKFORCE_TERMINATE_REQUEST",
      SUCCESS: "WORKFORCE_TERMINATE_SUCCESS",
      ERROR: "WORKFORCE_TERMINATE_ERROR"
    },
    DOWNLOAD: {
      REQUEST: "WORKFORCE_DOWNLOAD_REQUEST",
      SUCCESS: "WORKFORCE_DOWNLOAD_SUCCESS",
      ERROR: "WORKFORCE_DOWNLOAD_ERROR"
    }
  },
  HELP: {
    LIST: {
      REQUEST: "HELP_LIST_REQUEST",
      SUCCESS: "HELP_LIST_SUCCESS",
      ERROR: "HELP_LIST_ERROR"
    },
    POST: {
      REQUEST: "HELP_POST_REQUEST",
      SUCCESS: "HELP_POST_SUCCESS",
      ERROR: "HELP_POST_ERROR"
    },
    PUT: {
      REQUEST: "HELP_PUT_REQUEST",
      SUCCESS: "HELP_PUT_SUCCESS",
      ERROR: "HELP_PUT_ERROR"
    },
    GET: {
      REQUEST: "HELP_GET_REQUEST",
      SUCCESS: "HELP_GET_SUCCESS",
      ERROR: "HELP_GET_ERROR"
    },
    ALL: {
      REQUEST: "HELP_ALL_REQUEST",
      SUCCESS: "HELP_ALL_SUCCESS",
      ERROR: "HELP_ALL_ERROR"
    }
  }
};