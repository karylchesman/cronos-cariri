import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";
import { isEmpty } from "../../utils/validators";

export interface IDeletePermissionUsecaseResquest {
    permission_id: string;
}

export type IDeletePermissionUsecaseResponse = void;

class DeletePermissionUsecase {
    constructor(
        private permissionRepository: PermissionRepositoryProtocol
    ) { }

    async execute({ permission_id }: IDeletePermissionUsecaseResquest): Promise<IDeletePermissionUsecaseResponse> {
        isEmpty(permission_id, "Permissão não definida.");

        const permissionExists = await this.permissionRepository.findById(permission_id);

        if (!permissionExists) {
            throw new Error("Permissão não encontrada.");
        }

        await this.permissionRepository.deleteById(String(permissionExists.id));

        return;
    }
}

export { DeletePermissionUsecase }