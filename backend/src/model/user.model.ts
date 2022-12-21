import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "users",
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name!: string
  
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdTime!: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedTime!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    token!: string
}