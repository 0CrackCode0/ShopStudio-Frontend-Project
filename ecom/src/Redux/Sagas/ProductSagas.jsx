import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("product", action.payload)
    // let response = yield createMultipartRecord("product",action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("product", action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("product", action.payload)
    // yield put({ type: UPDATE_PRODUCT_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* ProductSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)                                        //watcher
    yield takeEvery(GET_PRODUCT, getSaga)                                              //watcher
    yield takeEvery(UPDATE_PRODUCT, updateSaga)                                        //watcher
    yield takeEvery(DELETE_PRODUCT, deleteSaga)                                        //watcher
}