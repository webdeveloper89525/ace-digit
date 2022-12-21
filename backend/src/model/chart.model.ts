import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "chart",
})
export class Chart extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    label!: string
  
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    val!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    month!: number
}