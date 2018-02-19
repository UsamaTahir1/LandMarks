import { authHeader, config } from '../_helpers';

export const landmarkService = {
    getAllLandMarks,
    createLandMark,
    updateLandMark
};

function getAllLandMarks() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/getalllandmarks', requestOptions).then(response => response.json())
    .then(data => {return data;});
    
    // .then((response) => {
    //     if (response.ok) {
    //         return response.data;
    //     }
    // },
    //  handleError);
}

function createLandMark(landmark) {
    var latitude = landmark.latitude;
    var longitude = landmark.longitude;
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({latitude,longitude  })
    };

    return fetch(config.apiUrl + '/api/createlandmark', requestOptions).then((response) => {
        if (response.ok) {
            return response;
        }
    }, handleError);
}

function updateLandMark(landmarkId, noteText) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({landmarkId,noteText  })
    };

    return fetch(config.apiUrl + '/api/updatelandmark', requestOptions).then((response) => {
        if (response.ok) {
            return response;
        }
    }, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}