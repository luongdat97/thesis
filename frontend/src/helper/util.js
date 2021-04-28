import moment from "moment"

export default class Util {

    constructor() { }

    static toSalaryString = ({from, to}) => {
        if (!from && !to) return "Thỏa thuận"
        if (!from) return `Lên đến ${to} triệu` 
        if (!to) return `Từ ${from} triệu`
        return `${from} - ${to} triệu`
    }

    static isOutDate = (date) => {
       return moment() > moment(date)
    }
}