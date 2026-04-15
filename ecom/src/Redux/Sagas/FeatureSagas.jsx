import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("feature", action.payload)
    // let response = yield createMultipartRecord("feature",action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("feature", action.payload)
    // yield put({ type: UPDATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)                                        //watcher
    yield takeEvery(GET_FEATURE, getSaga)                                              //watcher
    yield takeEvery(UPDATE_FEATURE, updateSaga)                                        //watcher
    yield takeEvery(DELETE_FEATURE, deleteSaga)                                        //watcher
}