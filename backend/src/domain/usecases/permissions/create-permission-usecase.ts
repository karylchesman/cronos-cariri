import { PermissionProps, Permission } from "../../entities/permission";
import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";

export interface ICreatePermissionUsecaseResquest {
    permission: {
        name: string;
        identifier: string;
    }
}

export type ICreatePermissionUsecaseResponse = PermissionProps;

class CreatePermissionUsecase {
    constructor(
        private permissionRepository: PermissionRepositoryProtocol
    ) { }

    async execute({ permission }: ICreatePermissionUsecaseResquest): Promise<ICreatePermissionUsecaseResponse> {

        const [permissionNameExists] = await this.permissionRepository.find({
            name: permission.name
        })

        if (permissionNameExists) {
            throw new Error("Já existe uma permissão com esse nome, por favor tente outro.");
        }

        const [permissionIdentifierExists] = await this.permissionRepository.find({
            identifier: permission.identifier
        })

        if (permissionIdentifierExists) {
            throw new Error("Já existe uma permissão com esse identificador, por favor tente outro.");
        }

        const new_permission = new Permission({ ...permission });

        new_permission.validate();

        const saved_permission = await this.permissionRepository.save(new_permission.getProps());

        return saved_permission;
    }
}

export { CreatePermissionUsecase }