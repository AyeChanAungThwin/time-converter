// Created by - Aye Chan Aung Thwin

const getHtmlTagById = (id) => {
    return document.getElementById(id);
}

const getHtmlTagByClassName = (className) => {
    return document.querySelector(className);
}

const getValueById = (id) => {
    return getHtmlTagById(id).value;
}

const setValueById = (id, val) => {
    getHtmlTagById(id).value = val;
}

const getTextById = (id) => {
    return getHtmlTagById(id).innerText;
}

const setTextById = (id, val) => {
    getHtmlTagById(id).innerHTML = (''+val);
}