interface InputProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (val: string) => void;
}

export default function InputField(props: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {props.label}
      </label>

      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pl-12 text-white placeholder-slate-600 focus:outline-none focus-border-purple-500 transition-colors duration-200"
        placeholder={`Enter your ${props.label.toLowerCase()}`}
      />
    </div>
  );
}
