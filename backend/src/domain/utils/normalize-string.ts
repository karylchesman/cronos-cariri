export function normalizeString(value: string, switch_space_character: string = "-") {
    return value.toLocaleLowerCase().normalize("NFD").replace(/[^a-zA-Z\s0-9]/g, "").replace(/[\s]/g, switch_space_character);
}