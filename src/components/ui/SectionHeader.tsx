interface Props {
  title: string;
  seeAllLink?: string;
}

export default function SectionHeader({ title, seeAllLink }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">{title}</h2>
      {seeAllLink && (
        <a href={seeAllLink} className="text-red-400 hover:text-red-300 text-sm">
          See All →
        </a>
      )}
    </div>
  );
}