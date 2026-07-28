type Props = {
  title: string;
};

export default function Button({ title }: Props) {
  return (
    <button
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      transition
      "
    >
      {title}
    </button>
  );
}