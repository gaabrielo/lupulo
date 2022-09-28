import { CircleNotch } from 'phosphor-react';

interface Props {
  lastItem?: boolean;
  firstItem?: boolean;
  label: string;
  value: string | number;
  isLoading?: boolean;
}

export function ListItem({
  lastItem = false,
  firstItem = false,
  label,
  value,
  isLoading = false,
}: Props) {
  return (
    <div
      className={`flex justify-between py-3 items-center ${
        lastItem ? '' : 'border-b border-black'
      } ${firstItem ? 'pt-0' : ''}`}
    >
      <span className="font-[400] pr-3">{label}</span>
      <span className="text-sm font-[400] text-right">
        {isLoading ? (
          <CircleNotch size="1rem" className="animate-spin" />
        ) : (
          value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
        )}
      </span>
    </div>
  );
}
