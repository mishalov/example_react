import requests from "../actionTypes";

const { ASSETS } = requests;

export default (state, action) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    // Списки флотов
    case ASSETS.FLEETS.GET.REQUEST:
      return {
        ...state,
        fleetsLoading: true,
        fleetsData: null,
        fleetsError: null
      };

    case ASSETS.FLEETS.GET.SUCCESS:
      return {
        ...state,
        fleetsLoading: false,
        fleetsData: payload,
        fleetsError: null
      };

    case ASSETS.FLEETS.GET.ERROR:
      return {
        ...state,
        fleetsLoading: false,
        fleetsData: null,
        fleetsError: payload
      };

    // СПИСОК АССЕТОВ

    case ASSETS.GET.REQUEST:
      return {
        ...state,
        assetsList: {
          data: null,
          solved: false,
          loading: true,
          error: null
        }
      };

    case ASSETS.GET.SUCCESS:
      return {
        ...state,
        assetsList: {
          data: payload,
          solved: true,
          loading: false,
          error: null
        }
      };

    case ASSETS.GET.ERROR:
      return {
        ...state,
        assetsList: {
          data: null,
          solved: false,
          loading: false,
          error: payload
        }
      };

    // Добавить комментарий

    case ASSETS.COMMENTS.PUT.REQUEST:
      return {
        ...state,
        fleetsLoading: true,
        commets: {
          loading: true,
          data: null,
          error: null
        }
      };

    case ASSETS.COMMENTS.PUT.SUCCESS:
      return {
        ...state,
        commets: {
          loading: false,
          data: payload,
          error: null
        }
      };

    case ASSETS.COMMENTS.PUT.ERROR:
      return {
        ...state,
        commets: {
          loading: false,
          data: null,
          error: payload
        }
      };

    //Создать АССЕТ

    case ASSETS.POST.REQUEST:
      return {
        ...state,
        assetAdd: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case ASSETS.POST.ERROR:
      return {
        ...state,
        assetAdd: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case ASSETS.POST.SUCCESS:
      return {
        ...state,
        assetAdd: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };
    //Обновить ассет

    case ASSETS.PUT.REQUEST:
      return {
        ...state,
        assetUpdate: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case ASSETS.PUT.ERROR:
      return {
        ...state,
        assetUpdate: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case ASSETS.PUT.SUCCESS:
      return {
        ...state,
        assetUpdate: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    //Коды Ассетов

    case ASSETS.CODES.GET.REQUEST:
      return {
        ...state,
        codes: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case ASSETS.CODES.GET.ERROR:
      return {
        ...state,
        codes: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case ASSETS.CODES.GET.SUCCESS:
      return {
        ...state,
        codes: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    //ДАта последнего обновления максимо

    case ASSETS.UPDATE_MAXIMO.DATE.REQUEST:
      return {
        ...state,
        maximoUpdate: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case ASSETS.UPDATE_MAXIMO.DATE.ERROR:
      return {
        ...state,
        maximoUpdate: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case ASSETS.UPDATE_MAXIMO.DATE.SUCCESS:
      return {
        ...state,
        maximoUpdate: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    //ДАта последнего обновления FIXED LIST

    case ASSETS.FIXED_ASSETS.GET.REQUEST:
      return {
        ...state,
        fixedAssets: {
          loading: true,
          data: null,
          error: null,
          solved: false
        }
      };

    case ASSETS.FIXED_ASSETS.GET.ERROR:
      return {
        ...state,
        fixedAssets: {
          loading: false,
          data: null,
          error: payload,
          solved: false
        }
      };

    case ASSETS.FIXED_ASSETS.GET.SUCCESS:
      return {
        ...state,
        fixedAssets: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    default: {
      return {
        ...state
      };
    }
  }
};
