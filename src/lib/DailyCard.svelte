<script lang="ts">
	import type { DailyRecord } from '@prisma/client';

	export let record: DailyRecord;

	const date = record.date.toUTCString();
</script>

<p>Date: {date.substring(0, date.indexOf(':') - 3)}</p>
<p>Levels: {record.anxiety_level} {record.depression_level} {record.worry_level}</p>
