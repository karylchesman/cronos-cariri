import { Role, RoleProps } from "../../entities/role";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { isEmpty } from "../../utils/validators";

export interface IDeleteRoleUsecaseResquest {
    role_id: string;
}

export type IDeleteRoleUsecaseResponse = void;

class DeleteRoleUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol
    ) { }

    async execute({ role_id }: IDeleteRoleUsecaseResquest): Promise<IDeleteRoleUsecaseResponse> {
        isEmpty(role_id, "Perfil não definido.");

        const roleExists = await this.roleRepository.findById(role_id);

        if (!roleExists) {
            throw new Error("Perfil não encontrado.");
        }

        await this.roleRepository.deleteById(String(roleExists.id));

        return;
    }
}

export { DeleteRoleUsecase }