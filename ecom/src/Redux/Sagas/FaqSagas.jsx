import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("faq", action.payload)
    // let response = yield createMultipartRecord("faq",action.payload)
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("faq", action.payload)
    // yield put({ type: UPDATE_FAQ_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}

export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)                                        //watcher
    yield takeEvery(GET_FAQ, getSaga)                                              //watcher
    yield takeEvery(UPDATE_FAQ, updateSaga)                                        //watcher
    yield takeEvery(DELETE_FAQ, deleteSaga)                                        //watcher
}