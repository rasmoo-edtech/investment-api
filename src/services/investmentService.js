'use strict';

const { v4: uuid } = require('uuid')
const Investment = require('../models/investment');
const ResponseError = require('../errors/responseError');

const {
    clone,
    nextId,
    copyProperties
} = require('../utils/investmentUtils');

const investments = [
    new Investment(uuid(), 'Banco Master', 1000, 103.75, new Date('10-10-2022')),
    new Investment(uuid(), 'Magalu', 1680, 104.25, new Date('04-04-2020')),
    new Investment(uuid(), 'GOL', 5000, 112, new Date('04-30-2022')),
    new Investment(uuid(), 'Avianca', 783.33, 13.10, new Date('02-15-2025')),
    new Investment(uuid(), 'Nubank', 11868, 0.1, new Date('10-01-2023')),
    new Investment(uuid(), 'XP Investimentos', 2000, 0.1, new Date('08-08-2022')),
    new Investment(uuid(), 'Via Varejo', 85.3, 0.1, new Date('11-11-2022')),
    new Investment(uuid(), 'Meluiz', 668, 0.1, new Date('04-11-2022')),
    new Investment(uuid(), 'Lojas Renner', 450, 0.1, new Date('01-01-2026')),
    new Investment(uuid(), 'Azul', 893, 0.1, new Date('11-06-2022')),
    new Investment(uuid(), 'Fleury', 180, 0.1, new Date('05-18-2023'))
];

const findAll = ({ name, minValue, maxValue, minTax, minTime }) => {
    return investments.filter((investment) => {
        let condition = true;

        if (name) condition &&= investment.name.startsWith(name);
        if (minValue) condition &&= investment.minValue >= minValue;
        if (maxValue) condition &&= investment.minValue < maxValue;
        if (minTax) condition &&= investment.tax >= minTax;
        if (minTime) condition &&= investment.time >= minTime;

        return condition;
    });
}

const findById = (id) => {
    const investment = investments.find((investment) => investment.id == id);

    if (!investment) {
        throw new ResponseError(404, 'Investment not found.');
    }

    return investment;
}

const deleteById = (id) => {
    const index = investments.findIndex((investment) => investment.id == id);

    if (index < 0) {
        throw new ResponseError(404, 'Investment not found.');
    }

    investments.splice(index, 1);
}

const save = ({ name, minValue, tax, time }) => {
    const newInvestment = new Investment(uuid(), name, minValue, tax, new Date(time));

    if (!newInvestment.isValid()) {
        throw new ResponseError(400, 'All attributes must be defined.');
    }

    investments.push(newInvestment);

    return newInvestment;
}

const updateById = (id, { name, minValue, tax, time }) => {
    const investment = investments.find((investment) => investment.id == id);

    if (!investment) {
        throw new ResponseError(404, 'Investment not found.');
    }

    const copiedInvestment = clone(investment);
    copyProperties({ name, minValue, tax, time }, copiedInvestment);

    if (!copiedInvestment.isValid()) {
        throw new ResponseError(400, 'All attributes must be defined.');
    }

    copyProperties(copiedInvestment, investment);

    return investment;
}

module.exports = {
    save,
    findAll,
    findById,
    deleteById,
    updateById
}