export class CreateTodoDto {
  
    private constructor(
        private title: string,
        private completedAt?: Date
    ) {}

    static create(props: {[key: string]: any}) : [string?, CreateTodoDto?] {
        if (!props.title) {
            return ["Title is required", undefined];
        }
        
        return [undefined, new CreateTodoDto(props.title, props.completedAt)];
    }

    getTitle() {
        return this.title;
    }

    getCompletedAt() {
        return this.completedAt;
    }

    toObject() {
        return {
            title: this.title,
            ...(this.completedAt && { completedAt: this.completedAt })
        }
    }

    setTitle(title: string) {
        this.title = title;
    }

    setCompletedAt(completedAt: Date) {
        this.completedAt = completedAt;
    }
}
