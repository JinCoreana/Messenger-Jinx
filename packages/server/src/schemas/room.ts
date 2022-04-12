import { DataTypes } from "sequelize";
import sequelize from '../sequelize';
import User from "./user";

const Room = sequelize.define('room', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    opponentId: {
        type: DataTypes.UUID,
        references: {
            model: User
        }
    }
});

export default Room;