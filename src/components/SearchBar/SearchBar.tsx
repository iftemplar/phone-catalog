import styles from "./SearchBar.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
