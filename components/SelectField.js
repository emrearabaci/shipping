export default function SelectField({ name, placeholder, options, onChange }) {
  return (
    <select name={name} onChange={onChange} defaultValue={''}>
      <option value={''} disabled>
        {placeholder}
      </option>
      {options.map((group) => (
        <optgroup key={group.id} label={group.name}>
          {group.units.map((unit) => (
            <option key={unit.id} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
