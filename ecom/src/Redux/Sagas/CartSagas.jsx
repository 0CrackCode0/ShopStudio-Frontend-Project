import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("cart", action.payload)
    // let response = yield createMultipartRecord("cart",action.payload)
    yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("cart")
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("cart", action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("cart", action.payload)
    // yield put({ type: UPDATE_CART_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* cartSagas() {
    yield takeEvery(CREATE_CART, createSaga)                                        //watcher
    yield takeEvery(GET_CART, getSaga)                                              //watcher
    yield takeEvery(UPDATE_CART, updateSaga)                                        //watcher
    yield takeEvery(DELETE_CART, deleteSaga)                                        //watcher
}