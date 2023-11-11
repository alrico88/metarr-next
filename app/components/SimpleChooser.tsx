import classnames from 'clsx';

interface SimpleChooserProps {
  options: {
    text: string;
    value: string;
  }[];
  selected: string;
  onSelection: (val: string) => void;
}

export default function SimpleChooser(props: SimpleChooserProps) {
  return (
    <div className="btn-group">
      {props.options.map((option) => {
        return (
          <button
            key={option.value}
            className={classnames({
              'btn btn-link p-1': true,
              active: props.selected === option.value,
            })}
            onClick={() => props.onSelection(option.value)}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}
