export function normalizeString(value: string) {
    return value.toLocaleLowerCase().normalize("NFD").replace(/[^a-zA-Z\s0-9]/g, "").replace(/[\s]/g, "-");
}