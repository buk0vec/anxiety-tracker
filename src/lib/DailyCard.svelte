<script lang="ts">
	import type { DailyRecord } from '@prisma/client';

	export let record: DailyRecord;
</script>

<p>Date: {record.date.toDateString()}</p>
<p>Levels: {record.anxiety_level} {record.depression_level} {record.worry_level}</p>
