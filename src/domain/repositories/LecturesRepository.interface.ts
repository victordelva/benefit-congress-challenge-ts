export interface LecturesRepositoryInterface {
		getAll(): Record<string, any>[];
		create(lecture: Record<string, any>): Record<string, any>;
}