export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;

  // The filter categories are authored as <p><strong>Label</strong>: Value</p>.
  // Group them into a horizontal filter row and reshape each into a
  // labelled select-box (label above a bordered box showing the value).
  const filterParas = [...cell.querySelectorAll(':scope > p')].filter(
    (p) => p.querySelector('strong') && !p.querySelector('a'),
  );

  if (filterParas.length) {
    const row = document.createElement('div');
    row.className = 'columns-filter-row';

    filterParas.forEach((p) => {
      const strong = p.querySelector('strong');
      const labelText = strong ? strong.textContent.replace(/:\s*$/, '').trim() : '';
      // remaining text after the ": " separator becomes the box value
      const raw = p.textContent.replace(strong ? strong.textContent : '', '');
      const valueText = raw.replace(/^\s*:\s*/, '').trim() || 'Any';

      const field = document.createElement('div');
      field.className = 'columns-filter-field';

      const label = document.createElement('span');
      label.className = 'columns-filter-label';
      label.textContent = labelText;

      const box = document.createElement('div');
      box.className = 'columns-filter-select';
      box.textContent = valueText;

      field.append(label, box);
      row.append(field);
    });

    // insert the row where the first filter paragraph was, then remove originals
    filterParas[0].before(row);
    filterParas.forEach((p) => p.remove());
  }
}
