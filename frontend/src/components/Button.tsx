interface ButtonProps {
  label: string;
  onClick: () => void;
  loading: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg active-scale-98 transition-all disabled:opacity-50 flex justify-center items-center h-12 cursor-pointer"
    >
      {props.loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        props.label
      )}
    </button>
  );
}
