class BaseEntity {
    constructor(
        protected created_at?: Date,
        protected updated_at?: Date
    ) { }
}

export { BaseEntity }