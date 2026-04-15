import { all } from "redux-saga/effects"

import MaincategorySagas from "./MaincategorySagas"
import SubcategorySagas from "./SubcategorySagas"
import BrandSagas from "./BrandSagas"
import FeatureSagas from "./FeatureSagas"
import ProductSagas from "./ProductSagas"
import FaqSagas from "./FaqSagas"
import SettingSagas from "./SettingSagas"
import CartSagas from "./CartSagas"
import WishlistSagas from "./WishlistSagas"
import TestimonialSagas from "./TestimonialSagas"
import UserSagas from "./UserSagas"
import ContactUsSagas from "./ContactUsSagas"
import CheckoutSagas from "./CheckoutSagas"
import NewsletterSagas from "./NewsletterSagas"

export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        FeatureSagas(),
        ProductSagas(),
        FaqSagas(),
        SettingSagas(),
        CartSagas(),
        WishlistSagas(),
        TestimonialSagas(),
        UserSagas(),
        ContactUsSagas(),
        CheckoutSagas(),
        NewsletterSagas()
    ])
}