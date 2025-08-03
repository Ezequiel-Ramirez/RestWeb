export class GetTodosDto {
  
    private constructor(
        private page?: number,
        private limit?: number,
        private completed?: boolean
    ) {}

    static create(props: {[key: string]: any}) : [string?, GetTodosDto?] {
        const { page, limit, completed } = props;
        
        // Validar page si se proporciona
        if (page !== undefined && (isNaN(page) || page < 1)) {
            return ["Page must be a positive number", undefined];
        }
        
        // Validar limit si se proporciona
        if (limit !== undefined && (isNaN(limit) || limit < 1 || limit > 100)) {
            return ["Limit must be between 1 and 100", undefined];
        }
        
        // Validar completed si se proporciona
        if (completed !== undefined && typeof completed !== 'boolean') {
            return ["Completed must be a boolean value", undefined];
        }
        
        return [undefined, new GetTodosDto(page, limit, completed)];
    }

    getPage() {
        return this.page || 1;
    }

    getLimit() {
        return this.limit || 10;
    }

    getCompleted() {
        return this.completed;
    }

    getSkip() {
        return (this.getPage() - 1) * this.getLimit();
    }

    toObject() {
        const obj: any = {
            skip: this.getSkip(),
            take: this.getLimit()
        };
        
        if (this.completed !== undefined) {
            obj.where = {
                completedAt: this.completed ? { not: null } : null
            };
        }
        
        return obj;
    }
}
