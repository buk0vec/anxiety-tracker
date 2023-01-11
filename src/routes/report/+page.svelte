<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let fearSlider = 0;
</script>

<div in:fade>
	<h2 class="text-xl mt-4">Panic Attack Reporting</h2>
	<form method="POST" action="/?/createPanic" class="flex flex-col">
		<label for="panic_date">Date</label>
		<input
			type="date"
			name="date"
			id="panic_date"
			value={`${data.now.getFullYear()}-${data.now.getMonth() < 9 ? '0' : ''}${
				data.now.getMonth() + 1
			}-${data.now.getDate() < 10 ? '0' : ''}${data.now.getDate()}`}
			required
		/>
		<label for="panic_time">Time</label>
		<input type="time" name="time" id="panic_time" required />
		<label for="panic_triggers">Triggers</label>
		<input
			type="text"
			name="triggers"
			id="panic_triggers"
			placeholder="What situation triggered the attack?"
			required
		/>
		<fieldset>
			<input type="radio" id="panic_expected" name="expected" value="expected" required />
			<label for="panic_expected">Expected</label>
			<input type="radio" id="panic_unexpected" name="expected" value="unexpected" />
			<label for="panic_unexpected">Unexpected</label>
		</fieldset>
		<label for="panic_max_fear">Maximum Fear ({fearSlider})</label>
		<input
			type="range"
			id="panic_max_fear"
			name="max_fear"
			min="0"
			max="10"
			required
			bind:value={fearSlider}
		/>
		<p>Check all symptoms present to at least a mild degree:</p>
		<fieldset class="flex flex-col">
			<span>
				<input type="checkbox" id="panic_chest_pain" name="symptoms" value="chest_pain" />
				<label for="panic_chest_pain">Chest pain</label>
			</span>
			<span>
				<input type="checkbox" id="panic_sweating" name="symptoms" value="sweating" />
				<label for="panic_sweating">Sweating</label>
			</span>
			<span>
				<input type="checkbox" id="panic_heart_pounding" name="symptoms" value="heart_pounding" />
				<label for="panic_heart_pounding">Heart racing/palpitations/pounding</label>
			</span>
			<span>
				<input type="checkbox" id="panic_nausea" name="symptoms" value="nausea" />
				<label for="panic_nausea">Nausea/upset stomach</label>
			</span>
			<span>
				<input type="checkbox" id="panic_short_breath" name="symptoms" value="short_breath" />
				<label for="panic_short_breath">Shortness of breath</label>
			</span>
			<span>
				<input type="checkbox" id="panic_dizzy" name="symptoms" value="dizzy" />
				<label for="panic_dizzy">Dizzy/unsteady/lightheaded/faint</label>
			</span>
			<span>
				<input type="checkbox" id="panic_shaking" name="symptoms" value="shaking" />
				<label for="panic_shaking">Shaking/trembling</label>
			</span>
			<span>
				<input type="checkbox" id="panic_chills_flushes" name="symptoms" value="chills_flushes" />
				<label for="panic_chills_flushes">Chills/hot flushes</label>
			</span>
			<span>
				<input type="checkbox" id="panic_numbness" name="symptoms" value="numbness" />
				<label for="panic_numbness">Numbness/tingling</label>
			</span>
			<span>
				<input type="checkbox" id="panic_unreality" name="symptoms" value="unreality" />
				<label for="panic_unreality">Feelings of unreality</label>
			</span>
			<span>
				<input type="checkbox" id="panic_choking" name="symptoms" value="choking" />
				<label for="panic_choking">Feelings of choking</label>
			</span>
			<span>
				<input type="checkbox" id="panic_dying" name="symptoms" value="dying" />
				<label for="panic_dying">Fear of dying</label>
			</span>
			<span>
				<input type="checkbox" id="panic_losing_control" name="symptoms" value="losing_control" />
				<label for="panic_losing_control">Fear of losing control/going insane</label>
			</span>
		</fieldset>
		<label for="panic_thoughts">Thoughts</label>
		<input
			type="text"
			id="panic_thoughts"
			name="thoughts"
			placeholder="Your thoughts in the moment"
			required
		/>
		<label for="panic_behaviors">Behaviors</label>
		<input
			type="text"
			id="panic_behaviors"
			name="behaviors"
			placeholder="What did you do during/after?"
			required
		/>
		<button
			class="bg-slate-100 rounded my-4 p-2 border-solid border-2 border-purple-400 hover:bg-purple-400 transition-colors"
			>Submit</button
		>
	</form>
</div>
