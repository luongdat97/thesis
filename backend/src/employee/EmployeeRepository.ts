import { EmployeeNS } from "./Employee";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";

export class EmployeeDALMongo implements EmployeeNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_employee = this.db.collection("employee");

    async ListEmployee() {
        const docs = await this.col_employee.find().toArray();
        return FromMongoData.Many<EmployeeNS.Employee>(docs);
    }

    async GetEmployee(id: string) {
        const doc = await this.col_employee.findOne({ _id: id });
        return FromMongoData.One<EmployeeNS.Employee>(doc);
    }
    async GetEmployeeByAccount(account_id: string) {
        const doc = await this.col_employee.findOne({ account_id });
        return FromMongoData.One<EmployeeNS.Employee>(doc);
    }

    async UpdateEmployee(employee: EmployeeNS.Employee) {
        const doc = ToMongoData.One(employee);
        await this.col_employee.updateOne({ _id: employee.id }, { $set: doc });
    }

    async DeleteEmployee(id: string) {
        await this.col_employee.deleteOne({ _id: id });
    }

    async CreateEmployee(employee: EmployeeNS.Employee) {
        const doc = ToMongoData.One(employee);
        await this.col_employee.insertOne(doc);
    }
}
