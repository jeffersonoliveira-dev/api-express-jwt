import Address, { AddressInstance} from "./address.model";
import User, { UserInstance} from "./user.model";

User.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });


export {
    Address,
    AddressInstance,
    User,
    UserInstance
}