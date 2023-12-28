import { Address } from "../models"
import { AddressInstance } from "../models"

class AddressService {
    async create(data: AddressInstance) {
        try {
            const address = await Address.create(data)
            return address
        } catch(error) {
            throw new Error("Erro ao criar endereço")
        }
    }
}


export default new AddressService