import db from '$lib/db';

export async function GET() {
	try {
		const todos = await db.todo.findMany();

		return new Response(JSON.stringify(todos), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching todos (du ma may ngu qua) : ', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}

export async function POST({ request }) {
	try {
		const data = await request.json();
		if (typeof data.text !== 'string' || data.text.trim().lenght === 0) {
			return new Response(JSON.stringify({ error: 'Text is required' }), {
				status: 400,
				headers: { 'content-type': 'application/json' }
			});
		}

		// create a new todo item in the database
		const createdTodo = await db.todo.create({
			data: {
				text: data.text,
				completed: data.completed ?? false // default to false
			}
		});

		// return createdTodo
		return new Response(JSON.stringify(createdTodo), {
			status: 201,
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		console.error('ERROR Creating todod: (DM MAY NGU QUA)', error);
		return new Response(JSON.stringify({ error: 'FAIL TO CREATE TODO' }), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
