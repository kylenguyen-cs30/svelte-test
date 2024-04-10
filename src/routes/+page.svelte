<script lang="ts">
	import { onMount } from 'svelte';

	type Todo = {
		id: number;
		text: string;
		completed: boolean;
	};

	let todos: Todo[] = [];
	let newTodoText: string = '';

	async function fetchTodos() {
		const response = await fetch('/api/todo');
		if (response.ok) {
			const data = (await response.json()) as { todos: Todo[] };
			todos = data.todos;
		}
	}
	onMount(() => {
		fetchTodos();
	});

	async function addTodo() {
		const response = await fetch('/api/todo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: newTodoText })
		});
		if (response.ok) {
			newTodoText = '';
			fetchTodos();
		}
	}

	async function updateTodosStatus(id: number, completed: boolean) {
		await fetch('/api/todo', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, completed: !completed })
		});
		fetchTodos();
	}

	async function deleteTodo(id: number) {
		await fetch('/api/todo', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		fetchTodos();
	}
</script>

<form on:submit|preventDefault={addTodo}>
	<input bind:value={newTodoText} placeholder="Add New Task" required />
	<button type="submit"> Add </button>
</form>

{#each todos as { id, text, completed }}
	<div>
		<input type="checkbox" checked={completed} on:change={() => updateTodosStatus(id, completed)} />
		{text}
		<button on:click={() => deleteTodo(id)}>Delete</button>
	</div>
{/each}
