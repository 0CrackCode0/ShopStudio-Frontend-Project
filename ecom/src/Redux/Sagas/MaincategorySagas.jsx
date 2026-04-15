import { put, takeEvery } from "redux-saga/effects"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("maincategory", action.payload)
    // let response = yield createMultipartRecord("maincategory",action.payload)
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("maincategory")
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("maincategory", action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("maincategory", action.payload)
    // yield put({ type: UPDATE_MAINCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)                                        //watcher
    yield takeEvery(GET_MAINCATEGORY, getSaga)                                              //watcher
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)                                        //watcher
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)                                        //watcher
}