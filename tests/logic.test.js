/* node tests/logic.test.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const root = path.join(__dirname, "..");
const ctx = { module: { exports: {} } };
vm.createContext(ctx);
for (const f of ["data.js", "logic.js"]) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const L = ctx.module.exports;
const D = vm.runInContext("({ PRODUCTS, METRICS, INDEX, TEMP_AXIS, TEMP_PRESETS, SIZES, TECH_GROUPS })", ctx);
const plain = (x) => JSON.parse(JSON.stringify(x));

let n = 0;
const check = (name, fn) => { fn(); n++; console.log("ok", name); };

check("index boundaries include the lower edge", () => {
  assert.strictEqual(L.indexLevel("air", 180), 5);
  assert.strictEqual(L.indexLevel("air", 179), 4);
  assert.strictEqual(L.indexLevel("sweat", 6), 2);
  assert.strictEqual(L.indexLevel("sweat", 5.9), 3);
  assert.strictEqual(L.indexLevel("sweat", 2), 4);
  assert.strictEqual(L.indexLevel("sweat", 1.9), 5);
  assert.strictEqual(L.indexLevel("warmth", 0.3), 4);
});

check("four products get the documented index levels", () => {
  const got = Object.fromEntries(D.PRODUCTS.map((p) => [p.id, Object.values(plain(L.productIndex(p))).join("")]));
  assert.deepStrictEqual(got, { r01: "541", r02: "334", r03: "022", r04: "231" });
});

check("indexed metrics draw their strip from the index cuts", () => {
  assert.deepStrictEqual(plain(L.stripBands("ret")).map((b) => b[2]), ["5", "4", "3", "2", "1", "0"]);
  assert.deepStrictEqual(plain(L.stripBands("cfm"))[5], [180, 250, "5"]);
  assert.strictEqual(L.stripBands("weight").length, 0);
});

check("every spec but temperature and every part lands in exactly one technology tab", () => {
  for (const p of D.PRODUCTS) {
    const items = D.TECH_GROUPS.flatMap((g) => plain(L.techItems(p, g.id)));
    const metrics = items.filter((x) => x.kind === "metric").map((x) => x.key).sort();
    assert.deepStrictEqual(metrics, p.specKeys.filter((k) => k !== "temp").sort(), p.id);
    assert.deepStrictEqual(items.filter((x) => x.kind === "part").map((x) => x.i).sort(), p.parts.map((_, i) => i), p.id);
    for (const g of D.TECH_GROUPS) assert.ok(L.techItems(p, g.id).length > 0, `${p.id} ${g.id} is empty`);
  }
});

check("the number in each product name equals its fabric weight", () => {
  for (const p of D.PRODUCTS) assert.strictEqual(Number(p.name.split(" ").pop()), p.nums.gsm, p.id);
});

check("every spec key a product lists has a metric entry and a value", () => {
  for (const p of D.PRODUCTS) {
    for (const k of [...p.specKeys, ...p.keyTags, ...p.card]) {
      assert(D.METRICS[k], `${p.id} ${k} not in METRICS`);
      assert(L.metricParts(p, k).value, `${p.id} ${k} has no value`);
    }
    assert.strictEqual(p.sizes.M, p.nums.weight, p.id);
    for (const s of D.SIZES) assert(p.sizes[s], `${p.id} size ${s}`);
    for (const [, vals] of p.measure) assert.strictEqual(vals.length, D.SIZES.length, p.id);
    assert(D.PRODUCTS.some((q) => q.id === p.compareWith && q.id !== p.id), `${p.id} compareWith`);
  }
});

check("every R product in a combo covers the temperature (or its layered minimum)", () => {
  for (let t = D.TEMP_AXIS[0]; t <= D.TEMP_AXIS[1]; t++) {
    const combo = L.recommend(t);
    const withBase = combo.some((r) => r.item.name === "롱슬리브 베이스레이어");
    const layered = combo.some((r) => r.item.id === "r02") && combo.some((r) => r.item.id === "r03");
    for (const { item } of combo) {
      if (!item.id) continue;
      const lo = withBase ? -Infinity : layered && ["r02", "r03"].includes(item.id) ? L.byId("r03").layerMin : item.temp[0];
      assert(t >= lo && t <= item.temp[1], `${item.name} at ${t}°C is outside ${item.temp}`);
    }
    assert.strictEqual(withBase, t < L.byId("r03").layerMin, `base layer at ${t}°C`);
    assert.strictEqual(combo.filter((r) => r.role === "하의").length, 1, `${t}°C bottoms`);
  }
});

check("presets give the expected combos", () => {
  const names = (t) => plain(L.recommend(t).map((r) => r.item.name + (r.note ? `(${r.note})` : "")));
  assert.deepStrictEqual(names(25), ["Singlet 95", "Half Tights 210"]);
  assert.deepStrictEqual(names(8), ["Hood Sleeve 185", "Wind Shell 28(바람이 불면)", "Half Tights 210"]);
  assert.deepStrictEqual(names(-2), ["Hood Sleeve 185", "Wind Shell 28(바람이 불면)", "롱타이츠", "장갑과 넥워머"]);
});

check("collection filters by category and temperature, and sorts", () => {
  const ids = (q) => plain(L.collection(q).map((x) => x.p.id));
  assert.deepStrictEqual(ids({}), ["r01", "r02", "r03", "r04"]);
  assert.deepStrictEqual(ids({ cat: "top" }), ["r01", "r02"]);
  assert.deepStrictEqual(ids({ temp: -10 }), ["r02", "r03"]);
  assert.deepStrictEqual(ids({ temp: 20 }), ["r01", "r04"]);
  assert.deepStrictEqual(ids({ cat: "outer", temp: 25 }), []);
  assert.deepStrictEqual(ids({ sort: "gsm-asc" }), ["r03", "r01", "r02", "r04"]);
  assert.deepStrictEqual(ids({ sort: "weight-asc" }), ["r01", "r03", "r04", "r02"]);
  assert.strictEqual(L.collection({ temp: -10 }).find((x) => x.p.id === "r03").role, "Hood Sleeve 185 위에 덧입기");
});

console.log(`${n} checks passed`);
