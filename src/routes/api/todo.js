import { db } from '$lib/db';

// GET
/*
export async function GET({ url }) {
	console.log('GET request to /api/todo');
	const id = url.searchParams.get('id');
	try {
		const todos = id
			? await db.todo.findUnique({ where: { id: Number(id) } })
			: await db.todo.findMany();
		return {
			status: 200,
			body: { todos }
		};
	} catch (error) {
		console.error(error);

		return {
			status: 500,
			body: { error: 'Fail to fetch todos' }
		};
	}
}
*/

export async function GET({ url }) {
	try {
		const id = url.searchParams.get('id');
		let todos;

		if (id) {
			// Fetch a single todo by ID
			todos = await db.todo.findUnique({
				where: {
					id: Number(id)
				}
			});
		} else {
			// Fetch all todos
			todos = await db.todo.findMany();
		}

		return {
			status: 200,
			body: { todos }
		};
	} catch (error) {
		console.error('Error fetching todos:', error);
		return {
			status: 500,
			body: { error: 'Failed to fetch todos' }
		};
	}
}
// POST

export async function POST({ request }) {
	const { text } = await request.json();
	try {
		const todo = await db.todo.create({
			data: { text }
		});
		return {
			status: 201,
			body: { todo }
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: { error: 'Failed to create todo' }
		};
	}
}

// PUT

export async function PUT({ request }) {
	const { id, text, completed } = await request.json();
	try {
		const todo = await db.todo.update({
			where: { id },
			data: {
				text,
				completed
			}
		});
		return {
			status: 200,
			body: { todo }
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: { error: 'Fail to update todo' }
		};
	}
}

// DELETE

export async function DELETE({ request }) {
	const { id } = await request.json();

	try {
		await db.todo.delete({
			where: { id }
		});

		return {
			status: 200,
			body: { message: 'Todo deleted successfully' }
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: 'Failed to delete todo' }
		};
	}
}
