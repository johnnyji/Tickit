import {
  FETCH_COLLECTION_PREVIEWS,
  FETCH_COLLECTION_PREVIEWS_ERROR,
  FETCH_COLLECTION_PREVIEWS_SUCCESS,
} from './ActionTypes';
import http, {endpoints} from '../../../utils/http';

export default {

  new: require('./NewActionCreators'),
  delete: require('./DeleteActionCreators'),
  edit: require('./EditActionCreators'),
  show: require('./ShowActionCreators'),

  fetchPreviews() {
    return (dispatch) => {
      // Initiate fetch
      dispatch({type: FETCH_COLLECTION_PREVIEWS});

      http.get(endpoints.collections.index.path)
        .then(({collections}) => {
          dispatch({
            type: FETCH_COLLECTION_PREVIEWS_SUCCESS,
            data: {collectionPreviews: collections}
          });
        })
        .catch(({message}) => {
          dispatch({
            type: FETCH_COLLECTION_PREVIEWS_ERROR,
            data: {error: message}
          });
        });
    };
  }

};
