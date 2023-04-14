import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/style.scss'
import UserData from "./userData";
import CartsData from "./cartsData";
import ProductsData from "./productsData";

function FakeStore() {

    return (
        <section id="fakeStore">
            <UserData />
            <CartsData />
            <ProductsData />
        </section>

    )
}

export default FakeStore;