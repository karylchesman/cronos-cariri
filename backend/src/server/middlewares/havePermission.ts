import { NextFunction, Request, Response } from "express";
import { PermissionRepository } from "../../domain/repositories/permission-repository";
import { RolePermissionRepository } from "../../domain/repositories/role-permission-repository";
import { RoleRepository } from "../../domain/repositories/role-repository";
import { UserRoleRepository } from "../../domain/repositories/user-role-repository";
import { GetUserRolesAndPermissionsUsecase } from "../../domain/usecases/roles/get-user-roles-and-permissions-usecase";

export function havePermission(permissions: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const {
            token_user_id
        } = request.body;

        const roleRepository = new RoleRepository();
        const userRoleRepository = new UserRoleRepository();
        const permissionsRepository = new PermissionRepository();
        const rolePermissionRepository = new RolePermissionRepository();

        const getUserRolesAndPermissionsUsecase = new GetUserRolesAndPermissionsUsecase(
            userRoleRepository,
            roleRepository,
            rolePermissionRepository,
            permissionsRepository
        );

        const roles_and_permissions = await getUserRolesAndPermissionsUsecase.execute({ user_id: token_user_id });

        const permissionExists = roles_and_permissions.permissions
            .map((permission) => permission.identifier)
            .some((permission) => permissions.includes(permission));

        if (!permissionExists) {
            throw new Error("Você não tem permissão para executar esta ação.");
        }

        request.body["toke_user_permissions"] = roles_and_permissions.permissions;

        return next();
    }
}