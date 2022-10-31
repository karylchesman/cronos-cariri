import { Role, RoleProps } from "../../entities/role";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";

export interface IUpdateRoleUsecaseResquest {
    id: string;
    name: string;
}

export type IUpdateRoleUsecaseResponse = RoleProps;

class UpdateRoleUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol
    ) { }

    async execute({ id, name }: IUpdateRoleUsecaseResquest): Promise<IUpdateRoleUsecaseResponse> {
        const roleExists = await this.roleRepository.findById(id);

        if (!roleExists) {
            throw new Error("Perfil não encontrado.");
        }

        const updated_role = new Role(Object.assign(roleExists, { name }));
        updated_role.validate();

        const updated_data = await this.roleRepository.update(updated_role.getProps());

        return updated_data;
    }
}

export { UpdateRoleUsecase }