import { PermissionProps, Permission } from "../../entities/permission";
import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";
import { isEmpty } from "../../utils/validators";

export interface IUpdatePermissionUsecaseResquest {
    permission: {
        id: string;
        name: string;
        identifier: string;
    }
}

export type IUpdatePermissionUsecaseResponse = PermissionProps;

class UpdatePermissionUsecase {
    constructor(
        private permissionRepository: PermissionRepositoryProtocol
    ) { }

    async execute({ permission }: IUpdatePermissionUsecaseResquest): Promise<IUpdatePermissionUsecaseResponse> {

        isEmpty(permission.id, "Permissão não definida.");

        const [permissionExists] = await this.permissionRepository.find({
            id: permission.id
        })

        if (!permissionExists) {
            throw new Error("Permissão não encontrada.");
        }

        const permission_updated = new Permission(Object.assign(permissionExists, { name: permission.name, identifier: permission.identifier }));

        permission_updated.validate();

        const updated_data = await this.permissionRepository.update(permission_updated.getProps());

        return updated_data;
    }
}

export { UpdatePermissionUsecase }