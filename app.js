const $ = id => document.getElementById(id);
let items = JSON.parse(localStorage.getItem('expenses') || '[]');
let editing = null;
function button(text, fn) { const b = document.createElement('button'); b.textContent = text; b.onclick = fn; return b; }
function render() {
  localStorage.setItem('expenses', JSON.stringify(items));
  $('list').replaceChildren(...items.map((x, i) => {
    const li = document.createElement('li');
    li.append(`${x.name}: ₹${x.amount.toFixed(2)} `,
      button('Edit', () => { editing = i; $('name').value = x.name; $('amt').value = x.amount; }),
      button('Delete', () => { items.splice(i, 1); editing = null; $('f').reset(); render(); }));
    return li;
  }));
  $('total').textContent = items.reduce((s, x) => s + x.amount, 0).toFixed(2);
}
$('f').onsubmit = e => {
  e.preventDefault();
  const item = { name: $('name').value.trim(), amount: Number($('amt').value) };
  if (!item.name) return;
  if (editing === null) items.push(item); else items[editing] = item;
  editing = null; e.target.reset(); render();
};
render();
