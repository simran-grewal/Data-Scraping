import React from 'react';
import Lightbox from 'react-image-lightbox';
const loader = () => (
    <section className="loader">
        <section className="loader__item loader__circle loader__circle-1"></section>
        <section className="loader__item loader__circle loader__circle-2"></section>
        <section className="loader__item loader__circle loader__circle-3"></section>
        <section className="loader__item loader__pulse"></section>
    </section>
)

export default loader;