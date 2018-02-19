import { landmarkConstants } from '../_constants';
import { landmarkService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const landmarkActions = {
    getAllLandmarks,
    createLandMark,
    updateRemark
};

function createLandMark(landmark) {
    return dispatch => {
        dispatch(request({ landmark }));

        landmarkService.createLandMark(landmark)
            .then(
                response => { 
                    dispatch(success(response));
                    //history.push('/createLandmark');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(landmark) { return { type: landmarkConstants.LANDMARK_CREATE, landmark } }
    function success(landmark) { return { type: landmarkConstants.LANDMARK_CREATE, landmark } }
    function failure(error) { return { type: landmarkConstants.LANDMARK_CREATE, error } }
}


function getAllLandmarks() {
    return dispatch => {
        dispatch(request());

        return landmarkService.getAllLandMarks()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: landmarkConstants.GETALL_LANDMARKS } }
    function success(landmark) { return { type: landmarkConstants.GETALL_LANDMARKS, LandMarks:landmark } }
    function failure(error) { return { type: landmarkConstants.GETALL_LANDMARKS, error } }
}
function updateRemark(landMarkId, remarkText){
    
    return dispatch => {
        landmarkService.updateLandMark(landMarkId,remarkText).then(
            data => dispatch(success(data)),
            error => dispatch(error(error))
        );
    }
    function request(landmark) { return { type: landmarkConstants.UPDATE_LANDMARK, landMarkId, remarkText } }
    function success(landmark) { return { type: landmarkConstants.UPDATE_LANDMARK, landMarkId, remarkText } }
    function failure(error) { return { type: landmarkConstants.UPDATE_LANDMARK, error } }
}
