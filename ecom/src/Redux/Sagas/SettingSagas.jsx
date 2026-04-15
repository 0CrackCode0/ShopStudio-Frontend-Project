import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("setting", action.payload)
    // let response = yield createMultipartRecord("setting",action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("setting")
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("setting", action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("setting", action.payload)
    // yield put({ type: UPDATE_SETTING_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("setting", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}

export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)                                        //watcher
    yield takeEvery(GET_SETTING, getSaga)                                              //watcher
    yield takeEvery(UPDATE_SETTING, updateSaga)                                        //watcher
    yield takeEvery(DELETE_SETTING, deleteSaga)                                        //watcher
}