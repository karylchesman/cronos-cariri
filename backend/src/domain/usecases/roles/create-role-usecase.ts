import { Role, RoleProps } from "../../entities/role.ts";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";

export interface ICreateRoleUsecaseResquest {
    role: {
        name: string;
    }
}

export type ICreateRoleUsecaseResponse = RoleProps;

class CreateRoleUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol
    ) { }

    async execute({ role }: ICreateRoleUsecaseResquest): Promise<ICreateRoleUsecaseResponse> {

        const [roleExists] = await this.roleRepository.find({
            name: role.name
        })

        if (roleExists) {
            throw new Error("Já existe um perfil de acesso com esse nome, por favor tente outro.");
        }

        const new_role = new Role({ ...role });

        new_role.validate();

        const saved_role = await this.roleRepository.save(new_role.getProps());

        return saved_role;
    }
}

export { CreateRoleUsecase }