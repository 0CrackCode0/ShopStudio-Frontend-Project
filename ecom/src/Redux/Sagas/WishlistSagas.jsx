import { put, takeEvery } from "redux-saga/effects"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constant"
import { createRecord, getRecord, updateRecord, deleteRecord } from "./Services/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord, deleteRecord } from "./Services/index"

function* createSaga(action) {                                                              //worker
    let response = yield createRecord("wishlist", action.payload)
    // let response = yield createMultipartRecord("wishlist",action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {                                                                 //watcher
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                                                 //watcher
    yield updateRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("wishlist", action.payload)
    // yield put({ type: UPDATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {                                                                 //watcher
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                                        //watcher
    yield takeEvery(GET_WISHLIST, getSaga)                                              //watcher
    yield takeEvery(UPDATE_WISHLIST, updateSaga)                                        //watcher
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                                        //watcher
}