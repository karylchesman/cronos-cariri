import dayjs from "dayjs";
import { sign } from "jsonwebtoken";

interface ITokenSessionData {
    user_id: string;
}

class TokenGender {
    static getSessionToken({ user_id }: ITokenSessionData) {
        const access_token = sign({
            user_id
        }, String(process.env.APP_SECRET), {
            expiresIn: "120m"
        })

        const expires_in = dayjs().add(120, "m").toDate();

        return { access_token, expires_in };
    }
}

export { TokenGender }