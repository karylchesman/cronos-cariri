export const cpfMask = (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{3})(\d)/g, '$1.$2');
    v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, '$1.$2.$3-$4');

    return v.substring(0, 14);
}

export const phonenumberMask = (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d{1,4})$/g, '($1)$2');
    v = v.replace(/^(\d{2})(\d{4})(\d{1,4})$/, '($1) $2-$3');
    v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})(\d{1,})$/, '($1) $2 $3-$4');

    return v;
}
