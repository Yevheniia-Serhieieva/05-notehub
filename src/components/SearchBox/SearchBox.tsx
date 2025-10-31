import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ value, onSearchChange }: SearchBoxProps) {
  return (
    <>
      <input
        onChange={(e) => onSearchChange(e.target.value)}
        value={value}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
