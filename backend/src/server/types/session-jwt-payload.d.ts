import 'jsonwebtoken'

export interface SessionJwtPayload extends JwtPayload {
    user_id: string;
}
