# Memory calculator

This tool calculates recommended memory limits for WarehousePG environments. It is designed to maximize database memory utilization while maintaining a conservative buffer for Linux kernel operations, ensuring system stability even under high concurrency or heavy workloads.

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('calc')
const sysMem = ref(64)
const swapMem = ref(32)
const otherMem = ref(0)
const segs = ref(8)
const advRam = ref(512)
const advSwap = ref(32)
const advSegs = ref(10)
const advQueries = ref(50)

const mainResults = computed(function() {
const r = (Number(sysMem.value) || 0) * 1024;
const s = (Number(swapMem.value) || 0) * 1024;
const n = Number(segs.value) || 1;
const o = Number(otherMem.value) || 0;
const um = (r + s - (7680 + (r * 0.05)));
const pct = r > 262144 ? 0.85 : 0.5882;
const km = (0.026 * (um / 1.7));
const vp = Math.round(Math.ceil(((um - o) * pct) / n));
const ov = Math.floor((((r - km) / r) * 100) / 5) * 5;
return {
vmem: "gpconfig -c gp_vmem_protect_limit -v " + vp,
ratio: "vm.overcommit_ratio = " + ov
};
})

const advResults = computed(function() {
const r = Number(advRam.value) || 0;
const s = Number(advSwap.value) || 0;
const n = Number(advSegs.value) || 1;
const q = Number(advQueries.value) || 1;
const rq = r < 256 ? ((s + r) - (7.5 + (0.05 * r))) / 1.7 : ((s + r) - (7.5 + (0.05 * r))) / 1.17;
const pl = Math.floor(rq * 1024 / n);
const st = Math.floor(pl * 0.9 / q);
const mst = Math.floor(pl * 0.5);
return {
ratio: "vm.overcommit_ratio = " + Math.floor(((r - (0.026 * rq)) / r) * 100),
vmem: "gpconfig -c gp_vmem_protect_limit -v " + pl,
stmt: "statement_mem = " + st + "MB",
maxStmt: "max_statement_mem = " + mst + "MB"
};
})
</script>

<ClientOnly>
<div class="calc-wrapper">
<div class="tabs-nav">
<button @click="activeTab = 'calc'" :class="{ active: activeTab === 'calc' }" class="tab-btn">Memory Calculator</button>
<button @click="activeTab = 'adv'" :class="{ active: activeTab === 'adv' }" class="tab-btn">RQ Memory Calculator (6.X)</button>
</div>

<div v-if="activeTab === 'calc'" class="tab-content active">
<div class="grid">
<div class="control-group"><label>System Memory (GB)</label><input v-model.number="sysMem" type="number"></div>
<div class="control-group"><label>Swap Memory (GB)</label><input v-model.number="swapMem" type="number"></div>
<div class="control-group"><label>Other Memory (MB)</label><input v-model.number="otherMem" type="number"></div>
<div class="control-group"><label>Primary Segments</label><input v-model.number="segs" type="number"></div>
</div>
<div class="results-panel">
<h5>Recommended Max Settings</h5>
<div class="result-item">
<span class="result-label">gp_vmem_protect_limit</span>


<small class="result-meta">Value in MB | configured in postgresql.conf, controlled by the gpconfig command</small>
<code class="code-display">{{ mainResults.vmem }}</code>
</div>
<div class="result-item">
<span class="result-label">vm.overcommit_ratio</span>


<small class="result-meta">Percentage | configured in /etc/sysctl.conf</small>
<code class="code-display">{{ mainResults.ratio }}</code>
</div>
</div>
</div>

<div v-if="activeTab === 'adv'" class="tab-content active">
<div class="grid">
<div class="control-group"><label>Segment Host Physical Memory (GB)</label><input v-model.number="advRam" type="number"></div>
<div class="control-group"><label>Segment Host Swap Space (GB)</label><input v-model.number="advSwap" type="number"></div>
<div class="control-group"><label>Primary Segments per host</label><input v-model.number="advSegs" type="number"></div>
<div class="control-group"><label>Avg Concurrent Queries</label><input v-model.number="advQueries" type="number"></div>
</div>
<div class="results-panel">
<h5>Recommended Configuration</h5>
<div class="result-item">
<span class="result-label">vm.overcommit_ratio</span>


<small class="result-meta">Kernel parameter sets % RAM used for app processes</small>
<code class="code-display">{{ advResults.ratio }}</code>
</div>
<div class="result-item">
<span class="result-label">gp_vmem_protect_limit</span>


<small class="result-meta">Memory limit (MB) for an active segment instance</small>
<code class="code-display">{{ advResults.vmem }}</code>
</div>
<div class="result-item">
<span class="result-label">statement_mem</span>


<small class="result-meta">Standard query memory allocation</small>
<code class="code-display">{{ advResults.stmt }}</code>
</div>
<div class="result-item">
<span class="result-label">max_statement_mem</span>


<small class="result-meta">Maximum allowable query memory allocation</small>
<code class="code-display">{{ advResults.maxStmt }}</code>
</div>
</div>
</div>
</div>
</ClientOnly>

<style scoped>
.calc-wrapper { margin: 2rem 0; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider); overflow: hidden; }
.tabs-nav { display: flex; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-mute); }
.tab-btn { padding: 0.8rem 1.5rem; border: none; background: none; cursor: pointer; color: var(--vp-c-text-2); font-weight: 600; }
.tab-btn.active { color: var(--vp-c-brand); border-bottom: 2px solid var(--vp-c-brand); background: var(--vp-c-bg-soft); }
.tab-content { padding: 2rem; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
.control-group label { display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.5rem; }
.control-group input { width: 100%; padding: 0.6rem; border-radius: 4px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.results-panel { padding: 1.5rem; border: 1px solid var(--vp-c-brand-soft); border-radius: 8px; background: var(--vp-c-bg-soft); }
.results-panel h5 { margin-top: 0; color: var(--vp-c-brand); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1rem; }
.code-display { display: block; padding: 1rem; background: #1e1e1e; color: #9cdcfe; border-radius: 4px; font-family: var(--vp-font-family-mono); font-size: 0.85rem; margin-top: 0.5rem; }
.result-label { font-weight: 600; color: var(--vp-c-text-1); }
.result-meta { font-size: 0.8rem; opacity: 0.7; }
.result-item { margin-bottom: 1.5rem; }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>


Choose the value for **Primary Segments Per Node** based on your mirroring strategy.

See [Overview of Segment Mirroring](ha/overview-of-segment-mirroring) for more information on group and spread mirroring strategies.
- Given a configuration of 6 primaries and 6 mirrors, set **Primary Segments Per Node** to 6+6=12 when using group mirroring.
- Using the same configuration example for spread mirroring, the value would be 6+2=8.

For more information on memory, please refer to the [WarehousePG Memory Overview](wlmgmt_intro).