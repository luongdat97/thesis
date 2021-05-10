import moment from "moment"

export default class Util {

    constructor() { }

    static toSalaryString = ({from, to}) => {
        if (!from && to == 1000000) return "Thỏa thuận"
        if (!from) return `Lên đến ${to} triệu` 
        if (to == 1000000) return `Từ ${from} triệu`
        return `${from} - ${to} triệu`
    }

    static isOutDate = (date) => {
       return moment() > moment(date)
    }
}