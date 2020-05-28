<script>
	let name = '...';

	import { MessageBus } from '@podium/browser';
	const messageBus = new MessageBus();

	messageBus.subscribe('internalchannel', 'newMessage', event => {
		name = event.payload.message;
	});
</script>

<main>
	<h1>Hello from {name}</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #ff3e00;
		border: solid 1px #ff3e00;
		border-radius: 4px;
		color: white;
	}

	main a {
		color: white;
	}

	h1 {
		color: white;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>