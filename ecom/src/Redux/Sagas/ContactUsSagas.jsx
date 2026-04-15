import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("contactus", action.payload)
    // let response = yield createMultipartRecord("contactus",action.payload)
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACTUS_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("contactus", action.payload)
    // yield put({ type: UPDATE_CONTACTUS_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACTUS_RED, payload: action.payload })
}

export default function* contactUsSagas() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)                                        //watcher
    yield takeEvery(GET_CONTACTUS, getSaga)                                              //watcher
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)                                        //watcher
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)                                        //watcher
}