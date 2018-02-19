import { landmarkConstants } from '../_constants';

export function landmarks(state = {}, action) {
  switch (action.type) {
    case landmarkConstants.GETALL_LANDMARKS:
      return {
        allLandMarks: action.LandMarks
      };
    case landmarkConstants.LANDMARK_CREATE:
      return {
        landMarkAdded: true
      };
    case landmarkConstants.UPDATE_LANDMARK:
      return {
        landMarkUpdated: true
      };
    default:
      return state
  }
}