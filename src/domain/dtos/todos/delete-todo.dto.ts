export class DeleteTodoDto {
  
    private constructor(
        private id: number
    ) {}

    static create(props: {[key: string]: any}) : [string?, DeleteTodoDto?] {
        const { id } = props;
        
        if (!id) {
            return ["ID is required", undefined];
        }
        
        const numericId = parseInt(id);
        if (isNaN(numericId) || numericId <= 0) {
            return ["ID must be a positive number", undefined];
        }
        
        return [undefined, new DeleteTodoDto(numericId)];
    }

    getId() {
        return this.id;
    }

    toObject() {
        return {
            id: this.id
        };
    }
}
