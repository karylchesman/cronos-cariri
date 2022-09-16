import { v4 as uuidv4 } from 'uuid';

class UuidGender {
    static genderV4() {
        return uuidv4();
    }
}

export { UuidGender }