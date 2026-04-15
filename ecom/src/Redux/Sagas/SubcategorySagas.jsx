import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("subcategory", action.payload)
    // let response = yield createMultipartRecord("subcategory",action.payload)
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("subcategory", action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("subcategory", action.payload)
    // yield put({ type: UPDATE_SUBCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("subcategory", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* SubcategorySagas() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)                                        //watcher
    yield takeEvery(GET_SUBCATEGORY, getSaga)                                              //watcher
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)                                        //watcher
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)                                        //watcher
}