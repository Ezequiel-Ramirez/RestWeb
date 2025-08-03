export class UpdateTodoDto {
  
    private constructor(
        private title?: string,
        private completedAt?: Date
    ) {}

    static create(props: {[key: string]: any}) : [string?, UpdateTodoDto?] {
        // For updates, we allow partial data, so no required fields
        return [undefined, new UpdateTodoDto(props.title, props.completedAt)];
    }

    getTitle() {
        return this.title;
    }

    getCompletedAt() {
        return this.completedAt;
    }

    toObject() {
        const obj: any = {};
        if (this.title !== undefined) {
            obj.title = this.title;
        }
        if (this.completedAt !== undefined) {
            obj.completedAt = this.completedAt;
        }
        return obj;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setCompletedAt(completedAt: Date) {
        this.completedAt = completedAt;
    }
}
